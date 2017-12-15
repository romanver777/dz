/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let button = document.createElement('button');

button.style.display = 'none';
button.textContent = 'Повторить';
homeworkContainer.appendChild(button);
/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */


function loadTowns() {
    let promise = new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest ();

        xhr.open ('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        xhr.send ();
        xhr.onload = () => {

            if (xhr.status == 200) {
                const responseArr = JSON.parse(xhr.responseText);
                resolve(responseArr);
            }
            else {
                reject('Не удалось загрузить города');
            }
        };
    });
    promise.then (result => getSortTownsArr(result) )
            .then(() => {
                setTimeout( () => {
                    loadingBlock.style.display = 'none';
                    filterBlock.style.display = 'block';
                }, 2000);
            })
            .catch( error => {
                loadingBlock.textContent = error;
                button.style.display = 'block';
            });

    function getSortTownsArr (arr) {
        arr.sort ( (obj1, obj2) => {
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

button.addEventListener('click', () => {

    button.style.display = 'none';
    loadingBlock.textContent = 'Загрузка...';
    setTimeout( () => {
        loadTowns();
    }, 2000);

});
/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    chunk = chunk.toLowerCase();
    full = full.toLowerCase();

    if (full.indexOf(chunk) == -1) {

        return false;
    } else {

        return true;
    }
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();
let resultList = document.createElement('ul');

filterInput.addEventListener('keyup', () => {
    let inputVal = filterInput.value,
        resultArr = [];

    townsPromise.then( result => {
        if (inputVal) {
            result.forEach((el) => {
                let match = isMatching(el.name, inputVal);

                if (match) {
                    resultArr.push(el.name);
                }
            });
        }


        let resultArrLen = resultArr.length;
        filterResult.appendChild(resultList);

        while (resultList.firstChild) {

            resultList.removeChild(resultList.firstChild);
        }

        for (let i = 0; i < resultArrLen; i++) {

            listItem = document.createElement('li');
            resultList.appendChild(listItem);

            listItem.textContent =  resultArr[i];
        }
    });
});

loadTowns();

// export {
//     loadTowns,
//     isMatching
// };
