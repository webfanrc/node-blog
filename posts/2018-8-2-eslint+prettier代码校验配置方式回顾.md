---
layout: post
title: eslint + prettier + lint-staged代码校验配置方式回顾
---

基本目的：代码的风格需要统一，统一的代码风格也能降低项目出错的概率，例如能够校验v-for后是否加了:key，防止列表渲染出错。同时，为了提高效率，可以使用prettier自动将代码风格统一。

相关链接：

* [prettier官网](https://prettier.io/)
* [eslint官网](http://eslint.cn/docs/user-guide/configuring)

基本思路：

### 增加的package文件：

* prettier
* eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.
* eslint-plugin-prettier: 
Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
* eslint-plugin-vue: Official ESLint plugin for Vue.js
* vue-eslint-parser: The ESLint custom parser for .vue files, dependencies of eslint-plugin-vue.
* lint-staged: Before committing your code, fun lint;
* husky: Prevent bad commit

```
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue vue-eslint-parser lint-staged husky vue-loader@13.7.2
```

### 修改eslint配置文件：

```
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['prettier', 'plugin:vue/essential'],
  // required to lint *.vue files

  // using 'html' plugin will alert: "warning  Delete `⏎`  prettier/prettier"
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  'rules': {
    'prettier/prettier': ['warn'],
  }
}
```

### 增加npm命令：

* 用prettier将文件统一：```"format": "prettier --write '{src,config,mock}/**/*.{js,json,vue,less}'"```
* 用eslint校验代码格式：```"lint": "eslint --ext .js,.vue src"```，具体含义就是校验.js文件，.vue文件以及src目录下的文件。

### 增加.prettierrc文件：
```
{
  "printWidth": 120,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### 增加git hooks配置：
```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,json,vue,less}": [
      "prettier --write",
      "git add"
    ]
  },
```

----

常见问题：

* npm run lint后，报错：```Elements in iteration expect to have 'v-bind:key' directives  vue/require-v-for-key``` 。增加key值即可。

* npm run dev后，报错："No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred"。安装最新版本的vue-loader即可：```npm install --save-dev vue-loader@13.7.2```

* 可能一些自定义标签prettier的基本规范不认，导致报错："Parsing error: x-invalid-end-tag  vue/no-parsing-error"，可以在eslintrc.js中配置规则```"vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]```


细节问题：

* eslint和prettier的关系：eslint是JavaScript的语法验证器，其作用只是告诉用户哪里的代码不符合规范，自动帮助用户修改文件的功能较弱，而且其配置项较多，不太容易使用。prettier是"opinionated code formatter"、"固执的代码修改器"，能以较少的配置项自动的帮助用户修改文件。本质就是使用了eslint的校验文本功能，prettier的基本规范以及prettier的自动修改功能。