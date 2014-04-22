// testModule.js

var module = require('./module');
console.log(module.getName());

// require 只会加载一次，后面的直接从内存获取，故两者引用同一个对象
var moduleAnother = require('./module');
moduleAnother.setName("huanghuiquan");
console.log(moduleAnother.getName());
console.log(module.getName());

