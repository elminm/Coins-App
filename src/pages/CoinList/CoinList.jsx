import {useParams} from 'react-router-dom';
import Header from "../../components/Header/Header";
import './CoinList.css';
import { useEffect, useState } from "react";
import CoinItem from '../../components/Coin/CoinItem';
import { useDispatch, useSelector } from 'react-redux';

function CoinList(){

    const params = useParams();

    const {data, coinList} = useSelector(state => state);


    const dispatch = useDispatch();



    useEffect(
        function(){
            if(params.category){
                let filteredForCategory = data.filter(
                    element => element.tableData.category === params.category
                )
                dispatch({
                    type : "Exclusive coins",
                    payload : filteredForCategory
                })
            }
        }, []
    )

    function propFunc(arr){

    }

    return(
        <div className="coins">
            <div className="container">
                <Header propFunc={propFunc} breadcrumbs={true}/>            
                <div className="coins-grid">
                 {coinList &&  coinList.map(element => <CoinItem key={element.id} data={element}/>)}
                </div>
            </div>                     
        </div>
    )
}

export default CoinList;