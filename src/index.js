import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import HabitPresenter from './habit_presenter';

const Presenter = new HabitPresenter([
  { id: 1, name: 'Reading', count: 0 },
  { id: 2, name: 'Running', count: 0 },
  { id: 3, name: 'Coding', count: 0 },
]);

ReactDOM.render(
  <React.StrictMode>
    <App presenter={Presenter}/>
  </React.StrictMode>,
  document.getElementById('root')
);
