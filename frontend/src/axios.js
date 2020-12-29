import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/'
})

//http://localhost:5001/
//https://aldonza.herokuapp.com/

export default instance