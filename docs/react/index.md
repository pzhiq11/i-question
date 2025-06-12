# React 基础知识

## 问题 1：什么是 React Hooks？

React Hooks 是 React 一种新的特性，它允许在函数组件中使用状态（state）、副作用和其它 react 特性，而无需编写类组件 ‌‌。

### 使用 React Hooks 好处是啥？

- **简化状态管理和副作用**：Hooks 允许你直接在函数组件中处理状态和副作用，无需类和复杂的生命周期方法。
- **逻辑拆分与重用**：通过自定义 Hooks，你可以将复杂的逻辑拆分成小的可重用单元，从而使代码更简洁、可读。

### 调度机制
优先级调度：Hooks更新请求会被Scheduler模块根据优先级（Immediate/UserBlocking/Normal）排队处理
批量更新：React自动合并多个setState调用，减少渲染次数

#### React 特性：

jsx 语法、组件化开发、单向数据流、组件状态管理、虚拟 dom、ssr。

- jsx 语法 ‌：JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中书写类似 HTML 的代码，用于描述 UI 结构更加直观和简洁。
- 组件化开发 ‌：React 鼓励将 UI 拆分为独立的、可复用的组件。
- 单向数据流 ‌：数据通过 props 自上而下传递，这种单向数据流简化了状态管理和问题追踪，减少了数据流动的复杂性 ‌。
- 组件状态管理 ‌：React 通过 Hooks 来管理组件的状态，它允许在函数组件中管理状态，而不需要使用 class 组件。
- 虚拟 DOM ‌：React 使用虚拟 DOM 来提高性能，它将 UI 的更新操作与 DOM 的更新操作分离开，从而减少实际的 DOM 操作次数。
- ssr ‌：React 通过 SSR（服务器端渲染）来提高网站性能，它允许在服务器上渲染组件，然后将其发送给客户端，从而减少客户端的请求次数。

## 问题 2：组件的生命周期方法

React 组件的生命周期可以分为三个阶段：挂载阶段、更新阶段和卸载阶段。

- 挂载阶段包括`constructor`、`render`、`componentDidMount`等方法，用于初始化组件、渲染到真实 DOM 和处理副作用。
- 更新阶段包括`shouldComponentUpdate`、`render`、`componentDidUpdate`等方法，用于控制组件的重新渲染和处理更新后的副作用。
- 卸载阶段包括`componentWillUnmount`方法，用于清理组件产生的副作用和资源

> 新生命周期只有这个带`will`的没有被移除，其余 3 个`componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`被移除了。

## 问题 3：React 组件可请求数据生命周期钩子

- `componentDidMount`：组件挂载后立即调用，在此方法中可以发起请求，并更新组件的状态或 props。
- `componentDidUpdate`：组件更新后立即调用，在此方法中可以根据 props 或 state 的变化发起请求，

## 问题 4：什么是高阶组件

高阶组件（Higher-Order Component）是一个函数，它<u>接收一个组件作为参数，返回一个新的组件</u>。高阶组件的作用是复用组件的逻辑，并返回一个增强后的组件。

## 问题 5：受控组件 和 非受控组件

- **受控组件**：表单元素的数据是由 React 的 State 来管理。

> 其实就是实现了一个类似 Vue 的 v-model 的机制，通过 onChange 事件来更新 value，这样就实现了受控组件。

::: details 例如：

我们在界面的输入框中输入内容，这时候你会发现这个 value 是只读的，无法修改，还会报错

```tsx
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <input type="text" value={value} />
      <div>{value}</div>
    </>
  );
};

export default App;
```

当用户输入内容的时候，value 并不会自动更新，这时候就需要我们手动实现一个 onChange 事件来更新 value。

```tsx
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <div>{value}</div>
    </>
  );
};

export default App;
```

:::

```jsx
import React, { useState } from "react";

// 受控组件
function ControlledComponent() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>输入的内容: {inputValue}</p>
    </div>
  );
}

export default ControlledComponent;
```

- **非受控组件**：是指表单元素不受 React 的 State 管理。它的状态通常通过 ref 从 DOM 中获取。

> 采用 `defaultValue`，变为非受控组件

```jsx {13}
import React, { useState, useRef } from "react";
const App = () => {
  const value = "wifi";
  const inputRef = useRef(null);
  const handleChange = () => {
    console.log(inputRef.current?.value);
  };
  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        defaultValue={value}
        ref={inputRef}
      />
    </>
  );
};

export default App;
```

- **特殊的非受控组件**：对于 file 类型的表单控件，它是一个特殊的组件，因为它的值只能由用户通过文件选择操作来设置，而不能通过程序直接设置，所以<u>`file`只能是非受控组件</u>。

> 受控组件适用于所有表单元素，包括 input、textarea、select 等。但是除了 `input type="file"` 外，其他表单元素都推荐使用受控组件。

## 问题 6：类组件 和 函数式组件 区别

### 类组件（Class component）：

- 通过继承 React.Component 类来定义组件。
- 可以包含自己的状态（state）和生命周期方法。
- 可以使用 this 关键字来访问组件的状态和 props。
- 可以使用 ref 来访问 DOM 元素或子组件。
- 可以使用 setState 方法来更新组件的状态，触发组件的重新渲染。
- 通常用于复杂的组件，需要管理自己的状态并响应生命周期事件。

### 函数式组件（Functional component）：

- 通过函数来定义组件，接收 props 作为参数，返回 JSX 元素。
- 没有自己的状态和生命周期方法。
- 不能使用 this 关键字来访问组件的状态和 props。
- 通常用于简单的展示组件，只关注 UI 的呈现和展示，不需要管理状态和响应生命周期事件。

## 问题 7：React 中组件通信方式

- 父传子
  - props、Context 上下文（useContext）
- 子传父
  - 回调函数（通过父组件向子组件 props 传递一个函数，由子组件向函数中传递参数，父组件接收）
- 子孙组件
  - Context 上下文（useContext）
- 兄弟组件
  - 类似全局事件总线（例如：第三方库 PubSubJS），原理：消息的发布订阅机制
  - 状态管理库（redux、zustand）

## 问题 8：React 是 mvvm 框架吗？

- React 不是一个典型的 MVVM（Model-View-ViewModel）框架。
- React 强调单向数据流的概念，其中数据从父组件通过 props 传递给子组件，子组件通过回调函数将状态更改传递回父组件。这种单向数据流的模型有助于构建可预测和可维护的组件，但与典型的双向绑定的 MVVM 模式不同。

## 问题 9：React 性能优化方案

1. 使用 React.memo()来缓存组件，该组件在 props 没有变化时避免不必要的渲染。。
2. 使用 React.lazy()和 Suspense 来延迟加载组件。可降低初始加载时间，并提高应用程序的性能。
3. 使用 React.useCallback()和 React.useMemo()来缓存函数和计算结果，避免不必要的函数调用和计算。
4. 使用 React.Fragment 来避免不必要的 DOM 节点。可减少 DOM 节点数量，提高应用程序的性能。

## 问题 10：refs 的作用

在 React 中，refs（引用）是用于访问组件或 DOM 元素的方法。

1. **访问组件实例**：通过 refs，可以获取到组件的实例，从而可以直接调用组件的方法或访问组件的属性。这在某些情况下非常有用，例如需要手动触发组件的某个方法或获取组件的状态。
2. **访问 DOM 元素**：通过 refs，可以获取到 React 组件中的 DOM 元素，从而可以直接操作 DOM，例如改变样式、获取输入框的值等。这在需要直接操作 DOM 的场景下非常有用，但在 React 中应该尽量避免直接操作 DOM，而是通过状态和属性来控制组件的渲染。

## 问题 11：React 项目是如何捕获错误的？

在 react16 中引入了错误边界，来捕获错误，做出降级处理。

- 使用 `static getDerivedStateFromError()` 做 UI 降级。
- 使用 `componentDidCatch()` 打印错误信息。

**可以捕获的错误**：渲染层面的错误 和 生命周期方法中的错误。

> ⚠️ 注意：以下异常无法捕获
>
> 1. 事件处理函数中抛出的异常
>
> 2. 异步代码中抛出的异常
>
> 3. 错误边界自身抛出的错误：如果错误边界组件本身抛出了错误，则它无法捕获该错误。

::: code-group

```tsx [ErrorBoundary组件]
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI。
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器。
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染。
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

```tsx [使用ErrorBoundary]
<ErrorBoundary>
  <MyComponent />
  {/* ...其余业务组件 */}
</ErrorBoundary>
```

:::

## 问题 12：React 中 ‌ 自定义 Hook 的规范

1. 命名规范

- ‌ 以“use”开头 ‌：自定义 Hook 的命名必须以“use”开头，这是 React 和 Vue 中自定义 Hook 的命名约定。例如，useCounter、useFetchData 等 ‌
- ‌ 函数形式 ‌：自定义 Hook 是一个函数，用于封装可复用的逻辑。

2. 使用规范

- ‌ 只能在函数组件中使用 ‌：自定义 Hook 只能在函数组件中使用，不能在普通的 JavaScript 函数中使用。例如，不能在类组件或普通的 JavaScript 函数中调用自定义 Hook‌
- ‌ 只能在顶层调用 ‌：自定义 Hook 必须在函数组件的顶层调用，不能在循环、条件或嵌套函数中调用。确保每次组件渲染时 Hook 的调用顺序完全相同 ‌
- ‌ 可以调用其他 Hook‌：自定义 Hook 可以调用其他内置的 React Hooks（如 useState、useEffect 等）。

## 问题 13：React 什么不能在循环、条件或嵌套函数中调用 Hook？

原因是 React 依赖 hook 调用顺序，内部采用 index 下标去识别每个 Hook 的位置，
若在条件或循环中调用 Hook，会导致调用顺序不一致，破坏内部 Hook 栈，从而引发运行时错误或逻辑异常。

## 问题 14： React 事件机制

React 的事件机制与原生 DOM 事件机制不同，它基于 合成事件（SyntheticEvent）构建，提供了跨浏览器的统一事件处理方式。React 通过对事件的委托（event delegation）优化了性能，使得事件处理更加高效。

**合成事件：**

合成事件是对浏览器原生事件的封装，它们提供了相同的接口和功能，但在内部处理上做了优化。合成事件保证了事件处理的跨浏览器一致性，并且提供了额外的性能优化。

**合成事件的优势：**
1. 跨浏览器一致性兼容性：React 使用了合成事件，因此事件处理 across browsers consistently。
2. 性能优化：React 使用了事件委托（event delegation），从而避免了在每个 DOM 元素上添加事件监听器。事件池：React 为每个事件创建一个池，重用事件对象，避免了频繁的内存分配。
3. 统一的接口：合成事件实现了与原生 DOM 事件类似的接口，支持 stopPropagation、preventDefault 等常用方法。


## 问题 15：为什么父组件更新会导致所有子组件渲染？如何避免？
react默认采用"render and diff"策略，使用React.memo/shouldComponentUpdate阻断无效更新

## 问题 16：函数组件每次渲染都会创建新函数，如何避免传递新props？
使用useCallback缓存函数引用
````js
const handleSubmit = useCallback(() => { /*...*/ }, [deps]);
````

## 问题 17：useEffect和useLayoutEffect的区别？
useEffect异步执行（不阻塞渲染）
useLayoutEffect同步执行（在DOM更新后，浏览器绘制前）