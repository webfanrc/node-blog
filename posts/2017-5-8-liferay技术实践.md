---
layout: post
title: Liferay实践回顾
---

liferay是一个开源Java库，通常是作为企业的内网系统。这个库将页面的不同元素，例如日历、开会计划等作为模版，用户可以通过模版来组织页面格式。由于公司项目要求，已经学习、使用了一段时间。以下是主要的学习进程，很多东西没有用到，但是需要记录。

## 通过配置文件开发

### 加载自定义CSS

通过管理员账号登陆后，在导航-页面-配置-外观和风格-CSS中直接导入想要改变的CSS代码即可。主要通过className来区分页面。注意页面的配置中的外观和风格处选择“使用和私有页面相同的外观”，而不要选“为此页面定义一个独有的外观”。

### 载入HTML

lifery 的wiki portel中的一项支持HTML代码，并且为表格文档提供编辑器，能让用户自己编辑表格。表格的格式可以通过CSS改变。这个portel还有一个特点，就是可以支持单页面以及js行为控制，这就配合css的<code>display:hidden</code>等属性，能够实现页面的定制化。

### 执行JavaScript

如果需要动态改变CSS，需要导入JavaScript，这个时候可以在导航-页面-配置-高级的-JavaScript中加上你需要的代码，这会被全局应用。框架已经自带jQuery，但是没有Boostrap。

### lar包

上述内容都配置完之后，可以在系统的导出界面导出lar包，然后可以在默认界面中将lar包进行导入，应用样式、结构以及portel。lar包可以通过[相关](http://blog.csdn.net/caroline_wendy/article/details/42190743)命令行进行解压以及压缩。<a title="17.5.31">目前</a>的问题是导入导出后会报出<code>java.lang.NullPointerException</code>的问题。

## 通过命令行开发

### 环境

需要三大类环境：node，npm；yeoman；SASS from Ruby。根据[教程](https://dev.liferay.com/zh/develop/tutorials/-/knowledge_base/7-0/themes-generator)配置即可。但是，npmrc文件如果按照上面要求修改，环境会报错安装不上，npm在后续构建theme的时候也会报错。

### portal_normal.ftl

../\"theme name\"/src/templates/portal_normal.ftl文件是liferay模版文件，改了其中的代码后可以直接在主页中显示出来，是主要需要进行修改的地方。具体可以直接调用的模版是宏（[macros](https://dev.liferay.com/zh/develop/tutorials/-/knowledge_base/7-0/freemarker-macros)）,其中的date宏不能直接调用，control_menu如果已经有了调用后会和已有的重叠，breadcrumbs只能调用一次，user_personal_bar就是一个简单的小用户界面。

调用后在theme文件中使用<code>gulp deploy</code>就能生成build文件，然后在对应的tomcat文件夹中用.sh文件部署服务器即可实现这份ftl文件的改动，注意需要在feel and look中选择相应的样式。样式方面，可以通过改变_custom.scss实现。

目前的问题，无法自定义宏以及不知道连接前后端。

### Liferay Theme Generator

激活代码是<code>yo liferay-theme</code>

使用yeoman引入这个主题构建器，这个构建器会创建好一个主题的架构。在文件中会有一个src文件夹，这个src文件夹会存储进行改动的文件。其中的CSS文件是以Sassy CSS文件存储的。这个构建器还能通过<code>yo liferay-theme:layout</code>以及<code>yo liferay-theme:themelet</code>来改变页面的基础布局以及增加小组件。目前的问题如果使用这个方式，将theme构建好之后不知道如何应用到已经在tomcat上跑起来的页面中……

## 通过Eclipse开发

### Liferay IDE

这是一个liferay的eclipse插件，可以通过eclipse插件广场上搜索下载。安装这个插件之后，在加上Java 8，就能新建基于liferay的项目了。

### liferay SDK

这是一个liferay的工具包，在新建项目的同时，需要将这个工具包所对应的文件位置引用一下。目前有个问题，就是文件引用的时候会报出“Invalid SDK settings. Configure app.server.parent.dir property in build.admin.properties to point to Liferay home”错误，解决方式就是找到build.properties文件，讲文件名称改成build.<你的电脑名字>.properties,然后在其中的app.server.parent.dir的值改成liferay portal的绝对路径。

### liferay portal

这是liferay所构建的JAVA页面，其中包括用于渲染页面的tomcat文件。它能体现liferay的基本的功能，但是没办法改样式。

### liferay portal SRC

这是liferay的工程源码，可以通过软件导入，不能用eclipse，文件格式也不是mavern。由于整个门户过于复杂，源码分析不现实，如果需要改样式的话需要通过新建模版完成。