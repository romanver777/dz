/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise (seconds) {
    seconds = 1000;
	let promise = new Promise ((resolve) => {
		setTimeout (() => {
			resolve ();
		}, seconds);
	});

	return promise;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns () {
    let promise = new Promise ((resolve, reject) => {
		const xhr = new XMLHttpRequest ();

		xhr.open ('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        xhr.send ();
        xhr.onload = () => {
            const responseArr = JSON.parse (xhr.responseText);
            if (xhr.status == 200) {
                resolve(getSortTownsArr(responseArr));
            } else {
                reject(new Error(xhr.response));
            }
        };

    });
    function getSortTownsArr (arr) {
        arr.sort( (obj1, obj2) => {
            if (obj1.name > obj2.name) {
                return 1;
            }
            if (obj1.name < obj2.name) {
                return -1;
            }
            return 0;
        });

        return arr;
    }

	return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
