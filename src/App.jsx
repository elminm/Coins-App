import {Routes, Route} from 'react-router-dom';
import {useState } from 'react';
import HomePage from "./pages/HomePage/HomePage";
import "./css/style.css";
import CoinList from './pages/CoinList/CoinList';
import CoinDescription from './pages/CoinDescription/CoinDescription';
import { useSelector } from 'react-redux';

function App(){

  const state = useSelector(state => state);

  console.log(state);

  function headerPropFunc(arr){
  };
  
  return (
    <div>
        <Routes>
          <Route path='' element={<HomePage  headerPropFunc={headerPropFunc}/>}></Route>
          <Route path='coinlist:category' element={<CoinList />}></Route>
          <Route path='coinlist' element={<CoinList/>}></Route>
          <Route path='coinDescription:id' element={<CoinDescription />}></Route>
        </Routes>
    </div>
  )
}

export default App;