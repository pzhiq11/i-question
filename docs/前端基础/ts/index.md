# TypeScript 面试指南

::: details 目录
[[toc]]
:::

## 1. TypeScript 与 JavaScript 的区别
TypeScript 是 JavaScript 的超集，加入了静态类型检查、接口、枚举、泛型、装饰器等特性，最终编译成 JavaScript 运行在浏览器或 Node 环境中。

## 2. 使用 TypeScript 有什么好处
- 代码可读性：显式类型注解使代码结构更清晰，也利于团队协作
- 编译时错误检查：减少运行时错误，减少一些潜在错误
- 跨平台兼容性：生成兼容各环境的 JavaScript
- 强大的工具支持：IDE 智能提示、重构功能完善
- 社区与生态：被 Slack、Asana 等大型项目采用

## 3. TypeScript 和 JavaScript 哪个更好
- TypeScript：适合大型项目、团队协作
- JavaScript：适合小型项目或快速原型开发
- 两者关系：TypeScript 是 JavaScript 的超集

## 4. TypeScript 是强类型还是弱类型语言
TypeScript 是强类型语言，支持静态类型系统，类型错误会在编译阶段被发现。

## 5. interface 和 type 有什么区别
- `interface` 支持继承和合并声明，更适合描述对象结构
- `type` 更灵活，可用于联合类型、交叉类型、映射类型等，不能重复声明

## 6. 什么时候用 interface，什么时候用 type
通常推荐优先使用 `interface`，只有当需要类型操作或联合类型等场景时才使用 `type`。

## 7. 什么是类型断言
类型断言用于手动指定一个值的类型：`value as Type` 或 `<Type>value`

## 8. 如何实现一个类型为数字或字符串的参数
```ts
function fn(val: number | string) {}
```

## 9. 什么是字面量类型
字面量类型限制变量只能是某个特定的值：
```ts
let direction: 'left' | 'right';
```

## 10. keyof 的作用
提取某个类型的键组成联合类型：
```ts
type A = keyof { name: string; age: number }; // 'name' | 'age'
```

## 11. typeof 的使用场景
获取变量的类型：
```ts
const user = { name: 'Tom', age: 18 };
type User = typeof user;
```

## 12. 条件类型的写法
```ts
type IsString<T> = T extends string ? true : false;
```

## 13. infer 是做什么的
在条件类型中推断类型：
```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 14. 泛型的基本使用
```ts
function identity<T>(arg: T): T {
  return arg;
}
```

## 15. 泛型约束
```ts
function logLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

## 16. 什么是 Partial
将 T 的所有属性变为可选

## 17. 什么是 Required
将 T 的所有属性变为必填

## 18. 什么是 Readonly
将 T 的所有属性变为只读

## 19. 什么是 Pick<T, K>
从 T 中选择一组属性构造新的类型

## 20. 什么是 Omit<T, K>
从 T 中排除一组属性构造新的类型

## 21. Record<K, T> 是什么
创建一个对象类型，键为 K，值为 T：
```ts
type Roles = Record<'admin' | 'user', string>;
```

## 22. unknown 与 any 的区别
`unknown` 更安全，不能直接对其操作，需类型判断；`any` 则跳过类型检查

## 23. never 类型的场景
表示永远不会有返回值的类型，比如抛出异常或无限循环的函数

## 24. 如何定义元组
```ts
let tuple: [string, number];
```

## 25. 枚举 enum 使用
```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

## 26. 模板字面量类型是什么
```ts
type Event = `on${Capitalize<'click' | 'hover'>}`;
```

## 27. 实现一个深度只读类型 DeepReadonly
```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
};
```

## 28. 如何实现数组转联合类型
```ts
const arr = ['a', 'b', 'c'] as const;
type Union = typeof arr[number];
```

## 29. 实现一个 Exclude 类型
```ts
type MyExclude<T, U> = T extends U ? never : T;
```

## 30. 如何提取函数的参数类型
```ts
type Params<T> = T extends (...args: infer P) => any ? P : never;
```

## 31. typeof 与 keyof 联合使用
```ts
const person = { name: 'Tom', age: 18 };
type PersonKeys = keyof typeof person;
```

## 32. 使用泛型实现一个 curry 函数类型定义
```ts
type Curry<P extends any[], R> =
  P extends [infer A, ...infer B]
    ? (arg: A) => Curry<B, R>
    : R;
```

## 33. TypeScript 的原始数据类型
1. `number`：
   ```ts
   let decimal: number = 6;
   let binary: number = 0b1010; 
   ```

2. `string`：
   ```ts
   let name: string = "Alice";
   ```

3. `boolean`：
   ```ts
   let isDone: boolean = false;
   ```

4. `void`：
   ```ts
   function logMessage(): void {
     console.log("No return value");
   }
   ```

5. `null` 和 `undefined`：
   ```ts
   let u: undefined = undefined;
   let n: null = null;
   ```

## 34. 什么是泛型
允许在定义时不预先指定具体类型，使用时再动态指定：
```ts
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const strArray = createArray<string>(3, "x"); 
const numArray = createArray(3, 100); // 自动推断
```

## 35. TS 中的类
支持面向对象特性：
```ts
class Animal {
  constructor(public name: string) {}
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.bark();
dog.move(10);
```

## 36. 构造函数与方法重写
```ts
class Bird extends Animal {
  override move(distance = 5) { // 重写方法
    super.move(distance); 
    console.log("Flying...");
  }
}
```

## 37. 接口类型
1. **可索引类型接口**：
   ```ts
   // 数组约束
   interface StringArray {
     [index: number]: string;
   }
   let arr: StringArray = ["A", "B"];
   
   // 对象约束
   interface StringMap {
     [key: string]: string;
   }
   let obj: StringMap = { name: "Alice" };
   ```

2. **函数类型接口**：
   ```ts
   interface SearchFunc {
     (source: string, keyword: string): boolean;
   }
   const search: SearchFunc = (src, kw) => src.includes(kw);
   ```

3. **类类型接口**：
   ```ts
   interface ClockInterface {
     currentTime: Date;
     setTime(d: Date): void;
   }
   
   class Clock implements ClockInterface {
     currentTime: Date = new Date();
     setTime(d: Date) {
       this.currentTime = d;
     }
   }
   ```

## 38. never 和 void 的区别
- `void`：函数无返回值但可正常结束
  ```ts
  function noReturn(): void {
    console.log("No return");
  }
  ```
  
- `never`：函数无法正常结束
  ```ts
  function error(message: string): never {
    throw new Error(message);
  }
  ```

## 39. TypeScript 的学前基础
- JavaScript 基础：变量、函数、作用域
- ES6+ 特性：箭头函数、解构、Promise
- 面向对象概念：类、继承、多态

## 40. 编译 TypeScript
1. 手动编译：
   ```bash
   tsc app.ts # 生成 app.js
   ```
   
2. 监听模式（自动编译）：
   ```bash
   tsc --watch app.ts
   ```

## 41. 类型别名 vs 接口

| 特性         | 类型别名（type）         | 接口（interface）        |
|--------------|--------------------------|--------------------------|
| 类型范围     | 可定义任意类型           | 仅定义对象类型           |
| 重复声明     | 不可重复声明             | 可合并声明（自动扩展）   |
| 继承         | 不支持                   | 支持 extends 继承        |
| 适用场景     | 非对象类型               | 对象和类的约束           |

示例：
```ts
type ID = string | number;

interface User {
  id: ID;
  name: string;
}
```