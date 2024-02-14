import axios from "axios";

//base da Url : https://api.themoviedb.org/3/
//url da api: /3/movie/550?api_key=6cdcd3417aa59f4095487e9d050735e9


const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/"
});

export default api;


