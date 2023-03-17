import './SCard.css';

export default function SCard({ card, handleChoice, isFlipped, disabled}){

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

    return(
          <div className = {`card ${isFlipped ? "flipped" : ""}`}>
          <img className="front" src={card.src} alt="front"/> 
          <img className="back" src="/Images/back.png" onClick= {handleClick} alt="back"
          />
          </div>
    )
}