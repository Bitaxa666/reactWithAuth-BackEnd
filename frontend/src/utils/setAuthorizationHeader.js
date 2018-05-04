/**
 * Created by user on 4/24/18.
 */
import axios from 'axios';

export default (token = null) => {
    if(token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
       delete axios.defaults.headers.common.authorization;
    }
}