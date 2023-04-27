import { Link } from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';
import "./category.css";

function Category({dataItem}){
    return(
        <div className="category">
            <h4>{dataItem.tableData.category}</h4>
            <Link to={`/coinlist${dataItem.tableData.category}`}className="show-all">Show all <MdOutlineKeyboardArrowRight/></Link>
            <img src={dataItem.tableData.imgUrlFront} alt="catogory image" />
        </div>
    )
}

export default Category;