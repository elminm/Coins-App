import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";

// Orxan Babayev

function Header({propFunc, breadcrumbs }) {

    const dispatch = useDispatch();

    // selector data 
    const data = useSelector(state => state.data);

    // Refs
    const inputRef = useRef();
    const countrySelectRef = useRef();
    const compositionSelectRef = useRef();
    const qualitySelectRef = useRef();
    const PriceFromInputRef = useRef();
    const PriceToInputRef = useRef();
    const YearFromInputRef = useRef();
    const YearToInputRef = useRef();

    // States
    const [filter, setFilter] = useState(false);
    const [countrylist, setCountryList] = useState([]);
    const [compositionlist, setCompositionList] = useState([]);
    const [qualityList, setQualityList] = useState([]);
   
    // Arrays
    let countryArr = [];
    let compositionArr = [];
    let qualityArr = [];
    
    useEffect(
        function () {
            data.map(
                item => (
                    countryArr.push(item.tableData["Issuing Country"].toLocaleUpperCase()),
                    compositionArr.push(item.tableData["Composition"].toLocaleUpperCase()),
                    qualityArr.push(item.tableData["Quality"].toLocaleUpperCase())
                )
            )
            function Replay(country, setStatePar) {
                let uniqueArray = country.filter(function (item, pos) {
                    return country.indexOf(item) == pos;
                })
                uniqueArray.sort();
                uniqueArray.unshift("All")
                setStatePar(uniqueArray)
            }
            Replay(countryArr, setCountryList);
            Replay(compositionArr, setCompositionList);
            Replay(qualityArr, setQualityList);

        }, []
    )


    function handleFilter() {
        setFilter(!filter);
    }

    const navigate = useNavigate();

    function handleCLick(event) {
        navigate("/coinlist");
        event.preventDefault();

        let value = inputRef.current.value.toLocaleLowerCase();
        if (!filter) {
            let filtered = data && data.filter(filterItem => filterItem.name.toLocaleLowerCase().includes(value));
 
            propFunc && propFunc(filtered);

            dispatch({
                type : "FILTERED",
                payload : filtered
            })

        }
        else{

            let countrySelectValue = countrySelectRef.current.value;
            let compositionSelectValue = compositionSelectRef.current.value;
            let qualitySelectValue = qualitySelectRef.current.value;     

            const PriceFromInputRefValue = +PriceFromInputRef.current.value;
            const PriceToInputRefValue = +PriceToInputRef.current.value;
            const YearFromInputRefValue = +YearFromInputRef.current.value;
            const YearToInputRefValue =  +YearToInputRef.current.value;
   
            let filteredBySelect = data.filter(
                    function(filterItem){
                        // filter items 
                        let filterItemCountry = filterItem.tableData["Issuing Country"].toLocaleUpperCase();
                        let filterItemComposition = filterItem.tableData["Composition"].toLocaleUpperCase();
                        let filterItemQuality = filterItem.tableData["Quality"].toLocaleUpperCase();
                        let filterItemYear = +filterItem.tableData["Year"].toLocaleUpperCase();
                        let filterItemPrice = filterItem.tableData["Price"].toLocaleUpperCase();
                        let indexOf$ = filterItemPrice.indexOf("$");
                        let filterItemPriceSliced = +filterItemPrice.slice(0, indexOf$);

                        // Conditions
                        let nameCondition = filterItem.name.toLocaleLowerCase().includes(value);
                        
                        let countryCondition = countrySelectValue !== "All" ? filterItemCountry == countrySelectValue : filterItem;
                        let compositionCondition = compositionSelectValue !== "All" ? filterItemComposition == compositionSelectValue : filterItem;
                        let qualityCondition  = qualitySelectValue !== "All" ?  filterItemQuality== qualitySelectValue : filterItem;
                        let priceFromCondition = PriceFromInputRefValue !==0 ?  PriceFromInputRefValue <= filterItemPriceSliced : filterItem;
                        let priceToCondition = PriceToInputRefValue !==0  ? PriceToInputRefValue >= filterItemPriceSliced : filterItem;
                        let yearFromCondition = YearFromInputRefValue !== 0 ? YearFromInputRefValue <= filterItemYear  : filterItem;
                        let yearToCondtion = YearToInputRefValue !== 0 ? YearToInputRefValue >= filterItemYear : filterItem;
                        
                        console.log(YearFromInputRefValue, YearToInputRefValue)

                        return nameCondition && countryCondition && compositionCondition && qualityCondition && priceFromCondition && priceToCondition  && yearFromCondition && yearToCondtion;
                    }
                )
                
                propFunc && propFunc(filteredBySelect);

                dispatch({
                    type : "ADVANCED FILTERED",
                    payload : filteredBySelect
                })
            
        }

    }


    function handleSubmit(event) {;
        
    }


    return (
        <header className="header">
            <h2 className="page-title">{breadcrumbs ? "List of the coins" : "Homepage"}</h2>
            {breadcrumbs && <div className="breadcrumbs"><Link to={"/"}>Homepage</Link> — List of the coins</div>}
            <form action="" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <div className="form-block">
                        <label htmlFor="search">Input field</label>
                        <div className="form-row">
                            <input type="text" id="search" ref={inputRef} /> <Link onClick={handleCLick} className="search-btn">Search</Link>
                        </div>
                        <a href="#" className="advanced-filter" onClick={handleFilter}>Advanced filter {filter ? <IoIosArrowUp className="arrowUp" /> : <IoIosArrowDown className="arrowDown" />}</a>
                    </div>
                </div>
                {filter && (
                    <div className="form-body">
                        <div>
                            <div className="form-block">
                                <div className="form-row">
                                    <div className="row-left">
                                        <label htmlFor="country">Issuing country</label>
                                        <select ref={countrySelectRef} name="" id="country">
                                            {countrylist.map((item, index) =>
                                                <option key={index} value={item}>{item}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row-right">
                                        <label htmlFor="priceFrom">Price</label>
                                        <div className="row-right-block">
                                            <div className="from-wr">
                                                <span className="from">from</span>
                                                <input type="number" name="from" id="priceFrom" ref={PriceFromInputRef} />
                                            </div>
                                            <div className="to-wr">
                                                <span className="to">to</span>
                                                <input type="number" name="to" id="priceTo" ref={PriceToInputRef} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="form-block">
                                <div className="form-row">
                                    <div className="row-left">
                                        <label htmlFor="composition">Metal</label>
                                        <select name="" id="composition" ref={compositionSelectRef}>
                                            {compositionlist.map((item, index) =>
                                                <option key={item} value={item}>{item}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="row-right">
                                        <label htmlFor="yearFrom ">Year of issue</label>
                                        <div className="row-right-block">
                                            <div className="from-wr">
                                                <span className="from">from</span>
                                                <input type="number" name="from" id="yearFrom" ref={YearFromInputRef} />
                                            </div>
                                            <div className="to-wr">
                                                <span className="to">to</span>
                                                <input type="number" name="to" id="yearTo" ref={YearToInputRef} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-block">
                                <div className="form-row">
                                    <div className="row-left">
                                        <label htmlFor="quality">Quality of the coin</label>
                                        <select ref={qualitySelectRef} name="" id="quality" >
                                            {qualityList.map((item, index) =>
                                                <option key={index} value={item}>{item}</option>
                                            )}
                                        </select>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </form>
        </header>
    )
}

export default Header;