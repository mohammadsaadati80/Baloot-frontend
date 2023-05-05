import {useNavigate, useParams} from "react-router-dom";
import {getCommodities, getSuggestions, getUsers, getBuyList, getHistory, addCredit} from "./utilities";
import '../css/user.css'
import baloot_img from '../images/baloot.png'
import person_img from "../images/person.png"
import mail_img from "../images/mail.png"
import calender_img from "../images/calender.png"
import location_img from "../images/location.png"
import dollar_img from "../images/dollar.png"
import cart_img from "../images/cart.png"
import history_img from "../images/history.png"
import {useEffect, useState} from "react";

export default function (props) {
    const {name} = useParams();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    const [amount, setAmount] = useState(0);
    const [buyList, setBuyList] = useState([]);
    useEffect(() => {
        getBuyList().then((buyList) => {
            setAmount(buyList.length);
            setBuyList(buyList.slice(0,2));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const navigate = useNavigate();
    //
    const [historyList, setHistoryList] = useState([]); 
    useEffect(() => {
        getHistory().then((historyList) => {
            setHistoryList(historyList.slice(0,5));
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    //
    const [creditValue, setCreditValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    let user = users.find(user => user.username == name);

    useEffect(() => {
        if (props.loggedIn=='') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <div className="user_searchbar">
                <img className="user_baloot_image" src={baloot_img} alt="not found" onClick={() => navigate('/')}/>
                <div className="user_baloot_text">
                    Baloot
                </div>
                <div className="user_name">
                    {user?.username}
                </div>
                <div className="cart_box"></div>
                <div className="cart">
                    Cart
                </div>
                <div className="cart_quality"> {amount}</div>
            </div>
            <div className="person_box">
            </div>
            <div>
                <img src={person_img} className="picture1"/>
            </div>
            <div className="u_name person_font">{user?.username}</div>

            <div>
                <img src={mail_img} className="picture2"/>
            </div>
            <div className="mail person_font">{user?.email}</div>

            <div>
                <img src={calender_img} className="picture3"/>
            </div>
            <div className="date person_font">{user?.birthDate.substr(0, 10)}</div>
            <div>
                <img src={location_img} className="picture4"/>
            </div>
            <div className="location person_font">{user?.address}</div>
            <div className="log_out"> Log out</div>
            <div>
                <img src={dollar_img} className="picture5"/>
            </div>
            <div className="credit">
                {user?.credit}
            </div>
            <div className="credit_box">
            </div>
            <input type="text" className=" credit_box amount" placeholder="$amount" value={creditValue}
                   onChange={(event) => setCreditValue(event.target.value)}/>
            {/*class: amount $amount</input>*/}
            <div className="add_box12">
            </div>
            <div className="add_text12" onClick={() => setConfirmModal(true)}>Add More Credit</div>
            <div>
                <img src={cart_img} className="cart_pic"/>
            </div>
            <div className="cart_text">Cart</div>
            {confirmModal &&
            <>
                <div className="modal_body"></div>
                <div className="confirm_button" onClick={() =>{
                    addCredit(creditValue);
                    setCreditValue('0');
                    setConfirmModal(false);
                } }>Confirm</div>
                <div className="close" onClick={() => setConfirmModal(false)}>close</div>
            </>
            }


            <table className="table1">
                <thead>
                <tr className="tr1">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Provider ID</th>
                    <th>Rating</th>
                    <th>In Stock</th>
                    <th>In Cart</th>
                </tr>
                </thead>
                <tbody>

                {buyList.map(commodity => (
                    <>
                        <tr className="tr2">
                            <td><img src={commodity.image} className="image_size1"/></td>
                            <td>{commodity.name}</td>
                            <td>{commodity.categories.join()}</td>
                            <td>{commodity.price}</td>
                            <td>{commodity.providerId}</td>
                            <td className="rate1">{commodity.rating}
                            </td>
                            <td className="inStock1"> {commodity.inStock}
                            </td>
                            <td className="relative">
                                <div className="quality_add">
                                    <span> - </span>
                                    <span className="padding1"> 1 </span>
                                    <span className="padding1"> + </span>
                                </div>
                            </td>
                        </tr>
                    </>

                ))
                }
                <tr className="last_tr">
                    <td className="last_tr">
                        <div className="add_box ">
                            {/*pos1*/}
                            {/*buyList.length>0 &&*/}
                            <div className="add_text" onClick={() =>  setIsOpen(true)}>Pay now!</div>
                            {/*pos2*/}
                        </div>
                    </td >
                </tr>

                </tbody>
            </table>


            <div>
                <img src={history_img} className="history_pic"/>
            </div>
            <div className="history_text">History</div>

            <table className="table2">
                <thead>
                <tr className="tr3">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Provider ID</th>
                    <th>Rating</th>
                    <th>In Stock</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {historyList.map(commodity => (
                    <>
                        <tr className="tr4">
                            <td><img src={commodity.image} className="image_size1"/></td>
                            <td>{commodity.name}</td>
                            <td>{commodity.categories.join()}</td>
                            <td>{commodity.price}</td>
                            <td>{commodity.providerId}</td>
                            <td className="rate1">{commodity.rating}
                            </td>
                            <td className="inStock1"> {commodity.inStock}
                            </td>
                            <td>
                                1
                            </td>
                        </tr>
                    </>

                ))
                }

                </tbody>
            </table>

            {isOpen &&
            <>
                <div className="modal_body"></div>
                <div className="your_cart"> Your cart</div>
                <div className="pay_name"> {'.    ' +buyList[0]?.name + '  *   1'}</div>
                <div className="pay_price"> {buyList[0]?.price + '$'}</div>
                <div className="pay_name_total"> {'.    ' +buyList[0]?.name + '  *   1'} </div>
                <div className="pay_rest">other products ...</div>
                <div className="pay_price_total"> {buyList[0]?.price + '$'}</div>
                <textarea className="pay_box"></textarea>
                <div className="pay_discount_submit">Submit</div>
                <div className="total">total</div>
                <div className="total_price"> {buyList[0]?.price + '$'}</div>
                <div className="with_discount">with discount</div>
                <div className="with_discount_price"> {buyList[0]?.price + '$'}</div>
                <div className="close" onClick={() => setIsOpen(false)}>close</div>
                <div className="buy">Buy</div>
            </>
            }


            <footer className="user_footer">
                2023@UT
            </footer>
        </>
    );
}