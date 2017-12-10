/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv () {
    let div = document.createElement('DIV'),
        divHeight = randomSize(1, document.documentElement.clientHeight),
        divWidth = randomSize(1, document.documentElement.clientWidth),
        divTopPos = document.documentElement.clientHeight - divHeight,
        divLeftPos = document.documentElement.clientWidth - divWidth;

    function randomSize(min, max) {
        let rand = (Math.random() * (max - min) + min);

        return rand.toFixed();
    }

    div.className = 'draggable-div';
    div.style.backgroundColor = 'rgb(' + randomSize(0, 255) + ','
                                        + randomSize(0, 255) + ','
                                        + randomSize(0, 255) + ')';
    div.style.top = divTopPos + 'px';
    div.style.left = divLeftPos + 'px';
    div.style.width = divWidth + 'px';
    div.style.height = divHeight + 'px';
    div.style.position = 'absolute';



    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners (target) {

    target.onmousedown = function (e) {
        var coords = getCoords(target),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        function moveAt (e) {
            target.style.top = e.pageY - shiftY + 'px';
            target.style.left = e.pageX - shiftX + 'px';
        }

        function getCoords (elem) {
            var el = elem.getBoundingClientRect();

            return {
                top: el.top,
                left: el.left
            }
        }

        moveAt (e);

        document.onmousemove = function (e) {
            moveAt (e);
        };

        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        };
    };

    target.ondragstart = function () {
        return false;
    };
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv ();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};