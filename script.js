const game = (function () {
    const main = document.querySelector(".main");

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

    const start = () => {

        const p1 = createPlayer();
        const p2 = createPlayer(); 
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

        Xbtn.addEventListener("mousedown", () => {Xbtn.classList.add("border_active","selected"); mark_selected1 = "x";mark_selected2 = "o";})
        Obtn.addEventListener("mousedown", () => {Obtn.classList.add("border_active","selected"); mark_selected1 = "o";mark_selected2 = "x"})
        Xbtn.addEventListener("mouseup", () => {Xbtn.classList.remove("border_active");Obtn.classList.remove("selected");})
        Obtn.addEventListener("mouseup", () => {Obtn.classList.remove("border_active");Xbtn.classList.remove("selected");})

        formbtn.addEventListener("mousedown",() => {formbtn.classList.add("border_active");});
        formbtn.addEventListener("mouseup",(e) => {formbtn.classList.remove("border_active");});
        formbtn.addEventListener("click", () => {  
            p1.setprop(player1In.value,mark_selected1);
            p2.setprop(player2In.value,mark_selected2);
            if((player1In.value === "")||(player2In.value === "")||(mark_selected1 === "")){
                formbtn.classList.add("shake");
                setTimeout(() =>{formbtn.classList.remove("shake")},200);
            } else {
                createGrid(9);
            }
        });
    }



    const createGrid = (n) => {
        main.textContent = "";
        const gameBoard = document.createElement("div");
        gameBoard.classList.add("game_board");
        main.appendChild(gameBoard);
        for(i = 0; i<n; i++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("index", `${i}`);
            gameBoard.appendChild(cell);
        }
    }
    return {start};
})();

game.start();
