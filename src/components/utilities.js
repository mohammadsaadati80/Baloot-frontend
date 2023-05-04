import {comments, commodities, providers, suggestions} from "./data";
import {users} from "./data";

export function getCommodities() {
    return parseJSON(commodities);
}
export function getUsers() {
    return parseJSON(users);
}

export function getProviders() {
    return parseJSON(providers);
}

export function getComments() {
    return parseJSON(comments);
}

export function getSuggestions() {
    return parseJSON(suggestions);
}

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