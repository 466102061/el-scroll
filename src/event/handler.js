import { objectProtoType } from '../utils/utils.js'
import { cssTransition } from '../utils/animation-frame.js'
import { preventDefault, stopPropagation } from './event.js'

function touchStartHandle(ctx, event){
	//是否支持click事件,支持不阻止浏览器的默认事件传递
	if(!ctx.options.click){
		//阻止默认行为
        preventDefault(event);
        stopPropagation(event);
	}

    //兼容
    let touch;
    if(ctx.isMobile){
    	touch = event.targetTouches[0];
    }else{
    	touch = event;
    }
    ctx.lastTime = ctx.startTime = new Date().getTime();
    ctx.distance = 0;
    ctx.resetY = ctx.startY = touch.pageY;

    //初始平移的y值
    let scrolledY = ctx.$el.style.transform || ctx.$el.style.webkitTransform || ctx.$el.style.msTransform || ctx.$el.style.MozTransform;
    if(scrolledY){
    	scrolledY = parseFloat(scrolledY.replace("translateY(", ""));
    	// console.log("初始平移的y值：",scrolledY);
    }else{
    	scrolledY = 0;
    }
    ctx.oldY = scrolledY;
    // console.log("开始：",ctx.isReadyToMove);
    ctx.isReadyToMove = true;
}

function touchMoveHandle(ctx, event){
	//阻止默认行为
	preventDefault(event);
	stopPropagation(event);
	//判断是否先执行了touchstart/mosuedown
	if(!ctx.isReadyToMove) return;

	//兼容
    let touch;
    if(ctx.isMobile){
    	touch = event.targetTouches[0];
    }else{
    	touch = event;
    }
    ctx.currentY = touch.pageY;
    ctx.currentTime = new Date().getTime();

    //间歇性滚动 = 单位时间移动的距离 < 一定的值(0.05)
    // 二次及以上次数滚动（间歇性滚动）时间和路程重置计算，0.05是间歇性滚动的停顿位移和时间比
    if (Math.abs(ctx.currentY - ctx.lastY) / Math.abs(ctx.currentTime - ctx.lastTime) < 0.05) {
        // console.log("间歇性滚动:",ctx.currentY-ctx.lastY,ctx.currentTime-ctx.lastTime);
        ctx.startTime = new Date().getTime();
        ctx.resetY = ctx.currentY;
    }
    ctx.lastY = ctx.currentY;
    ctx.lastTime = ctx.currentTime;

    ctx.distance = ctx.currentY - ctx.startY;
    let dist = ctx.distance + ctx.oldY;

    //任意两个连续相等的时间内的位移差之比为1：3：5,公式 s = 1/2at²
    // (1/2at²) : (1/2a(2t)² - 1/2a(1t)²) : (1/2a(3t)² - 1/2a(2t)²)
    //移动最小临界值
    dist = dist > ctx.minScrollY ? dist * 1 / 3 : dist;
    //移动最大临界值
    dist = dist < -ctx.maxScrollY ? -ctx.maxScrollY + (dist + ctx.maxScrollY) * 1 / 3 : dist;
    ctx.timer = cssTransition(ctx.$el, dist, 0);

    //滚动-事件监听回调
    ctx.emit(ctx.eventMap.scroll, { ctx, dist });

    // console.log("移动：",touch.pageY,dist,ctx.lastY,ctx.isReadyToMove);
    // console.log("移动：",dist,ctx.lastY,ctx.isReadyToMove);
}

function touchEndHandle(ctx, event){
	//是否支持click事件,支持不阻止浏览器的默认事件传递
	if(!ctx.options.click){
		//阻止默认行为
        preventDefault(event);
        stopPropagation(event);
	}
    //判断是否先执行了touchstart/mosuedown
	if(!ctx.isReadyToMove) return;
    /*点透事件允许通过*/
    if (!ctx.distance) return;

    let dist = ctx.distance + ctx.oldY;
    /*计算缓动值*/
    dist = getSlowMotionDistance(ctx, dist);
    //移动最小临界值
    dist = dist > ctx.minScrollY ? ctx.minScrollY : dist;
    //移动最大临界值
    dist = dist < -ctx.maxScrollY ? -ctx.maxScrollY : dist;

    //运动结束特殊处理(共外部函数调用，最终停止前，调整最终停止位置)
    scrollEndCssTransition(ctx, dist);

    ctx.isReadyToMove = false;
    // console.log("结束：",ctx.isReadyToMove);
}

//运动结束特殊处理(共外部函数调用，最终停止前，调整最终停止位置)
function scrollEndCssTransition(ctx, dist){ 

    //运动停止前 - 事件监听回调
    let res = ctx.emit(ctx.eventMap.beforeScrollEnd, { ctx, dist });
    if(res && res.length){
        res = res[res.length - 1];
        //y-axis  < 0
        if(res && res.dist){
            dist = Math.min(res.dist, 0);
        }else if(objectProtoType.isNumber(res)){
            dist = Math.min(res, 0);
        }
    }

    //运动
    ctx.timer = cssTransition(ctx.$el, dist, ctx.speed);

    //运动停止-事件监听回调
    ctx.emit(ctx.eventMap.scrollEnd, { ctx, dist: 0 });
}

/**
* @desc 计算缓动值
* @param {Number} distance 步数
*/
function getSlowMotionDistance(ctx, distance){
    var duration = new Date().getTime() - ctx.startTime;

    // 300毫秒是判断间隔的最佳时间
    var resetDistance = ctx.currentY - ctx.resetY;
    var isD = duration < 350 && Math.abs(resetDistance) > 30;
    var isL = duration > 350 && Math.abs(resetDistance) > 50;
    // console.log("位移：",ctx.resetY, ctx.lastY,ctx.currentY);
    // console.log(isD,isL,duration, resetDistance);

    if (isL || isD) {
        // console.log("isSlowMotion");
        var speed = Math.abs(resetDistance) / duration,
            destination;
        // 初速度为0 ，匀变速直线运动：s = (v²-0²)/2a,距离等于速度的平方除以2倍加速度
        destination = (speed * speed) / (2 * ctx.deceleration) * (resetDistance < 0 ? -1 : 1);
        ctx.isSlowMotion = true;
        return distance += destination;
    } else {
        ctx.isSlowMotion = false;
        return distance;
    }
}

//鼠标离开制定区域的事件，fix:鼠标离开制定区域，mouseup事件丢失
function mouseleaveHandle(ctx, events){
    //判断是否先执行了touchstart/mosuedown
    if(!ctx.isReadyToMove) return;
    touchEndHandle(ctx, events);
}

export {
	touchStartHandle,
	touchMoveHandle,
	touchEndHandle,
    mouseleaveHandle
}