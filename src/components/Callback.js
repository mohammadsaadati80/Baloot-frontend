import {callbackAPI} from "./utilities";

export default function Callback() {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    console.log(code);
    callbackAPI(code);
}