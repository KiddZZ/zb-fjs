"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapTag = '[object Map]';
var setTag = '[object Set]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var otherTags = [dateTag, errorTag, numberTag, stringTag];
var deepTags = [mapTag, setTag, arrayTag, objectTag];
// 判断类型
function getType(original) {
    return Object.prototype.toString.call(original);
}
// 判断是否为引用类型
function isObject(original) {
    var type = typeof original;
    return original !== null && type === 'object';
}
// 初始化被克隆的对象
function initCopy(original) {
    var Ctor = original.constructor;
    return new Ctor();
}
/**
 * 深拷贝
 * @param original
 * @param map
 */
function deepClone(original, map) {
    if (map === void 0) { map = new WeakMap(); }
    var type = getType(original);
    // 判断引用类型,原始数据直接返回
    // copy function是没有实际应用场景的，两个对象使用同一个引用地址的function没有任何问题，所以这里直接返回
    if (!isObject(original)) {
        return original;
    }
    if (deepTags.includes(type)) {
        var targetClone_1 = initCopy(original);
        // 处理环
        if (map.get(original)) {
            return map.get(original);
        }
        // 处理Set
        if (type === setTag) {
            original.forEach(function (value) {
                targetClone_1.add(value);
            });
        }
        // 处理map
        if (type === mapTag) {
            original.forEach(function (value, key) {
                targetClone_1.set(key, value);
            });
        }
        map.set(original, targetClone_1);
        Object.keys(original).forEach(function (key) {
            targetClone_1[key] = deepClone(original[key], map);
        });
        return targetClone_1;
    }
    else {
        // 处理其他数据类型
        var Ctor = original.constructor;
        if (otherTags.includes(type)) {
            return new Ctor(original);
        }
        // 处理Boolean
        if (type === boolTag) {
            return new original.constructor(original.valueOf());
        }
        // 处理Symbol
        if (type === symbolTag) {
            return Object(Symbol.prototype.valueOf.call(original));
        }
        // 处理reg
        if (type === regexpTag) {
            var reFlags = /\w*$/;
            var result = new original.constructor(original.source, reFlags.exec(original));
            result.lastIndex = original.lastIndex;
            return result;
        }
        return null;
    }
}
exports.default = deepClone;
