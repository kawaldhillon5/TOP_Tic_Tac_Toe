const game = (function () {
    const main = document.querySelector(".main");
    const p1 = createPlayer();
    const p2 = createPlayer(); 

    function createPlayer(){

        let playerName = "";
        let mark = "";

        const getName = () =>  playerName;
        const getMark = () =>  mark;
        const setprop = function(P_name, P_mark){
            playerName = P_name;
            mark = P_mark; 
        };
        return {setprop, getMark, getName};
    }

    const setPlayer = () => {
        let mark_selected1 = "", mark_selected2 = "";

        const form = document.createElement("form");
        const formHead = document.createElement("p");
        const player1In = document.createElement("input");
        const player2In = document.createElement("input");
        const formMark = document.createElement("div");
        const markhead = document.createElement("p");
        const Xbtn = document.createElement("button");
        const Obtn = document.createElement("button");
        const formbtn = document.createElement("button");
        formHead.textContent = "Player Names";
        player1In.setAttribute("type","text");
        player2In.setAttribute("type","text");
        player1In.setAttribute("placeholder","Player 1 Name");
        player2In.setAttribute("placeholder","Player 2 Name");
        player1In.setAttribute("id","player1");
        player2In.setAttribute("id","player2");
        player1In.setAttribute("required","");
        player2In.setAttribute("required","");
        markhead.textContent = "Choose a Mark for Player 1";
        Xbtn.textContent = "X";
        Obtn.textContent = "O";
        Xbtn.setAttribute("type", "button");
        Obtn.setAttribute("type", "button");
        formbtn.textContent = "START GAME !";
        formbtn.setAttribute("type","button");
        main.appendChild(form);
        form.appendChild(formHead);
        form.appendChild(player1In);
        form.appendChild(player2In);
        form.appendChild(markhead);
        form.appendChild(formMark);
        formMark.appendChild(Xbtn);
        formMark.appendChild(Obtn);
        form.appendChild(formbtn);

        Xbtn.addEventListener("mousedown", () => {Xbtn.classList.add("border_active","selected"); mark_selected1 = "X";mark_selected2 = "O";})
        Obtn.addEventListener("mousedown", () => {Obtn.classList.add("border_active","selected"); mark_selected1 = "O";mark_selected2 = "X"})
        Xbtn.addEventListener("mouseup", () => {Xbtn.classList.remove("border_active");Obtn.classList.remove("selected");})
        Obtn.addEventListener("mouseup", () => {Obtn.classList.remove("border_active");Xbtn.classList.remove("selected");})

        formbtn.addEventListener("mousedown",() => {formbtn.classList.add("border_active");});
        formbtn.addEventListener("mouseup",() => {formbtn.classList.remove("border_active");});
        formbtn.addEventListener("click", () => {  
            p1.setprop(player1In.value,mark_selected1);
            p2.setprop(player2In.value,mark_selected2);
            if((player1In.value === "")||(player2In.value === "")||(mark_selected1 === "")){
                formbtn.classList.add("shake");
                setTimeout(() =>{formbtn.classList.remove("shake")},200);
            } else {
                main.removeChild(form);
                createGrid(9);
            }
        });
    }

    const createGrid = (n) => {
        const main_top = document.createElement("div");
        const main_bottom = document.createElement("button");
        const gameBoard = document.createElement("div");
        main_bottom.classList.add("btn");
        main_top.classList.add("grid_top");
        main_bottom.textContent = "RESTART";
        main_top.textContent = `${p1.getName()} will Start game by placing ${p1.getMark()}`;
        gameBoard.classList.add("game_board");
        main.appendChild(main_top);
        main.appendChild(gameBoard);
        main.appendChild(main_bottom);
        for(i = 0; i<n; i++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("index", `${i}`);
            gameBoard.appendChild(cell);
        }
        main_bottom.addEventListener("mousedown",() => {main_bottom.classList.add("border_active");});
        main_bottom.addEventListener("mouseup",() => {
        main_bottom.classList.remove("border_active");});
        startPlaying();
    }

    const startPlaying = () => {
        const cells = document.querySelectorAll(".cell");
        const statusText = document.querySelector(".grid_top");
        const restartBtn = document.querySelector(".btn");
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let options = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = p1;
        let running = false;

        initializeGame();

        function initializeGame(){
            cells.forEach(cell => cell.addEventListener("click",  cellClicked));
            restartBtn.addEventListener("click", restartGame);
            statusText.textContent = `${p1.getName()} will Start game by placing ${p1.getMark()}`;
            running = true;
        }
        function cellClicked(){
            const cellIndex = this.getAttribute("index");

            if(options[cellIndex] != "" || !running){
                return;
            }

            updateCell(this, cellIndex);
            checkWinner();
        }
        function updateCell(cell, index){
            options[index] = currentPlayer.getMark();
            cell.textContent = currentPlayer.getMark();
        }
        function changePlayer(){
            currentPlayer = (currentPlayer.getMark() == p1.getMark()) ? p2 : p1;
            statusText.textContent = `${currentPlayer.getName()}'s turn`;
        }
        function checkWinner(){
            let roundWon = false;

            for(let i = 0; i < winConditions.length; i++){
                const condition = winConditions[i];
                const cellA = options[condition[0]];
                const cellB = options[condition[1]];
                const cellC = options[condition[2]];

                if(cellA == "" || cellB == "" || cellC == ""){
                    continue;
                }
                if(cellA == cellB && cellB == cellC){
                    roundWon = true;
                    cells.forEach(
                        (cell) => {
                            let index = cell.getAttribute("index")
                            if (index == condition[0] || index == condition[1] || index == condition[2]) {
                                cell.classList.add("cell_highlight");
                            }
                        }
                    );
                    console.log(condition);
                    break;
                }
            }

            if(roundWon){
                statusText.textContent = `${currentPlayer.getName()} wins!`;
                statusText.classList.add("winner")
                running = false;
            }
            else if(!options.includes("")){
                statusText.textContent = `Draw!`;
                running = false;
            }
            else{
                changePlayer();
            }
        }
        function restartGame(){
            
            currentPlayer = p1;
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer.getName()}'s turn`;
            statusText.classList.remove("winner");
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("cell_highlight");
            });
            running = true;
        }
    } 
    
    const start = () => {
        setPlayer();
    }

    return {start};
})();

game.start();
