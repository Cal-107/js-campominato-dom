// Prima parte
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// Seconda parte
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

//ref
const setBtn = document.getElementById('set-dimension');
const dimensionLevel = document.getElementById('dimensions');
const wrapGrid = document.querySelector('.wrap-grid');

//grid setup 
setBtn.addEventListener('click', () => {
    wrapGrid.innerHTML = ''

    // Set dimension grid
    const gridDimension = dimensionLevel.value;
    console.log(gridDimension);
    
    let cellsNumber;
    let cellsPerSide;
    switch(gridDimension) {
        case 'easy':
            cellsNumber = 100;
            cellsPerSide = 10;
            break;
        case 'medium':
            cellsNumber = 81;
            cellsPerSide = 9;
            break;
        case 'hard':
            cellsNumber = 49;
            cellsPerSide = 7;
    }

    //Gen grid parent
    const grid = document.createElement('div');
    grid.classList.add('grid');
    // Inserisci grid
    wrapGrid.append(grid);

    //Genero 16 numeri random univoci dalla griglia per le bombe
    const bombsArray = genBombs(cellsNumber, 16);

    //Genero i tentativi
    const attempsArray = [];
    let attempsNum = 0;
    const maxAttempts = cellsNumber - bombsArray.length;

    for (let i = 1; i <= cellsNumber; i++) {
        //genenerare gli square
        const number = i;
        const square = createGridSquare(number, cellsPerSide)
        //aggiungi a grid gli square generati
        grid.append(square);

        // evento secondo click su square
        square.addEventListener('click', () => {
            const secondClick = clickSquare (square, bombsArray, attempsArray, maxAttempts, attempsNum);
            attempsNum += 1;
        }
    )}
})




/**
 * Functions
 */

//Endgame logic
function endGame (arrayBombs, attempsArray, maxAttempts) {
    // Ottengo tutte le square presenti

    const squares = document.querySelectorAll('.square');

    //mostra tutte le bombe presenti nell'area di gioco
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if (arrayBombs.includes(squareValue)) {
            square.classList.add('second-click-bomb');
        }
    }

    // Messaggio di endgame
    let messageText = `Complimenti, hai idovinato i ${maxAttempts} tentativi validi.. Play again`;

    if (attempsArray.length < maxAttempts) {
        messageText = `Mamma mia, che disastro, hai indovinato solo ${attempsArray.length} tentativi validi.. Play again`;
    }

    const messageTextEl = document.createElement('h1');
    messageTextEl.classList.add('message', 'p-1rem');
    messageTextEl.append(messageText);
    document.querySelector('.grid').append(messageTextEl);

    //Disabilitare le square togliendo il cursor pointer
    document.querySelector('.grid').classList.add('end-game');
}


//Genero quello che succede sui click su square
function clickSquare (square, arrayBombs, attempsArray, maxAttempts) {

    // Devo ottenere il numero dello square
    const numb = parseInt(square.innerHTML);

    // 1° opzione - Abbiamo colpito la bomba?
    // 2° opzione - Non è una bomba e neanche un numero cliccato in precedenza
    if (arrayBombs.includes(numb)) {       
        endGame (arrayBombs, attempsArray, maxAttempts)
    } else if (!attempsArray.includes(numb)){
        square.classList.add('second-click-safe');

        attempsArray.push(numb);
    
       if (attempsArray.length === maxAttempts)  {

           endGame (arrayBombs, attempsArray, maxAttempts);
       }
    }
    return numb;
}



//Genero la lista delle bombe
function genBombs (totCells, totBombs) {
    // Creare 16 numeri univoci per le bombe

    //Creo una variabile con un array vuoto
    let arrayBombs = [];

    //Inserisco un ciclio while fino a quando le bombe non sono quanto voglio io (totBombs = 16 in questo caso quando si inserirà)
    while (arrayBombs.length < totBombs) {
        // generazione numero random
        const numBomb = genRandNum(1, totCells);

        //check numero univoco, se non! presente nella list bombs allora lo inserisco nell'array bomb
        if (!arrayBombs.includes(numBomb)) {
            arrayBombs.push(numBomb);
        }
    } return arrayBombs
}

// Gen Numero random
function genRandNum(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}


// Gen Square
 function createGridSquare(num, cells) {

    //crea node square
    const node = document.createElement('div');
    // Aggiungo la classe (presente nel css) .square al nodo
    node.classList.add('square');
    // Definisco grandezza e altezza del nodo creato
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    // Aggiungo al nodo square il contenuto del nodo span
    node.append(num);

    return node;
}