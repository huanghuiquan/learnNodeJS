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

setTimeout(doSomethingInOneStep);

setTimeout(function () {
    console.log("Simple thing");
});

setTimeout(doSomethingInSeveralStep);

setTimeout(function () {
    console.log("Simple thing");
});
