function Game(){
    let settings = {
        fieldSize: 8,
        cellSize: 50,
    };
    let stats = {
      whiteWinRate: 0,
      blackWinRate: 0,
    };

    let field;
    let fieldElement = document.getElementById("GameField");
    let settingsElement = document.getElementById("Settings");
    let player = 1;
    let whiteChecks = 12;
    let blackChecks = 12;
    let gameMode = 1;

    function clearField() {
        field = [];
        for (let i = 0; i < settings.fieldSize; i++) {
          field.push(new Array());
          for (let j = 0; j < settings.fieldSize; j++) {
            field[i].push(0);
          }
        }
        console.log(field);
        console.log(`player = ${player}`);
    } 

    function insertChecks(i,j,button){
        if(i < 3){
            if(i == 0 && j % 2 != 0 
               || i == 1 && j % 2 == 0
               || i == 2 && j % 2 != 0){
                button.addEventListener("click", makeStep);
                button.setAttribute("check", "black");
                button.classList.add("blackImg");
                field[i][j] = "black";
            }
        }
        else if(i > 4){
            if(i == 5 && j % 2 == 0
               || i == 6 && j % 2 != 0
               || i == 7 && j % 2 == 0){
                button.addEventListener("click", makeStep);
                button.setAttribute("check", "white");
                button.classList.add("whiteImg");
                field[i][j] = "white";
            }
        }
    }
  /**
   * @param {*} row
   * @param {*} col
   */
    let _Step = {
      row: 0,
      col: 0,
    };

    let ways = {
      NE: {
        dx: -1,
        dy: -1,
      },
      NW: {
        dx: -1,
        dy: 1,
      },
      SW: {
        dx: 1,
        dy: 1,
      },
      SE: {
        dx: 1,
        dy: -1,
      },  
    };

    function classicGameMode(){
      if(whiteChecks == 0){
        alert("Победа за черными!");
        stats.blackWinRate += 1;
        window.localStorage.setItem("stats", JSON.stringify(stats));
        Game();
      }else if(blackChecks == 0){
        alert("Победа за белыми!");
        stats.whiteWinRate += 1;
        window.localStorage.setItem("stats", JSON.stringify(stats));
        Game();
      }else if(whiteChecks == 1){
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            let elem = document.getElementById(`${i}${j}`);
            if(elem.hasAttribute("check")){
              if(elem.getAttribute("check" == "white")){
                let row = elem.getAttribute("row"),
                  col = elem.getAttribute("col");
                if(checkPossibleWay(row, col) == false){
                  alert("Победа за черными!");
                  stats.blackWinRate++;
                  window.localStorage.setItem("stats", JSON.stringify(stats));
                  Game();
                }
              }
            }
          }
        }
      }else if(blackChecks == 1){
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            let elem = document.getElementById(`${i}${j}`);
            if(elem.hasAttribute("check")){
              if(elem.getAttribute("check" == "black")){
                let row = elem.getAttribute("row"),
                  col = elem.getAttribute("col");
                if(checkPossibleWay(row, col) == false){
                  alert("Победа за белыми!");
                  stats.whiteWinRate++;
                  window.localStorage.setItem("stats", JSON.stringify(stats));
                  Game();
                }
              }
            }
          }
        }
      }
    }

    function giveawayGameMode(){
      if(whiteChecks == 0){
        alert("Победа за белыми!");
        stats.whiteWinRate += 1;
        window.localStorage.setItem("stats", JSON.stringify(stats));
        Game();
      }else if(blackChecks == 0){
        alert("Победа за черными!");
        stats.blackWinRate += 1;
        window.localStorage.setItem("stats", JSON.stringify(stats));
        Game();
      }else if(whiteChecks == 1){
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            let elem = document.getElementById(`${i}${j}`);
            if(elem.hasAttribute("check")){
              if(elem.getAttribute("check" == "white")){
                let row = elem.getAttribute("row"),
                  col = elem.getAttribute("col");
                if(checkPossibleWay(row, col) == false){
                  alert("Победа за белыми!");
                  stats.whiteWinRate++;
                  window.localStorage.setItem("stats", JSON.stringify(stats));
                  Game();
                }
              }
            }
          }
        }
      }else if(blackChecks == 1){
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            let elem = document.getElementById(`${i}${j}`);
            if(elem.hasAttribute("check")){
              if(elem.getAttribute("check" == "black")){
                let row = elem.getAttribute("row"),
                  col = elem.getAttribute("col");
                if(checkPossibleWay(row, col) == false){
                  alert("Победа за черными!");
                  stats.blackWinRate++;
                  window.localStorage.setItem("stats", JSON.stringify(stats));
                  Game();
                }
              }
            }
          }
        }
      }
    }

    function checkVictory(mode){
      if(mode == 1){
        classicGameMode();
      }
      else if(mode == 2){
        giveawayGameMode();
      }
    }

    function showStats(){
      console.log(`showStats, wwr=${stats.whiteWinRate}, bwr=${stats.blackWinRate}`);
      let stat = window.localStorage.getItem("stats");
      if (typeof stat === "string") {
        stats = JSON.parse(stat);
      }
      document.getElementById("winCounter").innerHTML = `<p>Белые победили ${stats.whiteWinRate} раз!</p>\n
      <p>Черные победили ${stats.blackWinRate} раз!</p>`;
    }

    function checkPossibleWay(row, col){
      let x, y;
      for (let way in ways) {
        x = parseInt(row);
        y = parseInt(col);
        let isWay = true;
        do{
          x += way.dx;
          y += way.dy;
          if (
            y < 0 ||
            x < 0 ||
            y >= settings.fieldSize ||
            x >= settings.fieldSize
          ){break;}
          if (field[x][y] === 0) {
            return true;
          }else if(field[x][y] != 0 && 
            field[x][y] != document.getElementById(`${row}${col}`).getAttribute("check") &&
            field[x + way.dx][y + way.dy] === 0){
              return true;
          }
          else {
            return false;
          }
        }while(isWay);
      }
    }

    function kingWay(way,x,y,row,col){
      let isWay = true;
      do{
        x += way.dx;
        y += way.dy;
        if (
          y < 0 ||
          x < 0 ||
          y >= settings.fieldSize ||
          x >= settings.fieldSize
        ){break;}
        if (field[x][y] === 0) {
          document.getElementById(`${x}${y}`).classList.toggle("green");
          document.getElementById(`${x}${y}`).addEventListener("click", Step);
        }else if(field[x][y] != 0 && 
          field[x][y] != document.getElementById(`${row}${col}`).getAttribute("check") &&
          field[x + way.dx][y + way.dy] === 0){
          document.getElementById(`${x}${y}`).classList.toggle("orange");
          document.getElementById(`${x + way.dx}${y + way.dy}`).classList.toggle("green");
          document.getElementById(`${x + way.dx}${y + way.dy}`).addEventListener("click", eatCheck);
          break;
        }
        else {
          isWay = false;
        }
      }while(isWay);
      _Step.row = row;
      _Step.col = col;
    }

    function isKing(row, col){
      let elem = document.getElementById(`${row}${col}`);
      let color = elem.getAttribute("check");
      if(color == "white" && row == 0){
        elem.setAttribute("king", true);
        elem.classList.remove("whiteImg");
        elem.classList.add("whiteKingImg");
      }
      else if(color == "black" && row == 7){
        elem.setAttribute("king", true);
        elem.classList.remove("blackImg");
        elem.classList.add("blackKingImg");
      }
    }

    function checkEnemy(way, x, y, row, col){
      let isWay = true;
      do{
        x += way.dx;
        y += way.dy;
        if (
          y < 0 ||
          x < 0 ||
          y >= settings.fieldSize ||
          x >= settings.fieldSize
        ){break;}
        if(field[x][y] != 0 && 
          field[x][y] != document.getElementById(`${row}${col}`).getAttribute("check") &&
          field[x + way.dx][y + way.dy] === 0){
            return true;
        }
        else {
          isWay = false;
        }
      }while(isWay);
    }

    function goToDirection(way, x, y, row, col){
      let isWay = true;
      do{
        x += way.dx;
        y += way.dy;
        if (
          y < 0 ||
          x < 0 ||
          y >= settings.fieldSize ||
          x >= settings.fieldSize
        ){break;}
        if (field[x][y] === 0) {
          console.log(`0 = ${x}, ${y}`);
          document.getElementById(`${x}${y}`).classList.toggle("green");
          document.getElementById(`${x}${y}`).addEventListener("click", Step);
          break;
        }else if(field[x][y] != 0 && 
          field[x][y] != document.getElementById(`${row}${col}`).getAttribute("check") &&
          field[x + way.dx][y + way.dy] === 0){
          console.log(`ornge = ${x}, ${y} \n grenn = ${x + way.dx}, ${y + way.dy}`);
          document.getElementById(`${x}${y}`).classList.toggle("orange");
          document.getElementById(`${x + way.dx}${y + way.dy}`).classList.toggle("green");
          document.getElementById(`${x + way.dx}${y + way.dy}`).addEventListener("click", eatCheck);
          break;
        }
        else {
          isWay = false;
        }
      }while(isWay);
    }

    function derection(way, x, y, row, col){
      switch(player){
        case 1:
          if(checkEnemy(way,x,y,row,col) == true){
            document.getElementById(`${x + way.dx}${y + way.dy}`).classList.toggle("orange");
            document.getElementById(`${x + way.dx + way.dx}${y + way.dy + way.dy}`).classList.toggle("green");
            document.getElementById(`${x + way.dx + way.dx}${y + way.dy + way.dy}`).addEventListener("click", eatCheck);
            break;
          }
          else if(document.getElementById(`${x}${y}`).hasAttribute("king")){
            kingWay(way,x,y,row,col);
          }
          else if(way == ways.NE || way == ways.NW){
            goToDirection(way,x,y,row,col);
          }  
        ;break;
        case 2:
          if(checkEnemy(way,x,y,row,col) == true){
            document.getElementById(`${x + way.dx}${y + way.dy}`).classList.toggle("orange");
            document.getElementById(`${x + way.dx + way.dx}${y + way.dy + way.dy}`).classList.toggle("green");
            document.getElementById(`${x + way.dx + way.dx}${y + way.dy + way.dy}`).addEventListener("click", eatCheck);
            break;
          }
          else if(document.getElementById(`${x}${y}`).hasAttribute("king")){
            kingWay(way,x,y,row,col);
          }
          else if(way == ways.SW || way == ways.SE){
            goToDirection(way,x,y,row,col);
          }  
        ;break;
      }
    }

    function checkWay(row, col){
      let x, y;
      for (let way in ways) {
        x = parseInt(row);
        y = parseInt(col);
        derection(ways[way],x,y,row,col);
      }
      _Step.row = row;
      _Step.col = col;
    }

    /**
     *@param {MouseEvent} e
     **/

    function removeStep(){
      for (let i = 0; i < settings.fieldSize; i++) {
        for (let j = 0; j < settings.fieldSize; j++) {
          if(document.getElementById(`${i}${j}`).classList.contains("green")){
            document.getElementById(`${i}${j}`).classList.remove("green");
            document.getElementById(`${i}${j}`).removeEventListener("click", Step);
          }
        }
      }
    }

    function Step(e){
      //button - куда пришли 
      //step - откуда пришли 
      let button = e.target;
      let row = parseInt(button.getAttribute("row"));
      let col = parseInt(button.getAttribute("col"));
      let checkAttribute = document.getElementById(`${_Step.row}${_Step.col}`).getAttribute("check");
      if(document.getElementById(`${_Step.row}${_Step.col}`).hasAttribute("king")){
        //переносим атрибуты на новую клетку
        button.classList.remove("green");
        button.setAttribute("check", checkAttribute);
        button.setAttribute("king", true);
        if(field[_Step.row][_Step.col] == "white"){
          button.classList.add("whiteKingImg");
          field[row][col] = "white";
        }else if(field[_Step.row][_Step.col] == "black"){
          button.classList.add("blackKingImg");
          field[row][col] = "black";
        }
        button.removeEventListener("click", Step);
        button.addEventListener("click", makeStep);
        //удаляем атрибуты со старой клетки 
        document.getElementById(`${_Step.row}${_Step.col}`).removeAttribute("check");
        document.getElementById(`${_Step.row}${_Step.col}`).removeAttribute("king");
        if(field[_Step.row][_Step.col] == "white"){
          document.getElementById(`${_Step.row}${_Step.col}`).classList.remove("whiteKingImg");
        }
        else{
          document.getElementById(`${_Step.row}${_Step.col}`).classList.remove("blackKingImg");
        }
        document.getElementById(`${_Step.row}${_Step.col}`).removeEventListener("click", makeStep);
      }else{
        //переносим атрибуты на новую клетку 
        button.classList.remove("green");
        button.setAttribute("check", checkAttribute);
        if(field[_Step.row][_Step.col] == "white"){
          button.classList.add("whiteImg");
          field[row][col] = "white";
        }else if(field[_Step.row][_Step.col] == "black"){
          button.classList.add("blackImg");
          field[row][col] = "black";
        }
        button.removeEventListener("click", Step);
        button.addEventListener("click", makeStep);
        //удаляем атрибуты со старой клетки 
        document.getElementById(`${_Step.row}${_Step.col}`).removeAttribute("check");
        if(field[_Step.row][_Step.col] == "white"){
          document.getElementById(`${_Step.row}${_Step.col}`).classList.remove("whiteImg");
        }
        else{
          document.getElementById(`${_Step.row}${_Step.col}`).classList.remove("blackImg");
        }
        document.getElementById(`${_Step.row}${_Step.col}`).removeEventListener("click", makeStep);
      }
      //с этого момента все одинакого 
      field[_Step.row][_Step.col] = 0;
      console.log(field);
      if(player == 1){
        player = 2;
      }else{
        player = 1;
      }
      checksCondition();
      console.log(`player = ${player}`);
      removeStep();
      isKing(button.getAttribute("row"), button.getAttribute("col"));
    }
    
    function eatCheck(e){
      console.log("eat Check");
      Step(e);
      let button = e.target;
      let x, y, isWay;
      for (let way in ways) {
        x = parseInt(button.getAttribute("row"));
        y = parseInt(button.getAttribute("col"));
        isWay = true;
        do {
          x += ways[way].dx;
          y += ways[way].dy;
          if (
            y < 0 ||
            x < 0 ||
            y >= settings.fieldSize ||
            x >= settings.fieldSize
          )
            break;
          if(document.getElementById(`${x}${y}`).classList.contains("orange")){
            document.getElementById(`${x}${y}`).classList.remove("orange");
            if(player == 1){
              whiteChecks -= 1;
              field[x][y] = 0;
              if(document.getElementById(`${x}${y}`).hasAttribute("king")){
                document.getElementById(`${x}${y}`).classList.remove("whiteKingImg");
                document.getElementById(`${x}${y}`).removeEventListener("click", makeStep);
                document.getElementById(`${x}${y}`).removeAttribute("check");
                document.getElementById(`${x}${y}`).removeAttribute("king");
                console.log(`white cheks = ${whiteChecks}`);
                isWay = false;
              }else{
                document.getElementById(`${x}${y}`).classList.remove("whiteImg");
                document.getElementById(`${x}${y}`).removeEventListener("click", makeStep);
                document.getElementById(`${x}${y}`).removeAttribute("check");
                console.log(`white cheks = ${whiteChecks}`);
                isWay = false;
              }
            }
            else if(player == 2){
              blackChecks -= 1;
              field[x][y] = 0;
              if(document.getElementById(`${x}${y}`).hasAttribute("king")){
                document.getElementById(`${x}${y}`).classList.remove("blackKingImg");
                document.getElementById(`${x}${y}`).removeEventListener("click", makeStep);
                document.getElementById(`${x}${y}`).removeAttribute("check");
                document.getElementById(`${x}${y}`).removeAttribute("king");
                console.log(`black cheks = ${blackChecks}`);
                isWay = false;
              }else{
                document.getElementById(`${x}${y}`).classList.remove("blackImg");
                document.getElementById(`${x}${y}`).removeEventListener("click", makeStep);
                document.getElementById(`${x}${y}`).removeAttribute("check");
                console.log(`black cheks = ${blackChecks}`);
                isWay = false;
              }
            }
          }
        }while(isWay);
      }
      button.removeEventListener("click", eatCheck);
      for (let i = 0; i < settings.fieldSize; i++) {
        for (let j = 0; j < settings.fieldSize; j++) {
          if(document.getElementById(`${i}${j}`).classList.contains("orange")){
            document.getElementById(`${i}${j}`).classList.remove("orange");
          }
        }
      }
      checkVictory(gameMode);
    }

    function checksCondition(){
      let div = document.getElementById("currentPlayer");
      if(player == 1){
        div.innerHTML = "<p>Текущий игрок: Белые <img width='15px' height='15px' src='./src/img/white.png'></p>";
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            if(document.getElementById(`${i}${j}`).hasAttribute("check")){
              if(document.getElementById(`${i}${j}`).getAttribute("check") == "black"){
                document.getElementById(`${i}${j}`).setAttribute("disabled", true);
              }
              else{
                document.getElementById(`${i}${j}`).removeAttribute("disabled");
              }
            }
          }
        }
      }else if(player == 2){
        div.innerHTML = "<p>Текущий игрок: Черные <img width='15px' height='15px' src='./src/img/black.png'></p>";
        for (let i = 0; i < settings.fieldSize; i++) {
          for (let j = 0; j < settings.fieldSize; j++) {
            if(document.getElementById(`${i}${j}`).hasAttribute("check")){
              if(document.getElementById(`${i}${j}`).getAttribute("check") == "white"){
                document.getElementById(`${i}${j}`).setAttribute("disabled", true);
              }
              else{
                document.getElementById(`${i}${j}`).removeAttribute("disabled");
              }
            }
          }
        }
      }
    }

    function clearStats(){
      for(let stat in stats){
        stats[stat] = 0;
      }
      window.localStorage.setItem("stats", JSON.stringify(stats));
      showStats();
    }

    function clearAnotherWay(){
      removeStep();
      for (let i = 0; i < settings.fieldSize; i++) {
        for (let j = 0; j < settings.fieldSize; j++) {
          if(document.getElementById(`${i}${j}`).classList.contains("orange")){
            document.getElementById(`${i}${j}`).classList.remove("orange");
          }
        }
      }
    }

    function makeStep(e){
      clearAnotherWay();
      let button = e.target;
      console.log(button);
      let row = button.getAttribute("row"),
          col = button.getAttribute("col");
      console.log(`makeStep: row=${row}, col=${col}`);
      if(field[row][col] != 0){
        checkWay(row, col);
      }
    }

    function gameModeFn(e){
      let mode = e.target.value;
      console.log(`gameModeFn(value) = ${mode}`);
      if(mode == "classic"){
        gameMode = 1;
      }else if(mode == "giveaway"){
        gameMode = 2;
      }
    }

    function insertSettings(){
      let ul = `<ul>
      <li>
      <a id ='newGameButton' class='fciA navItem'><span class='fciSpan'>Новая игра</span></a></li>
      <li>
      <a id ='clearStats' class='fciA navItem'><span class='fciSpan'>Очистить статистику</span></a></li>
      </ul>`;
      let select = `Игровой режим: <select>
      <option value="classic">Классика</option>
      <option value="giveaway">Поддавки</option>
      </select>`;
      settingsElement.innerHTML = ul + select;
      document.getElementById("newGameButton").addEventListener("click", Game);
      document.getElementById("clearStats").addEventListener("click", clearStats);
      document.querySelector("select").addEventListener("change", gameModeFn);
    }

    function makeField(){
        let i,j;
        insertSettings();
        clearField();
        fieldElement.innerHTML = "";
        fieldElement.style.width = fieldElement.style.height =
        settings.fieldSize * settings.cellSize + "px";
        for (i = 0; i < field.length; i++) {
            for (j = 0; j < field[i].length; j++) {
              let button = document.createElement("button");
              button.setAttribute("row", i);
              button.setAttribute("col", j);
              button.setAttribute("id", `${i}${j}`);
              button.style.width = settings.cellSize + "px";
              button.style.height = settings.cellSize + "px";
              if (i % 2 != 0 && j % 2 === 0 ) {
                button.classList.add("black");
              } 
              else if (i % 2 === 0 && j % 2 != 0) {
                button.classList.add("black");
              }
              else{
                button.classList.add("white");
                button.setAttribute("disabled", true);
              }
              insertChecks(i,j,button);
              fieldElement.append(button);
            }
        }
    }
    makeField();
    showStats();
    checksCondition();
}
Game();