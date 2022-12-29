
//array from ?
const cells = Array.from(document.querySelectorAll('.cell'))
const gameStatus = document.querySelector('.status')
const gameRestart = document.querySelector('.gamerestart')
let turn = document.querySelector('.turn')
let isActive = true
let currentPlayer = 'X'
let gameState = ['', '', '', '', '', '', '', '', '']


let gameConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


cells.forEach((cell) => {
    cell.addEventListener('click', cellHandler)
})



gameRestart.addEventListener('click', gameRestartHandler)

function cellHandler() {
    const cellIndex = parseInt(this.dataset.id)
    if (!gameState[cellIndex] && isActive) {
        gameState[cellIndex] = currentPlayer
        this.innerText = currentPlayer
        this.classList.add('selected')
        gameResult()
        changePlayer()


        // winCheck()

    }

}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    turn.innerText = `it's ${currentPlayer} turn`

}


function gameResult() {
    let isWin = false
    for (const gameCondition of gameConditions) {
        let state0 = gameState[gameCondition[0]]
        let state1 = gameState[gameCondition[1]]
        let state2 = gameState[gameCondition[2]]
        if (!state0 || !state1 || !state2) continue
        if (state0 === state1 && state1 === state2) {
            isWin = true
            break
        }
    }
    if (isWin) {
        gameStatus.innerText = `Player ${currentPlayer} has won!`
        isActive = false
        return
    }
    if (!gameState.includes('')) {
        gameStatus.innerText = 'DRAW!'
        isActive = false
        return
    }
}

// function winCheck() {

//     console.log(gameState);
//     gameState.forEach(() => {
//         if (!gameState[0] || !gameState[4] && !gameState[4] || !gameState[8]) {
//             if (gameState[0] === gameState[4] && gameState[0] === gameState[8]) {
//                 console.log('WIN!');
//             }
//             else console.log('not');

//         }


//     }
//     )
// }

function gameRestartHandler() {
    cells.forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('selected')
    })
    currentPlayer = 'X'
    turn.innerText = `it's ${currentPlayer} turn`
    gameState = ['', '', '', '', '', '', '', '', '']
}