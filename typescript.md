# typescript

#### 数据类型

```
布尔值
let isBoolean: boolean = true

数字(支持十进制和十六进制)
let num: number = 1

字符串
let name: string = 'Yang'
字符串模板跟js一样`${}`

数组
(类型数组)
let arr: number[] = [1, 2, 3]
(泛型数组)
let arr: Array<number> = [1, 2, 3]

元组Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
let x: [string, number] = ['hello', 10]

枚举
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

Any
let notSure: any = 4

Void(函数没有返回值时返回值类型为void)
function noReturn (): void {
  alert('warning')
}

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

Never
never类型表示的是那些永不存在的值的类型。

类型断言
尖括号语法:
let value: any = 'string'
let length: number = (<string>value).length

as语法:
let value: any = 'string'
let length: number = (value as string).length
```
#### 接口
TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。(自定义属性)
```
interface labelValue {
  label: string
}
function f (obj:labelValue) {
  console.log(obj.label)
}
let myObj = {size: 10, label: '20'}
console.log(f(myObj))

可选属性
interface api {
  value1?: string,
  value2?: number
}

只读属性
interface api {
  readonly x: number
}

函数
function myFunction (x: string): string {
  return x
}

完整类型
let myFunction: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

```
