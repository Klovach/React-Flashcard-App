import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
/*
Markus's Notes:

The first few lines of code in index.js are the imports. They import the React libraries necessary to run a React program.
For instance, the first statement (import React) will be utilized in nearly every file created in the application.
The second import statement from the react-dom should only be used in index.js and is only applicable to web applications.

The name "App" is a function name that is commonly used for the starting point for most React applications.
*/
ReactDOM.render(<App />, document.querySelector('#root'));