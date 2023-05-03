import axios from '../http/index.js'

const LOGIN_API='api/gradeCourse/auth/login'

function login(credentials){
    return axios.post(LOGIN_API,credentials);
}

export {login}


