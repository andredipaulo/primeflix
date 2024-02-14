import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom"
import "./filme.css"
import api from "../../services/api"
import {toast } from  'react-toastify' 
function Filme() {

  const {id} = useParams();
  const navigate = useNavigate();  

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{    
    async function loadFilme(){
      await api.get(`movie/${id}`, {
        params:{
          api_key: "6cdcd3417aa59f4095487e9d050735e9",
          language: "pt-BR",          
        }
      })
      .then((response)=>{
        console.log(response)
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("Filme não encontrado")
        navigate("/", {replace: true});
        return;
      })
    }

    loadFilme();

    return()=>{
      console.log( "componente desm")
    }

  },[id, navigate]);

  // function salvarFilme(){
  //   const minhaLista = localStorage.getItem('@primeflix');
    
  //   let  filmesSalvos = JSON.parse(minhaLista) || [];
    
  //   const hasFilme = filmesSalvos.some( filmesSalvos => filmesSalvos.id === filme.id);

  //   alert(hasFilme)
  //   if (hasFilme){      
  //     alert("Filme já na lista");

  //     return;
  //   }else{
  //     filmesSalvos.push(filme);
  //     localStorage.setItem('@primeflix', JSON.stringify(filme));
  //     alert( "filme salvo com sucesso")
  //   }

    
  // }

  function salvarFilme() {
    // Tenta recuperar a lista de filmes do localStorage e garante que é um array
    let filmesSalvos;
    try {
      const minhaLista = localStorage.getItem('@primeflix');
      filmesSalvos = JSON.parse(minhaLista) || [];
    } catch (e) {
      // Se houver erro ao analisar, inicializa como array vazio
      filmesSalvos = [];
    }
  
    // Verifica se o valor recuperado e convertido é de fato um array
    if (!Array.isArray(filmesSalvos)) {
      console.error('filmesSalvos não é um array:', filmesSalvos);
      filmesSalvos = []; // Reinicializa como array vazio para evitar erros
    }
  
    // Procede com a verificação e salvamento do filme
    const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id);
  
    if (hasFilme) {
      //ualert("Filme já na lista");
      toast.info("Filme já na lista");
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
      //alert("Filme salvo com sucesso");
      toast.success("Filme salvo com sucesso");
    }
  }



  if (loading){
    return(
      <div className="loading">
        <h2>Carregando detalhe do filme....</h2>
      </div>
    )
  }

  return (
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt={filme.title} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average}/10</strong>                        


        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>

          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
      </div>
    );
  }
  
  export default Filme;
  