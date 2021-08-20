class Vector {
    
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone () {
        return new Vector (this.x, this.y)
    } 


    multiply (value) {
        this.x *= value
        this.y *= value
        return this
    }

    directionTo(anotherVector) {
        const dir = new Vector(anotherVector.x - this.x, anotherVector.y - this.y);
        return dir.normalized()
    }

    getLength () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalized () {
        const length = this.getLength()
        const copy = this.clone()
        copy.x /= length;
        copy.y /= length;
        return copy
    }
   
}

class Bullet {

    position = new Vector();
    velocity = new Vector();

    start (v, p) {
        this.velocity = v;
        this.position = p;
        
        this.update()

    }

    update () {
       
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.multiply(0.95);

        console.log('bullet position', this.position.x, this.position.y);

        if (this.velocity.getLength() > 1) {
            setTimeout(this.update.bind(this), 100)
        }
    }

} 

class Weapon {
    
    direction = new Vector();
    startVelocity = 10;
    amoutOfCartridges = ['1'];

    aim (dirVector) {
        this.direction = dirVector;
    }

    shoot (pos) {
        const bullet = new Bullet()
        bullet.start(this.direction.multiply(this.startVelocity), pos)        
    }

    changeStartVelosity () {
        this.startVelocity = Math.floor(3 ** 4 * Math.random())
        console.log('Start velosity is', this.startVelocity)
    }
     
    

}


class Person {

    weapon = new Weapon()
    position = new Vector()
    
    constructor (pos) {
        this.position = pos;
    }

    attack (anotherPerson) {
        
        if (this.weapon.amoutOfCartridges.length === 0) {
            console.log('You have to reload your weapon!')
        } else {
            const direction = this.position.directionTo(anotherPerson.position)
            this.weapon.aim(direction)
            this.weapon.shoot(this.position)
            this.weapon.amoutOfCartridges.pop();
        } 
        
    

    } 


    changeWeapon () {
        this.weapon.changeStartVelosity()
    }

    reload () {
        this.weapon.amoutOfCartridges.push('1');
    }

}

const person1 = new Person(new Vector(100,100))
const person2 = new Person(new Vector(0,0))

person1.attack(person2)
person1.changeWeapon()
person1.attack(person2)
person1.reload()
person1.attack(person2)
 
