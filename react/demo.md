### DEMO

```
//引入react react-router-dom react-redux 
import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, HashRouter} from 'react-router-dom';
import {createBrowserHistory, createHashHistory} from 'history'
const history = createHashHistory()
import {connect} from 'react-redux';

class Basic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xxx:xxx
		}
	// ES6 类中函数必须手动绑定
    this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect (){
		
	}
	render() {
		return (
			<HashRouter history={history}>
        		<div className="container">
	          		<div>hello world</div>
	          		<Route path="/home" component={Home}/>
	          		<Redirect to="/home/project"/>{/*默认跳转*/}
        		</div>
      		</HashRouter>
		)
	}
}
const store = createStore(counter);
//store
function conunter(state = {
	xxx:xxx
},action){
  	switch (action.type) {
	    case 'changeTab':
	      	return {
	        	count: count + 2
	    	}
	    	default:
	    		return state
		}
}

//action,此函数触发action,执行对应的type的函数
function changeTab() {
  return {type: 'changeTab'};
}


ReactDOM.render((
	//定义store
  	<Provider store={store}>
   		<Basic/>
  	</Provider>
), document.getElementById('container'))
```