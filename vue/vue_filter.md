<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue.filter</title>
    <script src="vue.js"></script>
</head>
<body>
    
    //一定要写在new Vue前面
    Vue.filter('ed',function(input){
        return input + 'ed'
    })
    new Vue({
    el:'#demo',
    template:`
        <div>
            <p>{{name}}</p>
        </div>
        `,
        data{
            name:'YANG'
        }

    })
    //angular写法
    var app = angular.module('ANG',[]);
    app.filter('ed',function(){
        return function(input){
            return input + 'ed'
        }
    })

    //高亮案例
    <div id="demo">
        
    </div>
    <script>
        Vue.filter('highlight',function(input,search){
            var arr = this.html.split(search);
            
            return arr.join('<span style="color:red">'+search+'</span>')
            console.log(arr)
        })
        new Vue({
            el:'#demo',
            template:`
                <div>
                    <input type="text" v-model="search">
                    <p>{{{html | highlight search}}}</p>
                </div>
                `,
            data:{
                search:'',
                html:'YANGYANGYANGYANGYANGYANG'
            }
        }) 
    </script>
</body>
</html>