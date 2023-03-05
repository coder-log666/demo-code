[toc]
### 装饰器简介
随着TypeScript和ES6里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。 Javascript里的装饰器目前处在 建议征集的第二阶段，但在TypeScript里已做为一项实验性特性予以支持。

### TypeScript中启用装饰器
```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

### 装饰器语法
使用`@expression`, expression 求值后必须是一个函数。被修饰的声明信息作为参数传入。
如：
```ts
function test(target){

}

@test
class Student {}
```
如上面的代码，再类声明上面增加了装饰器函数`test`。在`Student`类解释执行时的时候会先执行`test`函数。

### 装饰器的执行时机
装饰器只在解释执行时应用一次。

### 装饰器修饰的类型
- 类
- 方法
- 访问符
- 属性
- 参数

### 装饰器的类型
- 普通模式装饰器
- 工厂模式装饰器
- 组合模式装饰器

#### 普通模式装饰器
```ts
// 普通装饰器
// 普通装饰器
function test(target: any) {
    console.log('test')
    console.log('target', target.school)
}

@test
export class Student {
    public name: string
    public age: number
    public static school: string = '清华'
    constructor(name: string, age: number) { 
        this.name = name
        this.age = age
    }
}
```
注意点：
1. test方法需要接收一个参数，修饰的装饰器对象。
2. @test后面没有`()`

#### 工厂模式装饰器
```ts
// 装饰器工厂
function test(data: Object) {
    console.log('函数外')
    console.log(data)
    return function(target: any) {
        console.log('函数内')
        console.log(target)
    }
}

@test({
    'name': 'student'
})
class Student {
    public name: string
    public age: number
    public static school: string = '清华'
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```
注意点：
1. 装饰器方法返回一个函数，返回的函数接收一个参数，为修饰的装饰器对象。
2. @test需要跟上一对`()`，用来执行返回的真实装饰器函数。

#### 组合装饰器
```ts
function test1(target: any) {
    console.log('普通模式1')
}
function test2(target: any) {
    console.log('普通模式2')
}
function test3() {
    console.log('test3--外')
    return function(target: any) {
        console.log('test3--内')
    }
}
function test4() {
    console.log('test4--外')
    return function(target: any) {
        console.log('test4--内')
    }
}
/*
1. 先从上到下执行工厂函数，获得真正的装饰函数。
2. 再从下到上，执行装饰函数。
*/
@test1
@test2
@test3()
@test4()
class Student {
    public name: string
    public age: number
    public static school: string = '清华'
    
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```
输出结果：
> test3--外
> test4--外
> test4--内
> test3--内
> 普通模式2
> 普通模式1

注意点：
1. 先由上到下执行工厂方法，拿到真实的装饰器函数。
2. 再由下至上执行装饰器函数。