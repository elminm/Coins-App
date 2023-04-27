import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CoinDescription.css';

function CoinDescription() {
    const params = useParams();
    const {data} = useSelector(state => state);
    const [dataArr, setDataArr] = useState([]);

    useEffect(
        function () {
            if (params.id) {
                const filteredForId = data.filter(item => item.id == params.id);
                setDataArr(filteredForId);
            }
        }, []
    )
    return (
        <div className="coin-description-container">
            <div className="container">
                <div className="coin-description-wr">
                    {dataArr && dataArr.map(element => (
                        <React.Fragment key={element.id}>
                            <div className="left">
                                <img src={element.tableData.imgUrlFront} className="coin-img" alt="" />
                                <img src={element.tableData.imgUrlBack} alt="" />
                            </div>
                            <div className="right">
                                <div className="coin-description">
                                    <h4 className="title">{element.name}</h4>
                                    {Object.keys(element.description).map(
                                        item => (
                                            <p key={item} className={`paragraph ${item}`}>
                                                {element.description[`${item}`]}
                                            </p>
                                        )
                                    )}
                                    <table className='table-description'>
                                        <tbody>
                                            {Object.keys(element.tableData).slice(0, Object.keys(element.tableData).length - 3).map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{item}</td>
                                                        <td>{element.tableData[`${item}`]}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <Link className='back' to={"/coinList"}>Back to the list</Link>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoinDescription;