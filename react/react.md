# react

```
<body><div id="demo"></div></body>
<script src="react.js"></script>
<script src="react-dom.js"></script>
<script src="babel.js"></script>
<script type="text/babel">
	ReactDOM.render(
		<p>hello world</p>,
		document.querySelector('#demo')
	)
</script>
```

## 表达式

```
var name = 'yang';
var css = {
	fontSize:'20px'
};
var bool = true;
var arr = [
	<h1><h1>,
	<h2></h2>
];
ReactDOM.render(
	<div>{/*需要有父节点*/}
		{/*这是注释*/}
		<p style={css} id={name}>{name}</p>
		{/*支持三元表达式*/}
		<p>{bool?'真'：'假'}</p>
		<div>{arr}</div>
	</div>,
	document.querySelector('#demo')
)
```

## 组件

```
var Abc = React.createClass({
	getInitialState:function(){
		return {
			name:'yang'
		};
	},
	test:function(e){
		console.log(e)
	},
	changeText:function(event){
		console.log(event.target.value);
		//改变状态层
		this.setState({
			name:event.target.value
		})
	}
	,
	render:function(){
		/*
		 /this.state = {
			name:'yang'
		}
		 */
		return (
			<div>
				input value={this.state.name} onChange={this.changeText}
				<p>{this.state.name}</p>
				<button onClick="{this.test()}">ok</button>
			</div>
		)
	}
})
ReactDOM.render(
	{/*组件首字母必须大写*/}
	<Abc/>,
	document.querySelector('#demo')
	
)
```

## 生命周期

|生命周期|定义|
|-|-|
|Mounting|已插入真是DOM|
|Updating|正在被重新渲染|
|Unmounting|已移除真是DOM|

|方法|定义|
|-|-|
|componentWillMount|在渲染前调用,在客户端也在服务端。|
|componentDidMount|在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。|
|componentWillReceiveProps|在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。|
|shouldComponentUpdate|返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用。|
|componentWillUpdate|在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。|
|componentDidUpdate|在组件完成更新后立即调用。在初始化时不会被调用。例如销毁组件或者路由切换时触发|
|componentWillUnmount|在组件从 DOM 中移除的时候立刻被调用。|

## 生命周期组件API

|定义|API|
|-|-|
|设置状态|setState|
|替换状态|replaceState|
|设置属性|setProps|
|替换属性|replaceProps|
|强制更新|forceUpdate|
|获取DOM节点|findDOMNode|
|判断组件挂载状态|isMounted|


