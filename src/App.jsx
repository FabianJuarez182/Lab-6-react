import { useState, useEffect } from 'react'
import './App.css'
import SCard from './components/SCard'

const cardImages = [
  { "src": "/Images/Arctic Monkeys.jpg", matched: false},
  { "src": "/Images/Blink-182.jpg", matched: false},
  { "src": "/Images/BMTH.png", matched: false},
  { "src": "/Images/Green_Day.jpg", matched: false},
  { "src": "/Images/King for a day.jpg", matched: false},
  { "src": "/Images/led-zeppelin.jpg", matched: false},
  { "src": "/Images/Metallica.png", matched: false},
  { "src": "/Images/Smiths.jpg", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [movements, setMovements] = useState(0)
  const [constOne, setConstOne] = useState(null)
  const [constTwo, setConstTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {shuffleCards(cards)
  }, [])

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() -0.5)
    .map((card) => ({...card, id: Math.random()}))
    setConstOne(null)
    setConstTwo(null)
    setCards(shuffleCards)
    setMovements(0)
  }
  const handleChoice = (card) => {
    constOne ? setConstTwo(card) : setConstOne(card)
  }

  useEffect(() => {
    if (constOne && constTwo) {
      setDisabled(true)
      if(constOne.src === constTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === constOne.src) {
              return{...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurns()
      } else {
        setTimeout( () => resetTurns(), 1000)
      }
    }
  }, [constOne, constTwo])


  const resetTurns = () =>{
    setConstOne(null)
    setConstTwo(null)
    setMovements(prevMovements => prevMovements + 1 )
    setDisabled(false)
  }

  return (
    <div className="App">
     <h1> Memory game by Fabián Juárez </h1>
     <button onClick={shuffleCards}> Restart </button>
     <div className = "grid">
      {cards.map(card => (
        <SCard
        key={card.id}
        card = {card}
        handleChoice = {handleChoice}
        isFlipped ={card === constOne || card === constTwo || card.matched}
        disabled={disabled}
        />
      ))}
     </div>
     <a>Movements: {movements} </a>
    </div>
  )
}

export default App
