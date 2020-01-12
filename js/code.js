// Обьект представления игры
const view = {

    displayMessage: function (msg) {
        const messageArea = document.getElementById('messagearea');

        messageArea.innerHTML = msg;

        
    },

    displayMiss: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "miss");


    },

    displayHit: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    }
}
/* view.displayMiss("00");
view.displayHit("08");
view.displayMiss("17");
view.displayHit("26");
view.displayMiss("34");
view.displayHit("42");
view.displayHit("50");
view.displayMessage("you fire!"); */


////////////////////////////////////////
//Обьект МОДЕЛИ
const model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{
            locations: [0,0,0],
            hits: ["", "", ""]
        },
        {
            locations: [0,0,0],
            hits: ["", "", ""]
        },
        {
            locations: [0,0,0],
            hits: ["", "", ""]
        }
    ],
    fire: function (guess) {
        //ПЕРЕБЕРАЕМ КОРАБЛИ
        for (let i = 0; i < this.numShips; i++) {
            const ship = this.ships[i];
            //ПОЛУЧАЕМ МАСИВ КЛЕТОК ЗАНИМАЕМЫХ КОРАБЛЕМ
            //locations = ship.locations;
            //ИЩЕМ В МАСИВЕ УКАЗАНОЕ ЗНАЧЕНИЕ 
            const index = ship.locations.indexOf(guess);
            if (index >= 0) {
                //СТАВИМ ОТМЕТКУ hit ПО ТОМУ ЖЕ ИНДЕКСУ
                ship.hits[index] = "hit";
                //ВЫВОДИМ МАРКЕР ПОПАДАНИЯ В view
                view.displayHit(guess);
                view.displayMessage("HIT!")
                //ПРОВЕРКА НА ПОПАДАНИЯ ЕСЛИ КОРАБЫЛЬ ПОТОПЛИН ТО shipsSunk + 1
                if (this.isShunk(ship)) {
                    //СООБЩАЕМ ИГРОКУ ЧТО ОН ПОТАПИЛ КОРАБЫЛЬ
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                //ЕСЛИ ВЫСТРЕЛ УДАЧНЫЙ
                return true;

            }
        }
        // ЕСЛИ ВЫСТРЕЛ НЕУДАЧНЫЙ
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },

    //ПРОВЕРЯЕМ ПОТОПЛЕН ЛИ КОРАБЫЛЬ
    isShunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    //основной метод Создает в модели массив ships с количеством кораблей, определяемым свойством numShips модели.
    generateShipLocations: function() {
        let locations;
        //Для каждого корабля генерируется набор позиций, то есть занимаемых клеток.
        for(let i = 0; i < this.numShips; i++){
            do{
                //Генерируем новый набор позиций...
                locations = this.generateShip();
                //...и проверяем, перекрываются ли эти позиции с существующими кораблями на доске.
            }while( this.collision(locations));
            //Полученные позиции без перекрытий сохраняются в свойстве locations объекта корабля в массиве model.ships.
            this.ships[i].locations = locations;
        }
    },

    //метод создает один корабль, находящийся в произвольном месте игрового поля.

    generateShip:function() {
        //генерируем число от 0 до 1 и умножаем результат на 2, чтобы получить число в диапазоне от 0 до 2 (не включая 2). Затем Math.floor преобразует результат в 0 или 1.
        const direction = Math.floor(Math.random()*2);
        if(direction === 1){
            // Сгенерировать начальную позицию для горизонтального корабля
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        }else{
            // Сгенерировать начальную позицию для вертикального корабля
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        //Набор позиций нового корабля начинается с пустого массива, в который последовательно добавляются элементы.
        const newShipLocations = [];
            //В цикле до количества позиций в корабле.
        for(let i = 0; i < this.shipLength;i++){
            
            if(direction === 1){
                // добавить в массив для горизонтального корабля
                newShipLocations.push(`${row}${(col + i)}`);
            }else{
                // добавить в массив для вертикального корабля
                newShipLocations.push(`${(row + i)}${col}`);
            }

        }

        return newShipLocations;

    },

    //метод получает один корабль и проверяет, что тот не перекрывается с кораблями, уже находящимися на игровом поле.

    collision: function(locations) {
        for(let i; i < this.numShips; i++){
            const ship = model.ships[i];

            //проверить, встречается ли какая-либо из позиций массива locations нового корабля в массиве locations существующих кораблей
            for (let j = 0; j < locations.length; j++) {
                //Метод indexOf проверяет, присутствует ли заданная позиция в массиве.
                if(ship.locations.indexOf(locations[j]) >= 0){
                    return true;
                }
            }
        }
        return false
    }

}

/////////////////////////////////
//РЕАЛИЗАЦИЯ КОНТРОЛЛЕРА

const controller = {
    guesses: 0,

    processGuess: function (guess) {
        //Метод parseGuess будет использоваться для проверки введенных данных.
        const location = parseGuess(guess);

        if (location) {
            this.guesses++;
            const hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`You sank all my battleships, in ${this.guesses} guesses`);
            }
        }

    }

}

//ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ

function parseGuess(guess) {
    //Массив заполняется всеми буквами, которые могут присутствовать в действительных координатах.
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    //ПРОВЕРЯЕМ ДАНЫЕ НА null И ЧТО В СТРОКЕ 2 СИМВОЛА
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        //Извлекаем первый символ строки.
        firstChar = guess.charAt(0);

        //При помощи метода indexOf получаем цифру в диапазоне от 0 до 6, соответствующую букве.
        const row = alphabet.indexOf(firstChar);

        //Здесь добавляется код для получения второго символа, представляющего столбец игрового поля.
        const column = guess.charAt(1);

        //А здесь функция isNaN выявляет строки и столбцы, которые не являются цифрами.
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
        return null;
    }
}

//Получение данных от игрока
function init() {
    const fireButton = document.getElementById('firebutton');
    fireButton.onclick = handleFireButton;
    //Добавляем новый обработчик — для обработки событий нажатия клавиш
    const guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}


function handleFireButton() {
    const guessInput = document.getElementById("guessInput");

    const guess = guessInput.value;

    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("firebutton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;