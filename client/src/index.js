import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/Navigationbar';
import RegisterForm from './components/demoupload';
import ProductRegister from './components/product';
import CategoryRegister from './components/category';
import Viewproduct from './components/viewproduct';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterForm/>
    <CategoryRegister/>
    <ProductRegister/>
    <Viewproduct/>
  </React.StrictMode>
);
reportWebVitals();
