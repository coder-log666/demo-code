function test(target: any) {
    // console.log(typeof target) // function
    target.school = '清华'
    target.prototype.school = '清华'
    target.prototype.printSchool = () => {
        console.log(`${target.prototype.school}`)
    }
    debugger
}

// function print() {
//     return (target) => {
//         target.print = () => {
//             console.log(target.name, target.age)
//         }
//     }
// }

interface Student {
    [prop: string]:any
}

@test
// @print()
class Student {
    static school: string;
    static printSchool: Function;
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

// console.log(Student.school)
// Student.printSchool()
let s = new Student('zs', 18)
s.printSchool()
