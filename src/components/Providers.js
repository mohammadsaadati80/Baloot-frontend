import baloot_img from "../images/baloot.png";
import '../css/product.css'
import {useNavigate, useParams} from "react-router-dom";
import {getBuyList, getCommodities, getProviders} from "./utilities";
import {MapCommodities} from "./Home";
import {useEffect, useState} from "react";

export default function Providers(props) {
    
    const {id} = useParams();
    const [providers, setProviders] = useState([]);
    useEffect(() => {
        getProviders().then((providers) => {
            setProviders(providers);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [commodities, setCommodities] = useState([]);
    useEffect(() => {
        getCommodities().then((commodities) => {
            setCommodities(commodities);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [buyList, setBuyList] = useState([]);
    useEffect(() => {
        getBuyList().then((buyList) => {
            setBuyList(buyList);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const navigate = useNavigate();

    let provider = providers.find(provider => provider?.id == id);
    let products = [...commodities].filter(commodity => commodity?.providerId == id);

    const arrays = [];
    for (let i = 0; i < products?.length; i += 4) {
        const sliceSize = i + 4 <= products?.length ? 4 : products?.length - i;
        arrays.push(products.slice(i, i + sliceSize));
    }

    useEffect(() => {
        if (localStorage.getItem("username") == null) {
            navigate('/login');
        }
    }, [navigate]);

    console.log(provider);

    return (
        <>
            <div className="product_searchbar">
                <img className="product_baloot_image" src={baloot_img} alt="not found" onClick={() => navigate('/')}/>
                <div className="product_baloot_text">
                    Baloot
                </div>
                <div className="user_name" onClick={() => navigate('/user/' + localStorage.getItem("username"))}>
                    {localStorage.getItem("username")}
                </div>
                <div className="cart_box" onClick={() => navigate('/user/' + localStorage.getItem("username"))}></div>
                <div className="cart">
                    Cart
                </div>
                <div className="cart_quality"> {buyList.length}</div>
            </div>
            <div className="padding123"></div>
            <img className="provider_pic" src={provider?.image}/>
            <div className="since">{'since ' + provider?.registryDate.split('-')[0]}</div>
            <div className="provider_title">{provider?.name}</div>
            <div className="all_provided"> All provided commodities</div>

            <div className="commodities_box2">
                <table className="commodity_table">
                    <tr>
                        {arrays.length > 0 && MapCommodities(arrays[0], navigate)}
                    </tr>
                    <tr>
                        <td className="height_diff"></td>
                    </tr>
                    <tr>
                        {arrays.length > 1 && MapCommodities(arrays[1], navigate)}
                    </tr>
                </table>
            </div>
            {arrays.length > 1 ?
                <footer className="provider_footer">
                    2023@UT
                </footer>
                :
                <footer className="provider_footer footer_top2">
                    2023@UT
                </footer>
            }
        </>
    );
}