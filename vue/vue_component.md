```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="demo">
        <button @click="ok()"></button>
    </div>
</body>
<script>
    //组建高度封闭，不会继承构造器的属性,组件里面的属性不会受外部影响
    Vue.component('xheader',{
        template:`<div>{{name}}</div>`,
        data:function(){
            return {
                name:'HE'
            }
        },
        methods:{
            ok:function(){
                console.log('ok')
            }
        },
        filters:{
            ed:function(input){
                return input + 'ed'
            }
        },
        directives:{
            //vue 2.0写法
            color:function(el,binding,vnode){
                el.style.color = binding.value;
            }
        },
        //父-->子通信
        props:['message'],
        mounted:function(){
            console.log(this.message)
        }
    })
    new Vue({
        el:'#demo',
        data:{
            name:'YANG'
        },
        //:meassage="name" --> message="{{name}}"
        template:'<xheader :message="name"></xheader>'
    })
    // Object.assign(vm.$data, vm.$options.data()) 重置当前组件
</script>
</html>
```
