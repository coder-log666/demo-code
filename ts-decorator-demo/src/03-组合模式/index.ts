// function test1(target: any) {
//     console.log('普通模式1')
// }
// function test2(target: any) {
//     console.log('普通模式2')
// }
// function test3() {
//     console.log('test3--外')
//     return function(target: any) {
//         console.log('test3--内')
//     }
// }
// function test4() {
//     console.log('test4--外')
//     return function(target: any) {
//         console.log('test4--内')
//     }
// }
// /*
// 1. 先从上到下执行工厂函数，获得真正的装饰函数。
// 2. 再从下到上，执行装饰函数。
// */
// @test1
// @test2
// @test3()
// @test4()
// class Student {
//     public name: string
//     public age: number
//     public static school: string = '清华'

//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }
// }