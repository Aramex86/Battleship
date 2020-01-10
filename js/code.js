// Обьект представления игры
const view = {

    displayMessage:function(msg) { 
        const messageArea = document.getElementById('messagearea');

        messageArea.innerHTML = msg;
     },

    displayMiss:function(location) { 
        const cell = document.getElementById(location);
        cell.setAttribute("class","miss");


     },

    displayHit:function(location) { 
        const cell = document.getElementById(location);
        cell.setAttribute("class","hit");
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

//Обьект МОДЕЛИ
const model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships:[
        {locations:["00","01","02"],hits:["","",""]},
        {locations:["11","12","14"],hits:["","",""]},
        {locations:["47","48","49"],hits:["","",""]},
    ],
    fire: function(guess) {
        //ПЕРЕБЕРАЕМ КОРАБЛИ
        for(let i =0;i < this.numShips;i++){
             const ship = this.ships[i];
             //ПОЛУЧАЕМ МАСИВ КЛЕТОК ЗАНИМАЕМЫХ КОРАБЛЕМ
             //locations = ship.locations;
             //ИЩЕМ В МАСИВЕ УКАЗАНОЕ ЗНАЧЕНИЕ 
             const index = ship.locations.indexOf(guess);
             if(index >= 0){
                 //СТАВИМ ОТМЕТКУ hit ПО ТОМУ ЖЕ ИНДЕКСУ
                 ship.hits[index]= "hit";
                 //ВЫВОДИМ МАРКЕР ПОПАДАНИЯ В view
                 view.displayHit(guess);
                 view.displayMessage("HIT!")
                 //ПРОВЕРКА НА ПОПАДАНИЯ ЕСЛИ КОРАБЫЛЬ ПОТОПЛИН ТО shipsSunk + 1
                 if(this.isShunk(ship)){
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
        view.displayMessage("You missed.");
        return false;
    },

    //ПРОВЕРЯЕМ ПОТОПЛЕН ЛИ КОРАБЫЛЬ
    isShunk:function(ship) {
        for(let i =0; i < this.shipLength;i++){
            if(ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    }

}





