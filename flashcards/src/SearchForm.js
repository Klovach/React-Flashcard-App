import React, { useState } from 'react';

const SearchForm = (props) => {
    const [inputText, setInputText] = useState("");

    const handleChangeInput = (event) => {
        setInputText(event.target.value);
        console.log(inputText);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(inputText);
    };

    return (
        <div className='search-container'>
            <form onSubmit={handleFormSubmit}>
                <div className='form-outline mb-4'>
                    <input type='text' className='form-control' 
                    placeholder='Enter search term here...' 
                    onChange={handleChangeInput} />
                </div>
                <div className='text-center'>
                    <button type='submit' className='btn btn-primary'>Search For An Abum</button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;