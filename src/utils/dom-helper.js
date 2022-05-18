import { objectProtoType } from './utils.js';
/**
** @desc 获取想要的参数的目标节点，并指定属性以及属性值
** @param { String } element
** @param { String } attr
** @param { String } value
**
** @return element
**/
function getNodeTargetByStyle(element, attr, value){
    let currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let target = document.defaultView.getComputedStyle(currentNode)[attr];
        if (value && value.indexOf(target) > -1) {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
}

// 获取100px中100的值
function formatStyleValueForNumber(str){
    return Number(String(str).match(/\+?\-?\d+/g)[0]);
}

/**
 * @desc 获取el元素的node节点
 * @param {String} el
 * */
function getHTMLDivElement(el){
    if(!el) return null;
    if(objectProtoType.isString(el)){
        let tag = el.charAt(0);
        //优先id获取
        if(tag == '#'){
            el = document.getElementById(el.substr(1));
        }else if(tag == '.'){
            //再class获取
            el = document.querySelector(el);
        }else {
            el = document.getElementById(el);
            if(!el){
                el = document.querySelector('.' + el);
            }
        }
        return el;
    }else if(objectProtoType.isHTMLDivElement(el)){
        return el;
    }else{
        return null;
    }
}

export {
    getHTMLDivElement,
	getNodeTargetByStyle,
	formatStyleValueForNumber
}