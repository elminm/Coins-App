import { Link } from 'react-router-dom';
import './CoinItem.css';

function CoinItem({ data }) {
    return (
        <div className="coin">
            <div className="coin-left">
                <Link to={`/coinDescription${data.id}`}><img src={data.tableData.imgUrlFront} alt="Coin Image" /></Link>
            </div>
            <div className="coin-right">
                <h4 className='coin-title'>
                    {data.name}
                </h4>
                <p className='coin-paragraph'>{data.description.firstParagraph} <br /></p>
                <mark>{data.tableData.Price}</mark> <br /> <br />
                <mark>{data.tableData.Year}</mark>    <br /> <br />    
                <mark>{data.tableData.category}</mark>         
            </div>
        </div>
    )
}

export default CoinItem;