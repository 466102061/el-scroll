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

/**
 * @desc 事件绑定函数
 * @param {Object} ctx
 * @return 事件解绑函数
 * */
function addEventListener(ctx){
	if(!ctx || !ctx.$el) return () => {};
	let touchStartProxy = (e) => {
		touchStartHandle(ctx, e);
	}
	let touchMoveProxy = (e) => {
		touchMoveHandle(ctx, e);
	}
	let touchEndProxy = (e) => {
		touchEndHandle(ctx, e);
	}
	let mouseleaveProxy = (e) => {
		mouseleaveHandle(ctx, e);
	}
	let cancelBrowersAnimationFrameProxy = (e) => {
		cancelBrowersAnimationFrame(ctx, e);
	}
	if(ctx.isMobile){
	    ctx.$el.addEventListener("touchstart", touchStartProxy, false);
	    ctx.$el.addEventListener("touchmove", touchMoveProxy, false);
	    ctx.$el.addEventListener("touchend", touchEndProxy, false);				
    }else{
	    ctx.$el.addEventListener("mousedown", touchStartProxy, false);
	    ctx.$el.addEventListener("mousemove", touchMoveProxy, false);
	    ctx.$el.addEventListener("mouseup", touchEndProxy, false);

	    //fix:鼠标离开制定区域，mouseup事件丢失
	    ctx.$el.addEventListener("mouseleave", mouseleaveProxy, false);
    }
    //运动结束，清除定时器
    cssTransitionEndEach((item)=>{
    	ctx.$el.addEventListener(item, cancelBrowersAnimationFrameProxy, false);
    });

    //返回-解除事件绑定函数
    return () => {
	    if(ctx.isMobile){
		    ctx.$el.removeEventListener("touchstart", touchStartProxy, false);
		    ctx.$el.removeEventListener("touchmove", touchMoveProxy, false);
		    ctx.$el.removeEventListener("touchend", touchEndProxy, false);	
	    }else{
		    ctx.$el.removeEventListener("mousedown", touchStartProxy, false);
		    ctx.$el.removeEventListener("mousemove", touchMoveProxy, false);
		    ctx.$el.removeEventListener("mouseup", touchEndProxy, false);
		    ctx.$el.removeEventListener("mouseleave", mouseleaveProxy, false);
	    }
		//运动结束，清除定时器
	    cssTransitionEndEach((item)=>{
	    	ctx.$el.removeEventListener(item, cancelBrowersAnimationFrameProxy, false);
	    });
    }
}

export {
	preventDefault,
	stopPropagation,
	addEventListener
}