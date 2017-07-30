<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<script>
     new Vue({
        data:{
            name:'YANG'
        }
        //类似虚拟DOM
        render:function(createElement){
            return  createElement(
                'h1',//tag name
                //子组件中的阵列
                {
                    attr:{
                        id:'abc'
                },
                [
                    '{{name}}',
                ]
            )
        },
    })
</script>
   
</body>
</html>
