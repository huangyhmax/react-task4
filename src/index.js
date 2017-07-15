import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './test';
import Listtodo from './todolist';
// import Todoaa from './test';

ReactDOM.render(<Listtodo/>, document.getElementById('container'));