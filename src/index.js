import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PostItApp } from './componentes/PostItApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostItApp />
  </React.StrictMode>
);
