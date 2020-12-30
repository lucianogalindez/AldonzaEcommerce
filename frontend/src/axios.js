import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://aldonza.herokuapp.com/'
})

//http://localhost:5001/
//https://aldonza.herokuapp.com/

export default instance