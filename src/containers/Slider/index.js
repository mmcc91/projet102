import React, { useEffect, useState, useRef } from "react"; // ajout de useRef pour le timer 
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) => // trie decroissant par date
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const timeoutRef = useRef(null); // ajout de useRef pour le timer

  const nextCard = () => { 
    setIndex((prevIndex) => (prevIndex === byDateDesc.length - 1 ? 0 : prevIndex + 1)); // si on est au dernier element on revient au premier
  };

  useEffect(() => { // ajout de useEffect pour le timer 
    if (byDateDesc) {
      timeoutRef.current = setTimeout(() => { // ajout de setTimeout pour le timer
        nextCard();
      }, 5000); // ajout de 5secondes pour le timer 
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, byDateDesc]);

  const handleRadioChange = (idx) => { // ajout de handleRadioChange pour le timer
    setIndex(idx);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( 
        // besoi n dune clef unique dou title 
        <div key={event.title} className={`SlideCard SlideCard--${idx === index ? "display" : "hide"}`}> 
        {/* ajout de idx pour le timer , le event.title est la clef cela permet denlever l'erreur react/no-array-index-key */}
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>  {getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            
            <input
              key={event.id} 
              // ajout de key pour le timer enlever l'erreur react/no-array-index-key
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>
{/* suppressions des deux boutons onclick car display derriere  */}
    </div> 
  );
};

export default Slider;