import {useState, useTransition} from "react";
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx";
import {TURNS, WINNER_COMBOS, checkWinner, checkEndGame} from "./constants.js";
import {Winner} from "./components/Winner.jsx";

function App() {

    const [board, setBoard] = useState(()=>{
        const boardLocalStorage = window.localStorage.getItem('board')
        return boardLocalStorage ? JSON.parse(boardLocalStorage) : Array(9).fill(null)
    })
    const [turn, setTurn] = useState(()=>{
        const turnLocalStorage = window.localStorage.getItem('turn')
        return turnLocalStorage ? turnLocalStorage : TURNS.x
    })
    const [winner, setWinner] = useState(null)

    const updateBrand = (index) => {

        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
        setTurn(newTurn)

        window.localStorage.setItem("board", JSON.stringify(newBoard))
        window.localStorage.setItem("turn", newTurn)

        const newWinner = checkWinner(newBoard)
        if(newWinner){
            confetti()
            setWinner(newWinner)
        }else if(checkEndGame(newBoard)){
            setWinner(false)
        }
    }

    const resetGame = () => {
        setWinner(null)
        setTurn(TURNS.x)
        setBoard(Array(9).fill(null))
        window.localStorage.clear()
    }

    return (
        <main className='board'>
            <h1>Tic tac toe</h1>
            <button onClick={resetGame}>Resetear Juego</button>
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square key={index} index={index} updateBrand={updateBrand}>
                                {square}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
                <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
            </section>

            <Winner winner={winner} resetGame={resetGame}/>

        </main>
    )
}

export default App
