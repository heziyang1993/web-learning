<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="vue-router_v2.0.js"></script>
</head>
<body>
<script>
//2版本需要构造器,1版本不需要
//没有感叹号
    var page1 = {
        template:`<div>
                    <router-view></router-view>
                </div>`
    }
    var page2 = {
        template:'<div></div>'
    }
    var router = new VueRouter({
        //相当于routers:routes
        routes:[{
            path:'/index',
            component:page1
        },{
            path:'/home',
            component:page2
        },{
            //重定向
            path:'/',
            redirect:'/index'
        }]
    })
     //自定义路由对象
    router.beforeEach(function(transition){
        if(transition.to.path === '/index'){
            //处理路由逻辑
        }else{
            //处理路由逻辑
        }
    });
    new Vue({
        el:'#app',
        //注入router
        router,
        template:`<router-view></router-view>`
        ,
        mounted(){
            //detail/1
            this.$route.params.id
            //detail?id=1
            this.$route.query.id
        }
    })

    //路由嵌套
    var router = new VueRouter({
        //相当于routers:routes
        routes:[{
            path:'/index',
            component:page1,
            children:[{
                //子路由没有/
                path:'a',
                component:{
                    template:'<div>a</div>'
                }
            }]
        },{
            path:'/home',
            component:page2
        },{
            //重定向
            path:'/',
            redirect:'/index'
        }]
    })
</script>
    
</body>
</html>