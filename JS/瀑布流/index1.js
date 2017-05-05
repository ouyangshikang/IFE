//瀑布流基本写法
var waterfall = document.getElementById("waterfall");
var flowItems = waterfall.querySelectorAll(".flow");
var pin = [];
 pin[0] = flowItems[0].offsetTop + flowItems[0].offsetHeight;
 pin[1] = flowItems[1].offsetTop + flowItems[1].offsetHeight;
 pin[2] = flowItems[2].offsetTop + flowItems[2].offsetHeight;
 // 循环瀑布流元素的高度
 for(var i = 0, len = flowItems.length; i < len; i++) {
     if(i >= 3) {
         // 获取三个数中的最小值
         var minH = Math.min.apply(null, pin);
         // 获取高度数组中最小高度的索引
         var minHItem = pin.indexOf(minH);
         // 把当前元素在视觉上置于最小高度的一列
         flowItems[i].style.left = minHItem * (310 + 15) + "px";
         flowItems[i].style.top = minH + 15 + "px";
         // 重置列的高度
         pin[minHItem] += flowItems[i].offsetHeight + 15;
         }else if(i < 3){
         flowItems[i].style.top = 0;
         flowItems[i].style.left = (i % 3) * (310 + 15) + "px";
     }
 }

 //