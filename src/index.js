import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {EntryPage} from './pages';

const App = () => (
  <>
    <EntryPage/>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'));
