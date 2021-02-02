import Scroll from './core/scroll.js'
import { setting, eventMap } from './config/setting.js'
import { merge, objectProtoType } from './utils/utils.js'

class ElScroll extends Scroll{
	constructor(options){
		let el = null, opts = {};
		//字符串
		if(objectProtoType.isString(options)){
			let tag = options.charAt(0);
			//优先id获取
			if(tag == '#'){
				el = document.getElementById(options.substr(1));
			}else if(tag == '.'){
				//再class获取
				el = document.querySelector(options);
			}else {
				el = document.getElementById(options);
				if(!el){
					el = document.querySelector('.' + options);
				}
			}
		}else if(objectProtoType.isHTMLDivElement(options)){
			el = options;
			// options instanceof HTMLElement
		}else if(objectProtoType.isObject(options)){
			el = options.el;
			opts = options;
		}
		if(!el){
			console.error(`el-scroll must called with a HTMLElement as target.`);
			return;
		}
		opts.el = el;
		opts = merge({}, setting, opts);
		super(opts, eventMap);
		return this;
	}
}

export default ElScroll;