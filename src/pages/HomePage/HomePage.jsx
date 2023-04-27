import React from 'react';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';


function HomePage({ headerPropFunc}) {
    
    function propFunc(arr){
        headerPropFunc(arr);
    }

    return (
        <div className='homepage'>
            <div className="container">
                <Header propFunc={propFunc}></Header>
                <Categories ></Categories>
            </div>
        </div>
    )
}

export default HomePage;