import '../css/product.css'
import {getComments, getCommodities, getProviders, getSuggestions, getUsers} from "./utilities";
import {useNavigate, useParams} from "react-router-dom";
import baloot_img from '../images/baloot.png'
import star_img from '../images/star.png'
import stars_img from '../images/stars.png'
import dot_img from '../images/dot.png'
import like_img from '../images/like.png'
import dislike_img from '../images/dislike.png'
import {useEffect, useState} from "react";
import {MapCommodities} from "./Home";

export default function Product(props) {
    const [commodities, setCommodities] = useState([]);
    useEffect(() => {
        getCommodities().then((commodities) => {
            setCommodities(commodities);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [providers, setProviders] = useState([]);
    useEffect(() => {
        getProviders().then((providers) => {
            setProviders(providers);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    const comments = getComments();
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        getSuggestions(id).then((suggestions) => {
            setSuggestions(suggestions);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    // const ratings = getRatings();
    const {id} = useParams();
    const navigate = useNavigate();

    let product = commodities.find(commodity => commodity?.id == id);
    let provider = providers.find(provider => provider.id == product?.providerId);
    let productComments = [...comments].filter(comment => comment.commodityId == id);


    const [opinionValue, setOpinionValue] = useState('');

    const arrays = [];
    for (let i = 0; i < suggestions?.length; i += 4) {
        const sliceSize = i + 4 <= suggestions.length ? 4 : suggestions?.length - i;
        arrays.push(suggestions.slice(i, i + sliceSize));
    }

    // useEffect(() => {
    //     if (props.loggedIn=='') {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <>
            <div className="product_searchbar">
                <img className="product_baloot_image" src={baloot_img} alt="not found" onClick={() => navigate('/')}/>
                <div className="product_baloot_text">
                    Baloot
                </div>
                <div className="user_name" onClick={() => navigate('/user/' + props.loggedIn)}>
                    {props.loggedIn}
                </div>
                <div className="cart_box" onClick={() => navigate('/user/' + props.loggedIn)}></div>
                <div className="cart">
                    Cart
                </div>
                <div className="cart_quality"> 0</div>
            </div>
            <div className="padding123"></div>
            <div className="product_grid grid_size">
                <div className="grid_1_9">
                    <img src={product?.image}
                         className="image1"/>
                </div>
                <div className="grid_1_2">
                    <span className="p_title"> {product?.name}</span>
                    <span className="instock"> {product?.inStock + ' left'}</span>
                    <div className="box1">
                        <img src={star_img} className="size1"/>
                        <span className="rating1">{product?.rating}</span>
                        <span className="rating_num">(12)</span>
                    </div>
                </div>
                <div className="grid_2_3">
                    <span className="provider_by">by</span>
                    <span className="provider" onClick={() => navigate('/provider/' + provider?.id)}> {provider?.name}</span>
                    <br/> <br/>
                    <span className="categories">Category(s)</span>
                </div>

                <div>
                    <ul>
                        {product?.categories.map((category, index) => (
                            <li key={index} className="category">
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="box2">
                    <span className="price1">{product?.price + '$'}</span>
                    {product?.inStock > 0 && <span className="add">add to cart</span>}
                </div>

                <div className="grid2">
                    <div className="rate_now">
                        rate now
                    </div>
                    <div className="grid_1_1">
                        <img src={stars_img} className="star"/>
                        <img src={stars_img} className="star"/>
                    </div>
                    <div className="submit_box">
                        <span className="submit_text">submit</span>
                    </div>
                </div>

                <div className="grid_9_10">
        <span className="comments">
            Comments
            <span className="comment_num">{' (' + productComments.length + ')'}</span>
        </span>
                </div>
                {productComments.length > 0 &&
                    <div className="grid_10_11">
                        <div className="awesome">
                            {productComments[0].text}
                        </div>
                        <div className="comment_box_1">
                            <span className="date1">{productComments[0].date}</span>
                            <span className="padding40"> <img src={dot_img}/> {'   ' + props.loggedIn} </span>
                            {/*<span className="name">#username</span>*/}
                        </div>
                        <div className="grid2to3">
                            <span className="helpful">Is this comment helpful?</span>
                            <span className="padding10">{productComments[0].like}</span>
                            <span> <img src={like_img} className="pic_size1"/></span>
                            <span className="padding10">{productComments[0].dislike}</span>
                            <span><img src={dislike_img} className="pic_size1"/></span>
                        </div>
                    </div>
                }
                {productComments.length > 1 &&
                    <div className="grid_11_12">
                        <div className="awesome">
                            {productComments[1].text}
                        </div>
                        <div className="comment_box_1">
                            <span className="date1">{productComments[1].date}</span>
                            <span className="padding40"> <img src={dot_img}/> {'   ' + props.loggedIn} </span>
                            {/*<span className="name">#username</span>*/}
                        </div>
                        <div className="grid2to3">
                            <span className="helpful">Is this comment helpful?</span>
                            <span className="padding10">{productComments[1].like}</span>
                            <span> <img src={like_img} className="pic_size1"/></span>
                            <span className="padding10">{productComments[1].dislike}</span>
                            <span><img src={dislike_img} className="pic_size1"/></span>
                        </div>
                    </div>
                }

                <div className="grid_12_14">
                    <div className="opinion"> Submit your opinion</div>
                    <textarea className="opinion_box date1" value={opinionValue}
                              onChange={(event) => setOpinionValue(event.target.value)}></textarea>
                    <span className="opinion_submit">
                        submit
                    </span>
                </div>
            </div>


            {suggestions?.length > 0 &&
                <>
                    <div className="might_like">
                        You also might like...
                    </div>

                    <div className="commodities_box">
                        <table className="commodity_table">
                            <tr>
                                { arrays.length > 0 && MapCommodities(arrays[0], navigate) }
                            </tr>
                        </table>
                    </div>
                </>
            }

            <footer className="product_footer">
                2023@UT
            </footer>
        </>
    );
}
