import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';import NavBar from './NavBar';
import SearchDeck from './SearchDeck';
import OneDeck from './OneDeck';
import EditDeck from './EditDeck';
import dataSource from './dataSource';
import './App.css';

const App = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [deckList, setDeckList] = useState([]);
  const [currentlySelectedDeckId, setCurrentlySelectedDeckId] = useState(0);
  let refresh = false;

  const loadDecks = async () => {
    const response = await dataSource.get('/decks');
    console.log('response was:', response);
    setDeckList(response.data);
  };

  useEffect(() => {
    loadDecks();
  }, [refresh]);

  const updateSearchResults = async (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase);
    // const response = await dataSource.get(
    // 'decks/search/description/' + phrase
    // );
    // setDeckList(response.data);
  };

  // FIX THIS
  const updateSingleDeck = (deckId, navigate, uri) => {
    console.log('Update Single Deck = ', deckId);
    console.log('Update Single Deck = ', navigate);
    let indexNumber = 0;
    for (let i = 0; i < deckList.length; ++i) {
      if (deckList[i].deckId === deckId) {
        indexNumber = i;
      }
    }
    setCurrentlySelectedDeckId(indexNumber);
    let path = uri + indexNumber;
    console.log('path', path);
    navigate(path);
  };

  const renderedList = deckList.filter((deck) => {
    if (
      deck.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      searchPhrase === ''
    ) {
      return true;
    }
    return false;
  });

  console.log('renderedList', renderedList);

  // ----------------------------------------------------------------------------------------- //

  const onEditDeck = (navigate) => {
    loadDecks();
    navigate("/");
  };
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={
          <SearchDeck 
            updateSearchResults={updateSearchResults} 
            deckList={renderedList}
            updateSingleDeck={updateSingleDeck}
          />
        }/>
        <Route
          exact
          path='/show/:deckId'
          element={<OneDeck deck={deckList[currentlySelectedDeckId]} />}
        />
        <Route
          exact
          path='/edit/:deckId'
          element={<EditDeck onEditDeck={onEditDeck} deck={deckList[currentlySelectedDeckId]} />}
        />
        {/* Add the path for new deck */}
        <Route
          exact
          path='/new'
          element={<EditDeck onEditDeck={onEditDeck} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
