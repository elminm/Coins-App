import { useSelector } from 'react-redux';
import Category from '../Category/Category';
import './categories.css';

function Categories(){

    const {data} = useSelector(state => state);

    const exclusive_Coin_Index = data.findIndex(filterItem => filterItem.tableData.category === "Exclusive coins");
    const commemorative_Coin_Index = data.findIndex(filterItem => filterItem.tableData.category === "Commemorative coins");
    const bullion_Coin_index = data.findIndex(filterItem => filterItem.tableData.category === "Bullion coins");

    return(
        <div className="categories">
            <Category dataItem = {data[bullion_Coin_index]} />
            <Category dataItem = {data[exclusive_Coin_Index]} />
            <Category dataItem = {data[commemorative_Coin_Index] }/>
        </div>
    )
}

export default Categories;