<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        // Vue.component('page1',{
        //     template:'<div></div>'
        // })
        // Vue.component('page2',{
        //     template:'<div></div>'
        // })
        
        // v1.0写法
        var page1 = {
            template:'<div></div>'
        }
        var page2 = {
            template:'<div></div>'
        }
        var App={
            template:
            `
            <a href="#!/index"></a>
            <div><router-view></router-view></div>
            `
        };
        var router = new VueRouter();
        router.map({
            'index':{
                component:page1
            },
            'home':{
                component:page2
            }
        })
        //把App组建带到router-view，代替了new Vue
        router.start('App','#demo')
        // new Vue({
        //     el:'#demo',
        //     //注册
        //     router,
        //     template:'<div><router-view></router-view></div>'
        // })
         
        
        //自定义路由对象
        router.beforeEach(function(transition){
            if(transition.to.path === '/index'){
                //处理路由逻辑
            }else{
                //处理路由逻辑
            }
        })
    </script>
    
</body>
</html>