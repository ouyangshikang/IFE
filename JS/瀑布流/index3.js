//瀑布流响应式写法
var waterfall = document.getElementById('waterfall');
var flowItems = document.getElementsByClassName('flow');
//将瀑布流参数提取出来成一个对象
var currentFlow = {
    parent: waterfall,
    flowItems: flowItems,
    pin: 4,//瀑布流的列数
    width: 310,
    horizontalMargin: 15,
    verticalMargin: 15
};

//声明响应断点
var deviceWidth = {
    D: 1200,
    C: 960,
    B: 767,
    A: 320
};
window.onresize = responseFlow;
responseFlow();
//响应式布局函数
function responseFlow(){
    var deviceW ;
    // 判断当前的设备屏幕宽度
    function checkDeviceW() {
        var screenW = document.documentElement.offsetWidth || document.body.offsetWidth;
        console.log(screenW);
        if(screenW >= deviceWidth.A && screenW < deviceWidth.B) {
            deviceW = "A";
        }else if(screenW >= deviceWidth.B && screenW < deviceWidth.C) {
            deviceW = "B";
        }else if(screenW >= deviceWidth.C && screenW < deviceWidth.D) {
            deviceW = "C";
        }else if(screenW >= deviceWidth.D) {
            deviceW = "D";
        }
    }
    
    checkDeviceW();

    //根据响应确定列数
    switch(deviceW){
        case "D":
            currentFlow.pin = Math.floor(currentFlow.parent.offsetWidth / currentFlow.width);
            // console.log(currentFlow.parent.offsetWidth)
            break;
        case "C":
            currentFlow.pin = 3;
            break;
        case "B":
            currentFlow.pin = 2;
            break;
        case "A":
            currentFlow.pin = 1;
            break;
    }
    waterflow(currentFlow);

}
//封装瀑布流函数;
function waterflow(flow) {
    var pin = new Array(flow.pin);
    var flowItems = flow.flowItems;
    //每一列高度初始化
    for (var i = 0, pinLen = pin.length; i < pinLen; i++) {
        pin[i] = flowItems[i].offsetTop + flowItems[i].offsetHeight;
    }

    for (var i = 0, len = flowItems.length; i < len; i++) {
        //初始化每一项的宽度
        if (flow.width) {
            flowItems[i].style.width = flow.width + "px";
        }
        if (i < flow.pin) {
            flowItems[i].style.top = 0;
            flowItems[i].style.left = (i % flow.pin) * (flow.width + flow.horizontalMargin) + "px";
        } else if (i >= flow.pin) {
            //获取当前列数组高度的最小值及索引
            var minHeight = Math.min.apply(null, pin);
            var minIndex = pin.indexOf(minHeight);
            //当前元素的位置定位在最小高度的列上
            flowItems[i].style.left = minIndex * (flow.width + flow.horizontalMargin) + "px";
            flowItems[i].style.top = (minHeight + flow.verticalMargin) + "px";
            //重置该列的高度
            pin[minIndex] += flowItems[i].offsetHeight + flow.horizontalMargin;
        }
    }
    //瀑布流容器的宽度
    flow.parent.style.width = flow.pin * flow.width + (flow.pin - 1) * flow.horizontalMargin + "px";
}
