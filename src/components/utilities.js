import { suggestions, comments} from "./data";
import axios from 'axios';

async function getCommodities() {
    // console.log(parseJSON(commodities));
    // return parseJSON(commodities);
    try {
        const response = await axios.get('http://localhost:8080/commodities');
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
        const response = await axios.get('http://localhost:8080/users');
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
        const response = await axios.get('http://localhost:8080/providers');
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
        const response = await axios.get('http://localhost:8080/purchasedlist');
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
        const response = await axios.post('http://localhost:8080/comments', formData);
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
        const response = await axios.post('http://localhost:8080/comments', formData1);
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
        const response = await axios.post('http://localhost:8080/buylist/suggestion', formData);
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
        const response = await axios.get('http://localhost:8080/buylist');
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
        //console.log(response);
    } catch (error) {
        console.log(error);
    }
    // axios.post('http://localhost:8080/users', {
    //     username: _username,
    //     password: _password
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // });
}
export {login};

async function addToCart(_ID) {
    const data = {
        commodityId: _ID.toString()
    };
    try {
        const response = await axios.post('http://localhost:8080/commodity/add_to_buylist', data);
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
        const response = await axios.post('http://localhost:8080/register', data1);
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
        const response = await axios.post('http://localhost:8080/commodity/rate', data1);
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
        const response = await axios.post('http://localhost:8080/addcredit/', data1);
    } catch (error) {
        console.log(error);
    }
}

export {addCredit};

async function logout() {
    try {
        const response = await axios.post('http://localhost:8080/logout');
    } catch (error) {
        console.log(error);
    }
}

export {logout};


async function getPrice() {
    try {
        const response = await axios.get('http://localhost:8080/buylist/total_price');
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
        const response = await axios.get('http://localhost:8080/buylist/total_price_with_discount');
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
        const response = await axios.post('http://localhost:8080/buylist/discount', data1);
    } catch (error) {
        console.log(error);
    }
}

export {addDiscount};

async function payBuyList() {
    try {
        const response = await axios.post('http://localhost:8080/buylist/payment');
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
        const response = await axios.post('http://localhost:8080/comment/like', data);
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
        const response = await axios.post('http://localhost:8080/comment/dislike', data);
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
        const response = await axios.post('http://localhost:8080/commodity/add_comment', data);
    } catch (error) {
        console.log(error);
    }
}
export {addComment};





