// module.js

var moduleName = "testModule";

// exports === module.exprots的引用，因此这里不能使用exports = {} 
module.exports = {
    getName: function () {
        return moduleName;
    },

    setName: function (name) {
        moduleName = name;
    }

};