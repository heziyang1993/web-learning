var webpack = require('webpack')
module.exports = {
	//帮助调错误
	devtool:'source-map',
    //转化js文件
    //入口文件
    //导入app文件夹下的main.js文件
    entry: __dirname + '/app/main.js'

    //导出
    output : {
        //导出的文件名字
        filename:'bundle.js',//[name].js?v=[chunkhash:6],避免缓存
        //导出路径
        path: __dirname + '/public'
    },
    //配置加载器
    //转化非js文件
    module:{
        loaders:[{
                //正则匹配文件类型
                test:/\.css$/,
                //cnpm install css-loader和style-loader模块
                //这里要先style再css
                loader:"style-loader!css-loader"
            },{
                //正则匹配文件类型
                test:/\.html$/,
                //cnpm install html-loader模块
                loader:"html-loader"
            },{
                //正则匹配文件类型
                test:/\.jpg|png|jpeg|gif$/,
                //cnpm install url-loader模块
                loader:"url-loader"
            },{
                //正则匹配文件类型 es6 ==> es5 
                //新建.babelrc文件
                test:/\.js$/,
                //cnpm install --save babel-core
                //cnpm install --save-dev babel-loader模块
                //cnpm install --save-dev babel-core babel-preset-es2015
                loader:"babel-loader"
            },{
                //正则匹配文件类型
                test:/\.vue$/,
                //cnpm install vue-loader --save模块
                //cnpm install --save-dev vue-template-compiler
                loader:"vue-loader"
            },{
                //正则匹配文件类型
                test:/\.scss$/,
                //cnpm install sass-loader --save 模块
                //cnpm install node-sass --save模块 
                loader:"sass-loader"
            },{
                //字体图标
                test:/\.(woff|svg|eot|ttf)\??.*$/,
                loader:"url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]"
        },{
                //正则匹配文件类型
                test:/\.ttf$/,
                //cnpm install file-loader --save 模块
                loader:"file-loader"
            }]
    },
    //引入插件
    plugins:[
    	new webpack.optimize.UglifyJsPlugin()
    ],
    //引入vue需要引入以下
    resolve:{
        alias:{
            'vue':'vue/dist/vue.js'
        }
    },
    //webpack服务器
    //安装webpack-dev-server模块
    //再运行webpack-dev-server
    devServer:{
        contentBase:"./public",//服务器需要加载的文件夹
        inline:true,//实时更新
        port:12345
    }
}

//main.js
//es6写法
    import Vue from 'vue' //==> require('vue')
    import VueRouter from 'vue-router'

    Vue.use(VueRouter)
    //axios ==>vue-resource
    import axios from 'axios'
    Vue.prototype.$ajax = axios;

    //mounted(){
        // this.$ajax.http.get('url',{
        //     params:{
        //         name:1,
        //     }
        // }).then((response)=>{
        //     state.data = response.data.data
        // },(err)=>{

        // })
    // }
    // 可设置默认值data：加载中，刷新就会显示
    // 
    // 组件首字母大写
    
    //组件里面添加scoped把东西锁定在组件里面<style scoped lang="scss"></style> 
    //
    //.vue文件
    //export default ==> module.exports
    //  export default {
    //     components:{
    //         <xheader></xheader>
    //     }
    //  }

    // import完文件之后，直接将组件插入component，就可以使用了
    //.vue文件内使用template标签<template></template>作为html的载体标签
    // vue要先注册再使用，注册就是在new Vue({})里面写component等指令
    //每个组件里面都需要module.exports={} 或者 export default{}
