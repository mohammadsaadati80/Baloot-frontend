import {comments} from "./data";
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
        console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }
}

export {getProviders};

export function getComments() {
    return parseJSON(comments);
}

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
        console.log(arrayOfObjects);
        return arrayOfObjects;
    } catch (error) {
        console.log(error);
    }

}

// function getSuggestions() {
//     return parseJSON(suggestions);
// }
export {getSuggestions};

// export function getRatings() {
//     return parseJSON(ratings);
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
        console.log(response);
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