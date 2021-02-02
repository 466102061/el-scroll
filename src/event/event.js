import {
	touchStartHandle,
	touchMoveHandle,
	touchEndHandle,
	mouseleaveHandle
} from './handler.js'
import {
	cssTransitionEndEach,
	cancelBrowersAnimationFrame
} from '../utils/animation-frame.js'

// 阻止事件的冒泡
function stopPropagation(e){
    e = e || window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
        return false;
    }
}

//阻止浏览器默认行为
function preventDefault(e){
	var ev = e || window.event;
    if (ev && ev.preventDefault) {
        ev.preventDefault();
    } else {
        ev.returnvalue = false;
        return false;
    }
}

//事件绑定
function addEventListener(ctx){
	if(!ctx || !ctx.$el) return;
	if(ctx.isMobile){
	    ctx.$el.addEventListener("touchstart", touchStartHandle.bind(null, ctx), false);
	    ctx.$el.addEventListener("touchmove", touchMoveHandle.bind(null, ctx), false);
	    ctx.$el.addEventListener("touchend", touchEndHandle.bind(null, ctx), false);				
    }else{
	    ctx.$el.addEventListener("mousedown", touchStartHandle.bind(null, ctx), false);
	    ctx.$el.addEventListener("mousemove", touchMoveHandle.bind(null, ctx), false);
	    ctx.$el.addEventListener("mouseup", touchEndHandle.bind(null, ctx), false);

	    //fix:鼠标离开制定区域，mouseup事件丢失
	    ctx.$el.addEventListener("mouseleave", mouseleaveHandle.bind(null, ctx), false);
    }
    //运动结束，清除定时器
    cssTransitionEndEach((item)=>{
    	ctx.$el.addEventListener(item, cancelBrowersAnimationFrame.bind(null, ctx), false);
    });
}

//解除事件绑定
function removeEventListener(ctx){
	if(!ctx || !ctx.$el) return;
    if(ctx.isMobile){
	    ctx.$el.removeEventListener("touchstart", touchStartHandle.bind(null, ctx), false);
	    ctx.$el.removeEventListener("touchmove", touchMoveHandle.bind(null, ctx), false);
	    ctx.$el.removeEventListener("touchend", touchEndHandle.bind(null, ctx), false);				
    }else{
	    ctx.$el.removeEventListener("mousedown", touchStartHandle.bind(null, ctx), false);
	    ctx.$el.removeEventListener("mousemove", touchMoveHandle.bind(null, ctx), false);
	    ctx.$el.removeEventListener("mouseup", touchEndHandle.bind(null, ctx), false);
	    ctx.$el.removeEventListener("mouseleave", mouseleaveHandle.bind(null, ctx), false);
    }
	//运动结束，清除定时器
    cssTransitionEndEach((item)=>{
    	ctx.$el.removeEventListener(item, cancelBrowersAnimationFrame.bind(null, ctx), false);
    });
}

export {
	preventDefault,
	stopPropagation,
	addEventListener,
	removeEventListener
}