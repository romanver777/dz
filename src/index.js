/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (var i = 0; i < array.length; i++){
		fn(array[i], i, array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArr = [];
	for (var i = 0; i < array.length; i++){
		newArr.push(fn(array[i], i, array));
	}
    return newArr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var result = initial;
    if (!array.length && !initial) {
        throw new TypeError('Error');
    }
    if (result) {
        if (array.length === 0) {
            return result;
        }
        for (var i = 0; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }
        return result;
    } else {
        if (array.length === 1) {
            return array[0];
        }
        result = array[0];
        for (var i = 1; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }
        return result;
    }
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    for (var key in obj){
        if (obj.hasOwnProperty(prop)){
            delete obj[prop];
            return true;
        }
    }
    return false;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    for (var key in obj){
        if (obj.hasOwnProperty(prop)){
            return true;
        }
    }
    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj){
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj){
    var uppercasePropArr = [];
    for (var prop in obj) {
        uppercasePropArr.push(prop.toUpperCase());
    }
    return uppercasePropArr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    var newArr = [],
        i;
    if (!array.length) { return newArr; }
    if ((from === 0 && to === 0) || to === 0){ return newArr; }
    if (!array[from] && from < array.length) { from = 0}
    if (from > array.length) { return newArr; }
    if (to > array.length) { to = array.length }
    if (to < 0) { to = array.length + to; }
    if (from < 0) { from = array.length + from; }
    if (to < from){
        return newArr;
    } else {
        for (i = from; i < to; i++) {
            newArr.push(array[i]);
        }
        return newArr;
    }
}
/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var handler = {
        set: function(obj, prop, value) {
            obj[prop] = Math.pow(value, 2);
            return true;
        }
    };
    return new Proxy(obj, handler);
}




export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
