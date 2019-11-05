---
layout: post
title: npm package技术实践
---

基本目的：将vue组件上传到npm文件服务器上，方便不同项目的调用，做到组件的解耦以及脱水。目前计划尝试解耦新做的coupon组件，后续计划解耦页面头尾，步进器。

需要进一步学习：

vue方面：

* 父子组件事件传递（已完成）
* 插槽slot（已完成）

npm方面：

* 上传npm package及其使用（已完成）
* webpack的构建步骤/将vue文件编译成js文件/build a vue component library

----

#### 父子组件事件传递

子组件传父组件的本质是自定义事件。

父组件：```@事件名称="function()"```

子组件：```@click="$emit('事件名称')"```

----

#### 插槽slot

比较简单，见https://cn.vuejs.org/v2/guide/components-slots.html

具名插槽：

父组件：```<template slot="slotName"></template>```

子组件：```<slot name="slotName"></slot>```

----

#### 将组件上传到npm package及其使用

在组件文件夹内使用`` npm login ``登录npm，使用``npm publish``上传当前版本。npm文件服务器搜索package.json中的version字段来判断版本，而不是通过文件的哈希值。

可见我的项目https://github.com/RuoChen95/Learn-Vue-2，其中的[sample project](https://github.com/RuoChen95/Learn-Vue-2/tree/master/sample-project)的coupon就用到了自己写的[coupon组件](https://github.com/RuoChen95/Learn-Vue-2/tree/master/btm-coupon-demo-pkg)。目前版本可以说是npm package的最简化版了。在使用的时候注意写明组件路径：

``` import Coupon from 'btm-coupon-demo-pkg/components/coupon.vue' ```

在项目文件夹内输入 ```npm link [package path]``` 后就能将本地文件关联到项目文件中，方便调试。

----

#### webpack的构建步骤/将vue文件编译成js文件/build a vue component library

参考：

1. https://juejin.im/post/5b23149b6fb9a00e325e6a80
2. vue-cli打包package的方法：https://cli.vuejs.org/guide/build-targets.html#library
3. vue-cli的配置方法：使用vue.config.js文件

需要有两个文件：

1. webpack.config.js文件：用于进行打包的配置，将文件进行打包编译。webpack的作用类似于以前的gulp和grunt。
2. package.json文件：npm的属性文件，用于指明项目所使用的不同包

其他的就是不同npm包的使用，组合起来打包项目。

目前使用了构建工具vue-cli，具体使用方式为：

1. 在npm中配置好具体的打包方式，使用[Web Component方式](https://cli.vuejs.org/guide/build-targets.html#web-component)打包；
2. 打包后会生成编译后的js文件；
3. 使用npm link测试本地文件：
    1. 在package文件中使用npm link，出现：本地npm包路径 -> 本地package路径
    2. 在项目文件中使用npm link [package名称]，出现：项目npm包路径 -> 本地npm包路径 -> 本地package路径。npm unlink同理。
4. 在项目中正确引用(待写...)

