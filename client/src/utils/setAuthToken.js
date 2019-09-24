import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token-custom'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token-custom'];
    }
}

export default setAuthToken;