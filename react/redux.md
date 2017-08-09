### redux

```
先引入redux
var store = Redux.createStore(counter)//参数为函数
function counter(state,action){
	if(typeof state === 'undefined'){
		return 0
	} ==> var state = 0//定义state
	switch (action.type) {
		case '':
		return xxx
		case:'':
		return xxx;
		default:
		return 'xxx';
	}
	switch (action.type2) {
		case '':
		return xxx
		case:'':
		return xxx;
		default:
		return 'xxx';
	}
	function render(){
		
	}
	render();
	store.subscribe(render)//监听变化==>computed
	//触发对应的action
	store.dispatch({
		type:'',
		type2:''
	})
}

//对应的action return对应的type ==>vue actions:{a(context,data){context.commit('a',data)}}
export function increaseAction() {
  return {type: 'increase'};
}

export function multiAction() {
  return {type: 'multi'};
}
```
