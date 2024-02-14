import { useEffect, useState } from "react";
import api from "../../services/api"
import { Link } from "react-router-dom";
import "./home.css"

function Home() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{

    async function loadFilmes(){
      //https://api.themoviedb.org/3/movie/now_playing?api_key=6cdcd3417aa59f4095487e9d050735e9
      //url da api: /3/movie/550?api_key=6cdcd3417aa59f4095487e9d050735e9

      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "6cdcd3417aa59f4095487e9d050735e9",
          language: "pt-BR",
          page: 1
        }
      })

      console.log(response);
      

      //setFilmes(response.data.results.slice(0, 10));
      setFilmes(response.data.results);

      setLoading(false);
    }    

    loadFilmes();

  }, []);

  if (loading){
    return(
      <div className="loading">
        <h2>Carregando filmes....</h2>
      </div>
    )
  }


  return (
      <div className="container">
        <div className="lista-filmes">

          {filmes.map((filme)=>{
            return(
              <article key={filme.id}>
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}` } alt={filme.title} />
                <Link to={`/filme/${filme.id}`}>Detalhes</Link>
              </article>
            )

          })}

        </div>
         
      </div>
  );
}
  
  export default Home;
  