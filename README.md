LearnNodeJS
===========

### 知识点

#### 全局对象与全局变量

**全局对象**指的是global，它的属性叫**全局变量**。

下面介绍一些常用的全局变量：
1. process
    它用于描述当前Node.js进程状态的对象，提供了一个与操作系统的简单接口.
    - process.argv 是命令行参数数组,，第一个元素是node，第二个元素是脚本文件名，从第三个元素开始每个元素是一个运行参数。  
    ```
    // argv.js
    console.log(process.argv);

    > node argv.js 1991 name=fake
    > node process.js 1991 name=fake
    [ 'c:\\Program Files\\nodejs\\node.exe',
      'd:\\www\\learnNodeJS\\process.js',
      '1991',
      'name=fake' ]
    ```

    - process.stdout是标准输出流，通常我们用console.log()向标准输出打印字符，而process.stdout.write()函数提供了更底层的接口.

    - process.stdin 是标准输入流，初始时它是被暂停的，要想从标准输入读取数据，你必须恢复流，并手动编写流的事件响应函数。
    ```
    process.stdin.resume();
    process.stdin.on('data', function(data) {
        process.stdout.write('read from console: ' + data.toString());
    });
    ```
    - process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在下次事件循环调响应时调用 callback。

    因为node.js是单线程，如果在一个回调函数中出现大量的计算，会导致一个事件循环中的其他事件响应缓慢，所以把复杂的计算拆分成多个步骤在下一个tick执行能有效地提高响应速度。
    不要使用setTimeout(fn,0)代替process.nextTick(callback)，前者比后者效率要低得多。
    ``` 
    function sleep(d) {
        var t = Date.now();
        while (Date.now() - t <= d) {}
    }

    function complexCaculation1() {
        console.log("complex thing. 1")
        sleep(1000);
    }

    function complexCaculation2() {
        console.log("complex thing. 2")
        sleep(1000);
    }

    function doSomethingInOneStep() {
        console.log('do complex thing.');
        complexCaculation1();
        complexCaculation2();
    }

    function doSomethingInSeveralStep() {
        console.log('do complex thing.');
        complexCaculation1();
        process.nextTick(complexCaculation2);
    }
    ```

    - process.platform 可以通过这个参数写跨平台程序

    上面列举了常用的属性，当然还有一些其他属性，这里不一一介绍了。

2. utils工具
    - utils.inherits 只继承原型中的函数
    - utils.inspect

    util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。

    除了以上我们介绍的几个函数之外，util还提供了util.isArray()、util.isRegExp()、util.isDate()、util.isError() 四个类型测试工具，以及 util.format()、util.debug() 等工具。

3. 事件驱动events

### Skills
1.  `supervisor`
    
    supervisor会监视你对代码的改动，并自动重启 Node.js。使用方法很简单：
    ```
    > npm install -g supervisor
    > supervisor app.js
    ```

2. 包发布
    
    ```
    > npm init #生成规范化的package.json
    > npm adduser #登陆账号
    > npm publish #发布到npmjs.org
    > npm unpublish #从线上删除
    ```
3. 调试工具

    调试方法有命令行下的debug, eclipse IDE, node-inspector. cmd下的debug太原始，不好用，eclipse要安装IDE不爽，node-inspector可以利用浏览器来调试，符合前端开发的习惯。
    ```
    > npm install -g node-inspector  #安装node-inspector
    > node-inspector #运行
    > node --debug-brk=5858 debug.js #运行调试程序
    ```
    在浏览器中打开`http://127.0.0.1:8080/debug?port=5858`




Thanks to NodeJS.
