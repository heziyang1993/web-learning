```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        var store = new Vuex.Store({
            //定义一个状态
            //页面一进来就有状态,存储数据，刷新返回初始值
            state:{
                count:1
            },
            //分发状态
            mutations:{
                setCount:function(state,data){
                    state.conut = data;
                }
            }
        })
        new Vue({
            methods:{
                setCount(){
                    console.log(this.$store.state.count)
                }
            }
        })
        //修改state数据
        // 暴力修改状态
        this.$store.state.search = this.searchTitle;
        // 提交修改触发mutations
        this.$store.commit("setCount",this.searchTitle)
        // 提交修改触发actions
        this.$store.dispatch('setChange',this.searchTitle)
    </script>
</body>
</html>
```
