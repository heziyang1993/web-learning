<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="vue/vue.js"></script>
</head>
<body>

    <div id="demo">
        <!-- 指令里面不写{{}} -->     
        <p style="color:red">1.{{}}</p>
        <p>{{name}}</p>
        
        <p style="color:red">2.v-text/ng-bind</p>
        <p v-text="name"></p>

        <p style="color:red">3.v-html/ng-bind-html</p>
        <!-- 安全处理 -->
        <p>{{{html}}}</p>

        <p style="color:red">4.v-if/ng-if</p>
        <p v-if="bool">Hello 假</p>
        <p v-if="!bool">Hello 真</p>
        
        <p style="color:red">5.v-show/ng-show</p>
        <p v-show="bool">Hello 假</p>
        <p v-show="!bool">Hello 真</p>

        <p style="color:red">6.v-else</p>
        <!--v-else和v-if/v-show要写在一起-->
        <p v-if="bool">Hello 假</p>
        <p v-else>Hello 真</p>

        <p v-if="num>4">Hello 假</p>
        <p v-else>Hello 真</p>

        <p style="color:red">7.v-for/v-repeat</p>
            <ul>
                <!--如果重复有相同的内容使用track-by="$index"-->
                <li v-for="a in arr" track-by="$index" state="{{$index}}">{{a}}</li>
                <li v-for="(index a) in arr" track-by="index"></li>
            </ul>
        
        <p style="color:red">8.v-on:click/ng-click</p>
        <!-- <button v-on:click="ok()">ok</button> -->
        <button @click="ok()">ok</button>

        <input type="text" v-on:keyup="keyup">

        <p style="color:red">9.v-bind/ng-class&&ng-style</p>
        //v-bind:class -->:class
        <p v-bind:class="{blue:bool}">我是class</p>
        <p v-bind:style="{fontSize:size+'px'}">我是style</p>

        <!-- 双向数据绑定 -->
        <p style="color:red">10.v-model/ng-model</p>
        <input type="text" v-model="text">
        <textarea v-model="text"></textarea>
        <p>你输入了:{{text}}</p>
        <select v-model="text">
            <option v-for="a in arr" track-by="$index" value="{{a}}">{{a}}</option>
        </select>
        <input type="range" v-model="size">
        
        <p>我是obj: {{obj.name}} {{obj.age}} {{obj.skill}}</p>
        <!--支持三元表达式-->
        <p></p>
        
        <!--vue v2.0只保留了自定义过滤器-->
        <p style="color:red">过滤器</p>
        <p style="color:red">currency</p>
        <p>{{num | currency "￥" 5}}</p>
        
        <p style="color:red">大小写</p>
        <p>{{name | uppercase}}</p>
         <p>{{name | lowercase}}</p>

        <p style="color:red">debounce</p>
        <button @click="click() | debounce 2000">debounce</button>

        <p style="color:red">orderBy&&filterBy&&limitBy</p>
        <p style="color:yellow">orderBy</p>
        <ul>
            //orderBy 最后一个参数是1 或者 -1
            <li v-for="ele in arr1 | orderBy 'name' 1">{{ele.name}} {{ele.skill}}</li>
        </ul>

        <p style="color:yellow">filterBy</p>
        <ul>
            <li v-for="ele in arr1 | filterBy 'YANG' in 'name'">{{ele.name}} {{ele.skill}}</li>
        </ul>
        
        <p style="color:yellow">limitBy</p>
        <ul>
            <li v-for="ele in arr1 | limitBy 2 1">{{ele.name}} {{ele.skill}}</li>
        </ul>
    </div>

    
</body>
<script>
    //形式一
    
    //类似angular controller
    //构造器 ==>M层和V层 MVVM模型
    /*
        new Vue({
        //节点==>querySelector
        el:'#demo',
        //数据
        data:{
            name:'Hello World',
            html:'<p>123<span style="color:yellow">456</span></p>',
            bool:false,
            num:5,
            arr:[0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0],
            size:30,
            text:'',
        },
        //函数
        methods:{
            ok:function(){
                console.log('ok')
            },
            keyup:function(){
                console.log('正在输入')
            }
        }
        
    })
     */
    //指令
    
    //形式二
    
    var vueData= {
        //节点==>querySelector
        el:'#demo',
        // template:'<p>123</p>',==>模板
        //数据
        data:{
            name:'Hello World',
            html:'<p>123<span style="color:yellow">456</span></p>',
            bool:false,
            num:12345,
            arr:[0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0],
            size:30,
            text:'',
            obj:{
                name:'YANG',
                age:20,
                skill:'web'
            },
            arr1:[
                {
                    name:'YAO',
                    skill:'ps'
                },
                {
                    name:'YANG',
                    skill:'ps'
                },
                {
                    name:'FAM',
                    skill:'ps'
                }
            ]
        },
        //函数
        methods:{
            ok:function(){
                console.log('ok')
            },
            keyup:function(){
                console.log('正在输入')
            },
            click:function(){
                console.log('debounce')
            }
        },
        //计算属性 上面写 {{nickname}}
        computed:{
            nickname:function(){
                return this.name + this.num
            }
        }
        /*
            //生命周期 vuev1.0 created -->beforeComplie -->complied -->ready(写逻辑的地方)
            //虚拟DOM
            //拿数据
            created:function(){
                console.log('创建完状态')
                console.log(this.$el)//null
                console.log(this.$data)//有
            },
            //得到数据
            beforeComplie:function(){
                console.log('编译前状态')
            },
            //把模板插入DOM节点
            complied:function(){
                console.log('编译完成')
            },
            ready:function(){
                console.log('DOM已经完全生成')
                //可在这里执行函数 == vueData.ok()
                this.ok();
            }
         */
        /*
            //生命周期v2.0
            beforeCreate:function(){
                //创建前
                console.log(this.$el)//undefined
                console.log(this.$data)//undefined
            },
            created:function(){
                //创建后
                console.log(this.$el)//undefined
                console.log(this.$data)//有
            },
            //compiled
            beforeMount:function(){
                //挂载前
                console.log(this.$el)//undefined
                console.log(this.$data)//有
            },
            //ready
            mounted:function(){
                //挂载后
                console.log(this.$el)//有
                console.log(this.$data)//有
            },
            beforeUpdate:function(){
                //更新前 -->生成了数据，先更新模板
            },
            updated:function(){
                //更新后 -->把更新后的东西插入节点
            }
        */
    }
    new Vue(vueData);


    //形式三
    
    /*
        var demo = new Vue(){
    
        }
        demo.data.news = ''
     */
    
</script>
</html>