import Scroll from './core/scroll.js'
import { getHTMLDivElement } from './utils/dom-helper.js';
import { merge, objectProtoType } from './utils/utils.js'
import { setting, defaultSetting, eventMap } from './config/setting.js'

class ElScroll extends Scroll{
	constructor(options){
		let el = null, opts = {};
		//字符串
		if(objectProtoType.isString(options)){
			el = getHTMLDivElement(options);
		}else if(objectProtoType.isHTMLDivElement(options)){
			el = options;
			// options instanceof HTMLElement
		}else if(objectProtoType.isObject(options)){
			el = getHTMLDivElement(options.el);
			opts = options;
		}
		if(!el){
			console.error(`el-scroll must called with a HTMLElement as target, please check the el attribute.`);
		}
		opts.el = el;
		opts = merge({}, setting, opts, defaultSetting);
		super(opts, eventMap);
		return this;
	}
}

export default ElScroll;