import React from 'react';
import Deck from './Deck';
import { useNavigate } from 'react-router-dom';

const DeckList = (props) => {

    const handleSelectionOne = (deckId, uri) =>{
        console.log('Selected deck ID is ' + deckId);
         props.onClick(deckId, navigator, uri);
    };

    console.log(props.decks);
    
    console.log('DeckList props:', props.deckList);
    const navigator = useNavigate();
    const decks = props.deckList.map((deck)  => {
        return (
            <Deck
            key={deck.deckId}
            deckId={deck.deckId}
            userId={deck.userId}
            imgURL={deck.image}
            deckTitle={deck.name}
            deckDescription={deck.description}
            buttonText='View'
            cards={deck.cards}
            onClick={(deckId, uri) => handleSelectionOne(deckId, uri)}
        />
        
        );
    });

    return <div className='list-container'>{decks}</div>;
};

export default DeckList;
