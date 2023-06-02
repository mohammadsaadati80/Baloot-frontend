import { suggestions, comments} from "./data";
import axios from 'axios';

async function getCommodities() {
    // console.log(parseJSON(commodities));
    // return parseJSON(commodities);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/commodities', {
            headers: {
                Authorization: jwtToken
            }
        });
        const comms = response.data;
        const arrayOfObjects = Object.keys(comms).map(key => {
            return {id: key, ...comms[key]};
        });
        console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getCommodities};

async function getUsers() {
    // return parseJSON(users);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/users', {
            headers: {
                Authorization: jwtToken
            }
        });
        const users = response.data;
        const arrayOfObjects = Object.keys(users).map(key => {
            return {id: key, ...users[key]};
        });
        console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getUsers};

async function getProviders() {
    // return parseJSON(providers);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/providers', {
            headers: {
                Authorization: jwtToken
            }
        });
        const providers = response.data;
        const arrayOfObjects = Object.keys(providers).map(key => {
            return {id: key, ...providers[key]};
        });
        //console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getProviders};

async function getHistory() {
    // return parseJSON(providers);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/purchasedlist', {
            headers: {
                Authorization: jwtToken
            }
        });
        const history = response.data;
        const arrayOfObjects = Object.keys(history).map(key => {
            return {id: key, ...history[key]};
        });
        //console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getHistory};

// async function getComments(_commodityId) {
//     const formData = {
//         commodityId: _commodityId
//     };
//     try {
//         const response = await axios.post('http://localhost:8080/comment', formData);
//         const comments = response.data;
//         const arrayOfObjects = Object.keys(comments).map(key => {
//             return {id: key, ...comments[key]};
//         });
//         console.log(arrayOfObjects);
//         return arrayOfObjects;
//     } catch (error) {
//         console.log(error);
//     }
// }
async function getComments(_commodityId) {
    // return parseJSON(comments);
    const formData = {
        commodityId: _commodityId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/comments', formData, {
            headers: {
                Authorization: jwtToken
            }
        });
        const providers = response.data;
        const arrayOfObjects = Object.keys(providers).map(key => {
            return {id: key, ...providers[key]};
        });
        //console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }

}

export {getComments};

async function temp_comment (_commodityId) {
    const formData1 = {
        commodityId: _commodityId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/comments', formData1, {
            headers: {
                Authorization: jwtToken
            }
        });
        const providers = response.data;
        const arrayOfObjects = Object.keys(providers).map(key => {
            return {id: key, ...providers[key]};
        });
        console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}
export {temp_comment};


async function getSuggestions(_commodityId) {
    // return parseJSON(suggestions);
    const formData = {
        commodityId: _commodityId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/buylist/suggestion', formData, {
            headers: {
                Authorization: jwtToken
            }
        });
        const providers = response.data;
        const arrayOfObjects = Object.keys(providers).map(key => {
            return {id: key, ...providers[key]};
        });
        //console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }

}

export {getSuggestions};

async function getBuyList() {
    // return parseJSON(providers);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/buylist', {
            headers: {
                Authorization: jwtToken
            }
        });
        const buyList = response.data;
        const arrayOfObjects = Object.keys(buyList).map(key => {
            return {id: key, ...buyList[key]};
        });
        //console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getBuyList};



// export function getRatings() {
//     return parseJSON(suggestions);
// }

export const parseJSON = (jsonData) => {
    try {
        const data = JSON.parse(jsonData);
        if (Array.isArray(data)) {
            return data;
        } else if (typeof data === 'object') {
            return [data];
        } else {
            console.error('JSON data is not an array or object:', data);
            return [];
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return [];
    }
};

async function login(_username, _password) {
    const formData = {
        username: _username,
        password: _password
    };
    try {
        const response = await axios.post('http://localhost:8080/login', formData);
        console.log(1234);
        console.log(response.headers);
        const data = {
            token: response.headers.token,
            username: response.headers.username
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export {login};

async function addToCart(_ID) {
    const data = {
        commodityId: _ID.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/commodity/add_to_buylist', data, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {addToCart};

async function addUser(_username, _address, _birthDate, _email, _password) {
    const data1 = {
        username: _username.toString(),
        address : _address.toString(),
        birthDate : _birthDate.toString(),
        email : _email.toString(),
        password : _password.toString()
    };
    console.log(data1);
    try {
        const response = await axios.post('http://localhost:8080/signup', data1); //signup
    } catch (error) {
        console.log(error);
    }
}

export {addUser};

async function rateComm(_commodityId, _username, _score) {
    const data1 = {
        commodityId: _commodityId.toString(),
        username: _username.toString(),
        score: _score.toString()
    };
    console.log(data1);
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/commodity/rate', data1, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {rateComm};

async function addCredit(_creditValue) {
    const data1 = {
        creditValue: _creditValue
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/addcredit/', data1, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {addCredit};

async function logout() {
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/logout', {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {logout};


async function getPrice() {
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/buylist/total_price', {
            headers: {
                Authorization: jwtToken
            }
        });
        const buyList = response.data;
        const arrayOfObjects = Object.keys(buyList).map(key => {
            return {id: key, ...buyList[key]};
        });
        // console.log(arrayOfObjects);
        return buyList;
    } catch (error) {
        console.log(error);
    }
}

export {getPrice};

async function getDiscountPrice() {
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/buylist/total_price_with_discount', {
            headers: {
                Authorization: jwtToken
            }
        });
        const buyList = response.data;
        const arrayOfObjects = Object.keys(buyList).map(key => {
            return {id: key, ...buyList[key]};
        });
        return buyList;
    } catch (error) {
        console.log(error);
    }
}

export {getDiscountPrice};

async function addDiscount(_discount) {
    const data1 = {
        discount: _discount
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/buylist/discount', data1, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {addDiscount};

async function payBuyList() {
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/buylist/payment', {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export {payBuyList};

async function addLike(_commentId) {
    const data = {
        commentId: _commentId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/comment/like', data, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}
export {addLike};

async function addDislike(_commentId) {
    const data = {
        commentId: _commentId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/comment/dislike', data, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}
export {addDislike};

async function addComment(_commodityId, _text) {
    const data = {
        commodityId: _commodityId.toString(),
        text: _text.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/commodity/add_comment', data, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}
export {addComment};

async function removeCommodity(_commodityId) {
    const data = {
        commodityId: _commodityId.toString()
    };
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8080/buylist/remove_from_buylist', data, {
            headers: {
                Authorization: jwtToken
            }
        });
    } catch (error) {
        console.log(error);
    }
}
export {removeCommodity};

async function getCurrentUser() {
    try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/get_userss', {
            headers: {
                Authorization: jwtToken
            }
        });
        console.log("current is");
        console.log(response.data);
        return(response.data);
    } catch (error) {
        console.log(error);
    }
}
export {getCurrentUser};

async function callbackAPI(_code) {
    const data = {
        code: _code.toString()
    };
    try {
        const response = await axios.post('http://localhost:8080/callback/?code=' + _code);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
export {callbackAPI};

