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
    console.log(bombsArray);

    for (let i = 1; i <= cellsNumber; i++) {
        //genenerare gli square
        const number = i;
        const square = createGridSquare(number, cellsPerSide)
        //aggiungi a grid gli square generati
        grid.append(square);

        // evento secondo click su square
        square.addEventListener('click', () => square.classList.add('second-click'));
    }
})




/**
 * Functions
 */

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

    // Creo nodo span
    const span = document.createElement('span');
    // Appendo al nodo span il contenuto (num)
    span.append(num);
    // Aggiungo al nodo square il contenuto del nodo span
    node.append(span);

    return node;
}