import {useState, useEffect} from 'react'
import Card from './Card'
import Bilbo from '../assets/1.jpg'
import Cameron from '../assets/2.jpg'
import Nikki from '../assets/3.jpg'
import Pollux from '../assets/4.jpg'

const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  // null = no game won yet this session. It lives in its own piece of state
  // and shuffleCards never touches it, so New Game cannot reset it.
  const [bestScore, setBestScore] = useState(null)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: crypto.randomUUID()}))

    setCards(shuffled)
    setTurns(0)
    setWon(false)
    // note: bestScore is deliberately NOT reset here
  }

  const handleChoice = (card) => {
    if (disabled || card === choiceOne || card.matched) {
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
    }
  }, [cards])

  // The best-score check watches `won`: it runs exactly when a game ends.
  // By the time `won` flips to true, `turns` already holds the final count
  // (the last resetTurn and the last match land in the same render).
  // Updater form: keep the smaller of the old best and this game's turns.
  useEffect(() => {
    if (won) {
      setBestScore((prevBest) =>
        prevBest === null ? turns : Math.min(prevBest, turns)
      )
    }
  }, [won])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1200)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button
        onClick={shuffleCards}
        className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6"
      >
        New Game
      </button>

      <p className="mb-2 text-lg">Turns used: {turns}</p>
      <p className="mb-6 text-lg">
        Best score: {bestScore === null ? '—' : bestScore}
      </p>

      {won && (
        <p className="mb-6 text-2xl font-bold text-green-700">
          You cleared the board in {turns} turns.
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  )
}

export default Grid
