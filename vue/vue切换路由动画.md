### 切换路由动画

```
<template>
  <!--根据不同状态给transition切换不同的雷鸣进行不同的动画操作-->
  <transition name="slide-fade">
    <!--给予过度内容绝对定位可以避免白屏状况-->
    <router-view class="child-view"></router-view>
  </transition>
</template>
<script>
  router.beforeEach((to, from, next) => {
    // 在导航钩子里面设置相应的状态，从而判断使用什么类名
    // demo
    const list = ['home', 'group', 'user']    // 将需要切换效果的路由名称组成一个数组
    const toName = to.name    // 即将进入的路由名字
    const fromName = from.name    // 即将离开的路由名字
    const toIndex = list.indexOf(toName)    // 进入下标
    const fromIndex = list.indexOf(fromName)   // 离开下标
    let direction = ''
    if (toIndex > -1 && fromIndex > -1) {   // 如果下标都存在
      if (toIndex < fromIndex) {          // 如果进入的下标小于离开的下标，那么是左滑
        direction = 'left'
      } else {
        direction = 'right'         // 如果进入的下标大于离开的下标，那么是右滑
      }
    }
    return next()
  })
</script>
<style>
  .slide-fade-enter-active {
    /*transition: all .3s ease;*/
    animation: silde-left 1s ;
  }
  .slide-fade-leave-active {
    /*transition: all .3s ease;*/
    animation: silde-right 1s ;
  }
  @keyframes silde-left{
    from{transform: translate3d(-100%, 0, 0)}
    to{transform: translate3d(0, 0, 0)}
  }
  /*@keyframes silde-right{
    from{transform: translate3d(0, 0, 0)}
    to{transform: translate3d(-100%, 0, 0)}
  }*/
  .child-view {
    position: absolute;
    width:100%;
    /*transition: all .8s cubic-bezier(.55,0,.1,1);*/
  }
</style>
```