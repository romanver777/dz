/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookieArrOfObj = [{ name: '', value: '' }];
let resultArr = [];

filterNameInput.addEventListener('keyup', function(e) {
    e.stopImmediatePropagation();

    if (!filterNameInput.value) {
        if (document.cookie) {
            listTable.innerHTML = '';
            cookieArrOfObj = [];

            let ind = 0;

            getAllCookies().forEach(el => {

                showTableOfCookie(el.name, el.value, ind);
                ind++;
            });
        }
    } else {
        if (document.cookie) {
            showFilter(filterNameInput.value);
        }
    }
});

addButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    if (addNameInput.value && addValueInput.value) {
        document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
        addNameInput.value = '';
        addValueInput.value = '';

        if (listTable.children) {
            listTable.innerHTML = '';
        }

        if (!filterNameInput.value) {

            let ind = 0;

            getAllCookies().forEach(el => {

                showTableOfCookie(el.name, el.value, ind);
                ind++;
            });
        } else {
            showFilter(filterNameInput.value);
        }
    }
});

listTable.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    if (e.target.id) {
        let index = e.target.id;

        if (!filterNameInput.value) {
            var nameV = cookieArrOfObj[index].name;

            document.cookie = `${nameV}=;expires=${new Date(0)}`;

            listTable.innerHTML = '';
            cookieArrOfObj = [];

            if (document.cookie) {
                let ind = 0;

                getAllCookies().forEach(el => {

                    showTableOfCookie(el.name, el.value, ind);
                    ind++;
                })
            }
        } else {
            nameV = resultArr[index].name;

            document.cookie = `${nameV}=;expires=${new Date(0)}`;

            listTable.innerHTML = '';
            resultArr.length = 0;

            showFilter(filterNameInput.value);
        }
    }
});

function isMatching(full, chunk) {
    chunk = chunk.toLowerCase();
    full = full.toLowerCase();

    if (full.indexOf(chunk) == -1) {
        return false;
    }

    return true;
}

function getAllCookies () {
    let cookieStr = document.cookie,
        cookieArray = cookieStr.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        cookieArray[i] = cookieArray[i].replace(/(\s*)\B(\s*)/g, '');

        let valueArr = cookieArray[i].split('=');

        valueArr[0] = valueArr[0].replace(/(\s*)\B(\s*)/g, '');

        cookieArrOfObj[i] = { name: valueArr[0], value: valueArr[1] };
    }

    return cookieArrOfObj;
}

function showTableOfCookie(name, value, ind) {

    let tr = document.createElement('tr'),
        tdName = document.createElement('td'),
        tdVal = document.createElement('td'),
        tdButton = document.createElement('td');

    listTable.appendChild(tr);

    tr.appendChild(tdName);
    tr.appendChild(tdVal);
    tr.appendChild(tdButton);

    tdName.innerHTML = name;
    tdVal.innerHTML = value;
    tdButton.innerHTML = `<button id="${ind}">Удалить</button>`;
}

function showFilter(inputVal) {
    resultArr = getAllCookies().filter((el) => {
        if (isMatching(el.name, inputVal) || isMatching(el.value, inputVal)) {
            return true;
        }
    });

    listTable.innerHTML = '';

    if (resultArr.length) {
        for (let i = 0, len = resultArr.length; i < len; i++) {
            showTableOfCookie(resultArr[i].name, resultArr[i].value, i);
        }
    }
}
