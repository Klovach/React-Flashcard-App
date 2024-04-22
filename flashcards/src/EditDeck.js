import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const EditDeck = (props) => {

    // Because we don't have a way to get the user's id, the userId is hardcoded to 1.
    let deck = {
        userId: 1,
        image: '',
        name: '',
        description: '',
        cards: [],
    };

    // We check if the deck prop is passed. If it is, we set the deck variable to the deck prop.
    let newDeckCreation = true;
    const navigate = useNavigate();

    //  If there is a deck prop, we set the deck variable to the deck prop and set newDeckCreation to false.
    if (props.deck) {
        deck = props.deck;
        newDeckCreation = false;
    }

     /* These are the state variables, these are used to store the deck data.
    The useState function is used to create the state variables. A state variable is
    a variable that stores the state of a component. This is important to ensure we can
    edit and add new data. 
    The useState function takes the /initial value/ of the state variable as an argument.
    The initial value of the state variable is the deck data passed as a prop.
    The state variables are updated using the setName, setDescription, setImage, and setCards functions. */
    const [name, setName] = useState(deck.name);
    const [description, setDescription] = useState(deck.description);
    const [image, setImage] = useState(deck.image);
    const [cards, setCards] = useState(deck.cards);


    // The functions below are for updating specific state variables. 
    const updateName = (event) => {
        setName(event.target.value);
    };

    const updateDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateImage = (event) => {
        setImage(event.target.value);
    };


    // This function is used to update the card object in the cards array.
    // It takes the index of the card and the new card object. 
    const handleCardChange = (index, cardData) => {
        const updatedCards = [...cards];
        // We use the index to update a specific card object in the cards array.
        updatedCards[index] = cardData;
        setCards(updatedCards);
    };

    // Here we add a new card with an empty question and answer. 
    const handleAddCard = () => {
        setCards([...cards, { question: '', answer: '' }]);
    };

    // We take the index of the card to remove and create a new array without the card.
    const handleRemoveCard = (index) => {
        const updatedCards = [...cards];
        // Splice is used to remove an element from an array. 
        // The first argument is the index of the element to remove and the second argument is the number of elements to remove.
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    // This function is used to handle the form submission. This is an asynchronous event 
    // because we are making an API call to save the deck data, which includes our deck of cards. 
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');
        const editedDeck = {
            deckId: deck.deckId,
            userId: deck.userId,
            image: image,
            name: name,
            description: description,
            cards: cards
        };

        console.log(editedDeck);
        await saveDeck(editedDeck);
        props.onEditDeck(navigate); 
    };

    const saveDeck = async (deck) => {
        let response;
        if (newDeckCreation) {
            response = await dataSource.post('/decks', deck);
        } else {
            response = await dataSource.put('/decks', deck);
        }
        console.log(response);
        console.log(response.data); 
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="view-container">
            <div className='card'>
                <form onSubmit={handleFormSubmit}>
                    <h1 className='card-header'>{newDeckCreation ? "Create New" : "Edit"} Deck</h1>
                    <div className='card-body'>
                        {/* Deck Name */}
                        <div className="form-group">
                            <label htmlFor="deckName">Deck Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="deckName"
                                placeholder="Enter deck name"
                                value={name}
                                onChange={updateName}
                            />
                        </div>
                        {/* Deck Description */}
                        
                        <div className="form-group">
                            <label htmlFor="deckDescription">Deck Description</label>
                            <textarea
                                className="form-control"
                                id="deckDescription"
                                rows="3"
                                placeholder="Enter deck description"
                                value={description}
                                onChange={updateDescription}
                            ></textarea>
                        </div>
                        {/* Deck Image */}
                        <div className="form-group mb-3">
                            <label htmlFor="deckImage">Deck Image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="deckImage"
                                placeholder="Enter deck image URL"
                                value={image}
                                onChange={updateImage}
                            />
                        </div>
                    </div>

                    <h2 className='card-header'>Card List</h2>

                    {/* Card List :
                    How it works:
                    Thankfully we can acquire our card list from the state variable cards. 
                    We can use the map function to loop through the cards array and display each card.
                    The map function uses card, index. This allows us to access the card object /and/ its 
                    index in the array so we can display the numbers of the cards for the user. 
                    Map allows us to essentially take our card array in decks and map each card to an object we can get
                    properties from. 
                    */}
                    {cards.map((card, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Card {index + 1}</h5>
                                {/* Card Question */}
                                <div className="form-group">
                                    <label htmlFor={`question-${index}`}>Question</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`question-${index}`}
                                        value={card.question}
                                        /*  Breaking it down:
                                        onChange={(e) => : is an arrow function that takes an event as an argument. 
                                        handleCardChange : is a function that takes the index of the card and the new card object.
                                        { ...card, question: e.target.value } : Here use the spread operator to copy the card object 
                                        and update the question property. e.target.value is the new value of the question field.
                                        
                                        Im simple terms:
                                        When the user types in the question field, the onChange event is triggered.
                                        The handleCardChange function is called with the index of the card and the new card object.
                                        The new card object is a copy of the card object with the question property updated to the new value.
                                        
                                        More about spread syntax:
                                        Spread syntax (...) in JavaScript is particularly useful when working with arrays of objects for several reasons.
                                        It allows you to create a new array or object by copying the elements from an existing array or object. It
                                        can also be used to easily merge two arrays. 
                                        Spread syntax can *also* be used to pass elements of an array as arguments to a function. 
                                        */
                                        onChange={(e) => handleCardChange(index, { ...card, question: e.target.value })}
                                    />
                                </div>
                                {/* Card Answer */}
                                <div className="form-group mb-4">
                                    <label htmlFor={`answer-${index}`}>Answer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`answer-${index}`}
                                        value={card.answer}
                                        onChange={(e) => handleCardChange(index, { ...card, answer: e.target.value })}
                                    />
                                </div>
                                {/* Remove Card Button */}
                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveCard(index)}>
                                    Remove Card
                                </button>
                            </div>
                        </div>
                    ))}
                    <div class='card-body'>
                        {/* Add Card Button */}
                        <button type="button" className="btn btn-primary me-5 mb-5" onClick={handleAddCard}>
                            Add Card
                        </button>
                        <div className='row'>
                            <div className='col'>
                                {/* Cancel Button */}
                                <button type="button" onClick={handleCancel} className="btn btn-secondary me-2">
                                    Cancel
                                </button>
                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDeck;

