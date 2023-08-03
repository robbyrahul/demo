import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import { lazy,Suspense } from 'react';

function App() {
  const Upd=lazy(()=>import('./components/updatepage'))
  return (
  <Suspense fallback={<div>Loading</div>}>

    <Routes>
      <Route path="edit/:id" element={<Upd/>}></Route>
    </Routes>
  </Suspense>
      );
}

export default App;
