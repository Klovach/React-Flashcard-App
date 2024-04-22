import React from 'react';
import dataSource from './dataSource';

const Deck = (props) => {
  const handleButtonClick = (event, uri) => {
    console.log('Clicked: ' + props.deckId);
    props.onClick(props.deckId, uri);
  };

  // Delete a deck. This function is called when the delete button is clicked.
  const deleteDeck = async (deck) => {
    let response;
    // We send an HTTP request to the server to delete the deck and pass in the deck ID.
    response = await dataSource.delete(`/decks/${props.deckId}`);
    console.log(response);
    console.log(response.data);
    // After the deck is deleted, we reload the page to show the updated list of decks.
    // Realistically, we would want to add some error handling here. But for now, this suffices. 
    window.location.reload(); 
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        {/* Here we are checking whether props.imgURL is null. If it is, 
          a sample image is used to represent the empty image. Otherwise, 
          the img URL will be the same as the user's text input for the image. In a real application, 
          we might consider using JavaScript to upload and save the user's image 
          on a server, and then retrieve the URL of the stored image to store it in the database. 
          However, for simplicity's sake, this implementation suffices. */}
         {props.imgURL ? (
                        <img src={props.imgURL} className='card-img-top' alt={props.deckTitle} />
                    ) : (
                        <img src="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" className='card-img-top' alt="sample-img" />
                    )}
        <div className="card-body">
          <h5 className="card-title">{props.deckTitle}</h5>
          <p className="card-text">
            {props.deckDescription}
          </p>
        </div>
        <div className="card-footer">
          <button onClick={() => handleButtonClick(props.deckId, '/show/')} className='btn btn-primary me-2'>
            {props.buttonText}
          </button>
          <button onClick={() => handleButtonClick(props.deckId, '/edit/')} className='btn btn-outline-secondary me-2'>Edit</button>
          <button onClick={() => deleteDeck(props.deckId)} className='btn btn-danger'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
  