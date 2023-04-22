import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './App';


const items = [
  { text: 'Adnan Samir' },
  { text: '12003553' },
  { text: 'B-Tech' },
  { text: 'CSE' },
  { text: 'LPU' },
];

ReactDOM.render(
  <React.StrictMode>
    <List items = {items} />
  </React.StrictMode>,
  document.getElementById('root')
);


