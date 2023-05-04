import '../css/Home.css'
import baloot_img from '../images/baloot.png';
import search_img from '../images/search.png';
import switch_off from '../images/switch.png';
import switch_on from '../images/green_switch.png';
import {getCommodities} from "./utilities";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Home(props) {
    const commodities = getCommodities();

    const navigate = useNavigate();

    let searchedCommodities = [];
    let filteredCommodities = [];
    let sortedCommodities = [];
    let loggedInUser = props.loggedIn;
    let isLoggedIn = loggedInUser != '' ? true : false;

    const [isFiltered, setIsFiltered] = useState(false);
    const [sortBy, setSortBY] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searched, setSearched] = useState('');
    const [pageId, setpPgeId] = useState(1);
    const [searchType, setSearchType] = useState('name');


    const handleInput = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSearchType(event.target.value);
    };

    if (searched != '') {
        console.log(searchType + ' ' + searched);
        if (searchType != "category") searchedCommodities = [...commodities].filter(commodity => commodity[searchType] == searched);
        else searchedCommodities = [...commodities].filter(commodity => commodity.categories.includes(searched));
    } else {
        searchedCommodities = commodities;
    }

    if (isFiltered) {
        console.log(searchedCommodities.length + 'is')
        filteredCommodities = [...searchedCommodities].filter(commodity => commodity.inStock > 0);
    } else {
        filteredCommodities = searchedCommodities;
    }

    if (sortBy == 'name') {
        sortedCommodities = [...filteredCommodities].sort((a, b) => a.name.localeCompare(b.name));
    } else {
        sortedCommodities = [...filteredCommodities].sort((a, b) => a.price - b.price);
    }

    // console.log(sortedCommodities.length);

    const arrays = [];
    for (let i = 0; i < sortedCommodities.length; i += 4) {
        const sliceSize = i + 4 <= sortedCommodities.length ? 4 : sortedCommodities.length - i;
        arrays.push(sortedCommodities.slice(i, i + sliceSize));
    }


    return (
        <div>
            <div className="searchbar">
                <img className="baloot_image" src={baloot_img} alt="not found" onClick={() => navigate('/')}/>
                <div className="baloot_text">
                    Baloot
                </div>
                <div className="search_bar"></div>
                <input type="text" className="default_text default_input" placeholder="search you product ..."
                       value={searchValue} onChange={handleInput}/>
                <select className="search_option_box" value={searchType} onChange={handleSelectChange}>
                    <option value="name" className="search_option"> name</option>
                    <option value="category" className="search_option"> category</option>
                    <option value="providerId" className="search_option"> provider id</option>
                </select>
                <div className="search_icon_box">
                    <img src={search_img} alt="not found" className="search_icon"
                         onClick={() => setSearched(searchValue)}/>
                </div>
                { !isLoggedIn ?
                    <>
                        <div className="register "></div>
                        <div className="register_text" onClick={() => navigate('/register')}> register</div>
                        <div className="login"></div>
                        <div className="login_text" onClick={() => navigate('/login')}> login</div>
                    </> :
                    <>
                        <div className="user_name" onClick={() => navigate('/user/' + props.loggedIn)}>
                            {props.loggedIn}
                        </div>
                        <div className="cart_box" onClick={() => navigate('/user/' + props.loggedIn)}></div>
                        <div className="cart">
                            Cart
                        </div>
                        <div className="cart_quality"> 0</div>
                    </>
                }
            </div>
            <div className="sort_header"></div>
            <div className="available_sort">
                Available commodities
            </div>
            <img className="switch" src={!isFiltered ? switch_off : switch_on} alt="not found"
                 onClick={() => setIsFiltered(!isFiltered)}/>
            <div className="sort_by">
                sort by:
            </div>

            {sortBy != 'name' ?
                <div>
                    <div className="name" onClick={() => setSortBY('name')}>name</div>
                    <div className="price_box"></div>
                    <div className="price_text"> price</div>
                </div>
                :
                <div>
                    <div className="name_text">name</div>
                    <div className="name_box"></div>
                    <div className="price" onClick={() => setSortBY('price')}> price</div>
                </div>
            }

            <div className="home_commodities_box">
                <table className="commodity_table">
                    <tr>
                        {pageId * 3 - 3 < arrays.length && MapCommodities(arrays[pageId * 3 - 3], navigate)}
                    </tr>
                    <tr>
                        <td className="height_diff"></td>
                    </tr>
                    <tr>
                        {pageId * 3 - 2 < arrays.length && MapCommodities(arrays[pageId * 3 - 2], navigate)}
                    </tr>
                    <tr>
                        <td className="height_diff"></td>
                    </tr>
                    <tr>
                        {pageId * 3 - 1 < arrays.length && MapCommodities(arrays[pageId * 3 - 1], navigate)}
                    </tr>
                </table>
            </div>
            <div className="page">
                {Array.from({length: 6}, (_, index) => index + 1).map(pageNumber => (
                    <div key={pageNumber} onClick={() => setpPgeId(pageNumber)} style={{
                        display: "inline-block",
                        height: "32px",
                        width: "32px",
                        textAlign: "center",
                        padding: "4px",
                        margin: "4px"
                    }}>
                        {pageNumber}
                    </div>))}
            </div>

            <footer className="footer">
                2023@UT
            </footer>
        </div>
    );

}
// mapCommodities
export function MapCommodities(comms , navigate) {
    // const navigate = useNavigate();
    // onClick={() => navigate('/product/' + commodity.id)}
    const commodityElements = comms.map(commodity => (
        <>
            <td className="product_td grid_class" onClick={() => navigate('/product/' + commodity.id)} >
                <div className="product_text">
                    <span className="product_title"> {commodity.name} </span> <br/>
                    <span className="product_left"> {commodity.inStock + ' left in stock'} </span>
                </div>
                <div className="image_size">
                    <img src={commodity.image} className="image_scale"/>
                </div>
                <div className="price_tag">
                    {commodity.price + '$'}
                </div>
                {/*////////stopPropagation()*/}
                <div className="add_to_cart" onClick={(event) => event.stopPropagation()}>
                    Add To Cart
                </div>
            </td>
            <td className="product_gap"></td>
        </>
    ));
    return commodityElements;
}



