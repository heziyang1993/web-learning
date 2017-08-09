### react-redux


要将 Redux 和 React 结合起来使用，就还需要一些额外的工具，其中最重要的是 react-redux 。

react-redux 提供了两个重要的对象，Provider 和 connect，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。

### redux 的基本用法

通过 reducer 创建一个 store，每当我们在 store 上 dispatch 一个 action，store 内的数据就会相应地发生变化。
```
const reducer = (state = {count: 0}, action) => {
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```
### 直接在 React 中使用 Redux

在最外层容器组件中初始化 store，然后将 state 上的属性作为 props 层层传递下去。
```
class App extends Component{

  componentWillMount(){
    store.subscribe((state)=>this.setState(state))
  }

  render(){
    return <Comp state={this.state}
                 onIncrease={()=>store.dispatch(actions.increase())}
                 onDecrease={()=>store.dispatch(actions.decrease())}
    />
  }
}
```
# 使用 react-redux 提供的 Provider 和 connect 方法

```
首先在最外层容器中，把所有内容包裹在 Provider 组件中，将之前创建的 store 作为 prop 传给 Provider。

const App = () => {
  return (
    <Provider store={store}>
      <Comp/>
    </Provider>
  )
};
Provider 内的任何一个组件（比如这里的 Comp），如果需要使用 state 中的数据，就必须是「被 connect 过的」组件——使用 connect 方法对「你编写的组件（MyComp）」进行包装后的产物。

class MyComp extends Component {
  // content...
}

const Comp = connect(...args)(MyComp);
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

connect() 接收四个参数，它们分别是 mapStateToProps，mapDispatchToProps，mergeProps和options

mapStateToProps(state, ownProps) : stateProps

将 store 中的数据作为 props 绑定到组件上。

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
这个函数的第一个参数就是 Redux 的 state，我们从中摘取了 count 属性。因为返回了具有 count 属性的对象，所以 MyComp 会有名为 count 的 props 字段

class MyComp extends Component {
  render(){
    return <div>计数：{this.props.count}次</div>
  }
}

const Comp = connect(...args)(MyComp);
不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。

const mapStateToProps = (state) => {
  return {
    greaterThanFive: state.count > 5
  }
}   
mapDispatchToProps(dispatch, ownProps): dispatchProps

将 action 作为 props 绑定到 MyComp 上。

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: (...args) => dispatch(actions.increase(...args)),
    decrease: (...args) => dispatch(actions.decrease(...args))
  }
}

class MyComp extends Component {
  render(){
    const {count, increase, decrease} = this.props;
    return (<div>
      <div>计数：{this.props.count}次</div>
      <button onClick={increase}>增加</button>
      <button onClick={decrease}>减少</button>
    </div>)
  }
}
const Comp = connect(mapStateToProps， mapDispatchToProps)(MyComp);

由于 mapDispatchToProps 方法返回了具有 increase 属性和 decrease 属性的对象，这两个属性也会成为 MyComp 的 props。

调用 actions.increase() 只能得到一个 action 对象 {type:’INCREASE’}，要触发这个 action 必须在 store 上调用 dispatch 方法。diapatch 正是 mapDispatchToProps 的第一个参数。

为了不让 MyComp 组件感知到 dispatch 的存在，将 increase 和 decrease 两个函数包装一下，使之成为直接可被调用的函数（即，调用该方法就会触发 dispatch）。
```
Redux 本身提供了 bindActionCreators 函数，来将 action 包装成直接可被调用的函数。
```
import {bindActionCreators} from 'redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    increase: action.increase,
    decrease: action.decrease
  });
}
```

根据connect的API我们发现可以使用ES7 decorator功能来配合React ES6的写法：
```
@connect(
  state => ({
    user: state.user,
    resource: state.resource
  }),
  dispatch => ({
    ...bindActionCreators({
      loadResource: ResourceActions.load
    }, dispatch)
  })
)
export default class Main extends Component {

}
```