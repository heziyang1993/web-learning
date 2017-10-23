### 递归组件

```
要记得在main.js里面注册一个全局的组件，否则会报错
import tree from '../components/routes/tree.vue'
Vue.component('tree', tree)
```
#### 父组件

```
<template>
  <div style="width: 100%;height: 100%;background: white;">
  <!--v-for第一层，将第二层传进组件-->
    <ul v-for="ele in data">
      <li>
        <tree :mod="ele"></tree>
      </li>
    </ul>
    
  </div>
</template>

<script>
  import tree from './tree.vue'
  export default {
    data () {
      return {
        data: [{
          title:'1',
          children: [{
            title:'1-1'
          },{
            title:'1-2'
          },{
            title:'1-3'
          }]
        },{
          title:'2',
          children: [{
            title:'2-1'
          },{
            title:'2-2'
          },{
            title:'2-3'
          }]
        },{
          title:'3',
          children: [{
            title:'3-1'
          },{
            title:'3-2'
          },{
            title:'3-3'
          }]
        }],
      }
    },
    components: {
      tree
    }
  }
</script>

<style>
</style>
```
#### 子组件

```
<template>
  <li @click="toggle">
    <span>{{mod.title}}</span>
    <!--v-if的时候才会加载组件-->
    <ul v-show="show" v-if="isFolder">
      <!--如果没有mod=item，v-for就会识item.title,就不会匹配到mod.title-->
      <tree  v-for="item in mod.children" :mod="item"></tree>
    </ul>
  </li>
</template>

<script>
  export default {
    props: ['mod'],
    data() {
      return {
        name: 'tree',
        show: false
      }
    },
    methods: {
      toggle() {
        this.show = !this.show
      }
    },
    computed: {
      isFolder () {
        return this.mod.children && this.mod.children.length
      }
    }
  }
</script>

<style>

</style>
```
