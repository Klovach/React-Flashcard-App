import React from 'react';

const OneDeck = (props) => {
    return (
        <div className='view-container'>
            <div className='row'>
            <h2 className='card-header'>Deck Details</h2>
                <div className='card'>
                    {props.deck.image ? (
                        <img src={props.deck.image} className='card-img-top' alt={props.deck.name} />
                    ) : (
                        <img src="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" className='card-img-top' alt="sample-img" />
                    )}
                    <div className='card-body'>
                        <h5 className='card-title'>{props.deck.name}</h5>
                        <p className='card-text'>{props.deck.description}</p>
                        <div className='list-group'>
                            {/* Here we need to loop through the card array. */}
                            {props.deck.cards.map((card) => (
                                <div className='list-group-item' key={card.cardId}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{card.question}</h5>
                                            <p className='card-text'>{card.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='card-footer'>
            <a href={`/edit/${props.deck.deckId}`} className='btn btn-primary m-2'>Edit</a>
            </div>
                </div>
            </div>
 
        </div>
        
    );
}

export default OneDeck;
