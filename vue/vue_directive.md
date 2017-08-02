<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue.directive</title>
    <script src="vue.js"></script>
</head>
<body>

    //要使用v-写法
    <p v-focus></p>
</body>
<script>
    //1.0写法
    Vue.directive('color',function(){
        //this.el = angular 的link ele
        //this指向引用指令的内容,this.expression指向v-color = 'red'的red
        this.el.style.color = this.expression;
        this.el.getAttribute('xxx')
        //等于scope
        this.vm.name = 'yang';
    })
    //2.0写法
    Vue.directive('color,'{
        // 当绑定元素插入到 DOM 中。
        bind: function (el,binding,vnode) {
            // 聚焦元素
            el.focus()
        }
    })
    
    new Vue({
        el:'#demo',
        data:{
            name:'YANG'
        }
    })

    //angular写法
    app.directive('xxx',function(){
        return {
            template:'',
            controller:'',
            link:function(scope,ele,attr){

            }
        }
    })
</script>
</html>