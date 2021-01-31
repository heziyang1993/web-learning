配合webpack的基本使用
```
// 基本
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
npm install webpack webpack-cli --save-dev
npm install --save-dev html-webpack-plugin
npm install --save-dev babel-loader
```

```
// babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const join = (paths) => {
  return path.join(__dirname, paths)
}

const resolve = (paths) => {
  return path.resolve(__dirname, paths)
}

module.exports = {
  mode: 'development',
  entry: resolve('../index.js'),
  output: {
    filename: 'main.js',
    path: resolve('../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'
			  // 如果需要额外配置，按照下面方式写
              // ['@babel/preset-env', {
              //   useBuiltIns: "usage"
              // }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};

// package.json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "main": "index.js",
  "scripts": {
    "build": "webpack --config ./config/webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/plugin-transform-runtime": "^7.11.5",
    "@babel/preset-env": "^7.11.5",
    "babel-loader": "^8.1.0",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  },
  "dependencies": {
    "@babel/runtime": "^7.11.2",
    "@babel/runtime-corejs3": "^7.11.2"
  }
}
```


DEMO目录
|-- Desktop
    |-- babel.config.json
    |-- index.js
    |-- package-lock.json
    |-- package.json
    |-- config
    |   |-- webpack.config.js
    |-- dist
        |-- index.html
        |-- main.js





@babel/preset-env 
-- 转化最新语法如箭头函数, class, 扩展运算符，想要转换最新的api还需引入babel-polyfill（eg: includes）
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
		"target": "> 0.25%, not dead"
      }
    ]
  ]
}

// options
-- targets string | Array<string> | { [string]: string }, defaults to {} 指定执行环境
-- spec 
-- loose
-- modules
-- debug
-- include
-- exclude
-- useBuiltIns
-- corejs
-- forceAllTransforms
-- configPath
-- ignoreBrowserslistConfig
-- shippedProposals
```

@babel/polyfill
-- 转译实例原型链上的API：Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。ES6 在Array对象上新增了Array.proptype.from方法。

-- 适合大型项目
```
preset-env一起使用注意事项：

1 If useBuiltIns: 'usage' is specified in .babelrc then do not include @babel/polyfill in either webpack.config.js entry array nor source. Note, @babel/polyfill still needs to be installed.

2 If useBuiltIns: 'entry' is specified in .babelrc then include @babel/polyfill at the top of the entry point to your application via require or import as discussed above.

import "core-js/stable";
import "regenerator-runtime/runtime";
3 If useBuiltIns key is not specified or it is explicitly set with useBuiltIns: false in your .babelrc, add @babel/polyfill directly to the entry array in your webpack.config.js.

// webpack.config.js
module.exports = {
	entry: ['@babel/polyfill', resolve('../index.js')],
}


@babel/transform-runtime/@babel/runtime 两者必须配合使用
-- 运行时引入 generators/async、babel-runtime/core-js（ES6->includes....）不会污染全局环境。

-- 避免重复引用

-- library推荐使用

// babel.config.json

{
  "plugins": ["@babel/plugin-transform-runtime"]
}

{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}

// options
-- corejs false, 2, 3 or { version: 2 | 3, proposals: boolean }, defaults to false.
false npm install --save @babel/runtime
2 npm install --save @babel/runtime-corejs2 只转译语法，不转译api，要转译也需要添加polyfill
3 npm install --save @babel/runtime-corejs3 默认只转译语法，如果想转译api,proposals指定为true
```

polyfill和transform-runtime的区别
For library/tool authors this may be too much. If you don't need the instance methods like Array.prototype.includes you can do without polluting the global scope altogether by using the transform runtime plugin instead of @babel/polyfill.

To go one step further, if you know exactly what features you need polyfills for, you can require them directly from core-js.

Since we're building an application we can just install @babel/polyfill


```
@babel/runtime和@babel/plugin-transform-runtime 

// 编译前
const arrtest = Array.from(new Set([1,1,2,2,3]))

// preset-env
eval("var arrtest = Array.from(new Set([1, 1, 2, 2, 3]));\n\n//# sourceURL=webpack:///./index.js?");

// polyfill
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.promise */ \"./node_modules/core-js/modules/es6.promise.js\");\n/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ \"./node_modules/core-js/modules/es6.object.to-string.js\");\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.set */ \"./node_modules/core-js/modules/es6.set.js\");\n/* harmony import */ var core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_set__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.string.iterator */ \"./node_modules/core-js/modules/es6.string.iterator.js\");\n/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es6.array.from */ \"./node_modules/core-js/modules/es6.array.from.js\");\n/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar arrtest = Array.from(new Set([1, 1, 2, 2, 3]));\n\nfunction test() {\n  return _test.apply(this, arguments);\n}\n\nfunction _test() {\n  _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            console.log(123123123123);\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _test.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./index.js?");

// transform-runtime version 3以下 + polyfill
eval("\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\nvar call = __webpack_require__(/*! ./_iter-call */ \"./node_modules/core-js/modules/_iter-call.js\");\nvar isArrayIter = __webpack_require__(/*! ./_is-array-iter */ \"./node_modules/core-js/modules/_is-array-iter.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\nvar createProperty = __webpack_require__(/*! ./_create-property */ \"./node_modules/core-js/modules/_create-property.js\");\nvar getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ \"./node_modules/core-js/modules/core.get-iterator-method.js\");\n\n$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ \"./node_modules/core-js/modules/_iter-detect.js\")(function (iter) { Array.from(iter); }), 'Array', {\n  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)\n  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {\n    var O = toObject(arrayLike);\n    var C = typeof this == 'function' ? this : Array;\n    var aLen = arguments.length;\n    var mapfn = aLen > 1 ? arguments[1] : undefined;\n    var mapping = mapfn !== undefined;\n    var index = 0;\n    var iterFn = getIterFn(O);\n    var length, result, step, iterator;\n    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);\n    // if object isn't iterable or it's array with default iterator - use simple case\n    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {\n      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {\n        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);\n      }\n    } else {\n      length = toLength(O.length);\n      for (result = new C(length); length > index; index++) {\n        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);\n      }\n    }\n    result.length = index;\n    return result;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.array.from.js?");
```

@babel-core
babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。
