import React from 'react';
import SearchForm from './SearchForm';
import DeckList from './DeckList';
import undrawImg from './img/undraw_learning_re_32qv.svg';


const SearchAlbum = (props) => {
    console.log('props with update single album', props);
    return (
        <div className='container'>
            <div className='justify-content-center text-center'>
            <h1 className='mt-5'>Flashcard Dashboard</h1>
            <h4 className='mb-5 text-center'>Search & Manage Your Cards</h4>
            <div className='img-fluid'>
                <img src={undrawImg} alt='sample-img' style={{ width: '400px' }} />
                </div>
            </div>
            <SearchForm onSubmit={props.updateSearchResults} />
            <div className='list-container mb-5'>
            <DeckList deckList={props.deckList} onClick={props.updateSingleDeck} />
            </div>
        </div>
    );
};

export default SearchAlbum;