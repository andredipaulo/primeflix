import { useEffect, useState } from "react"
import "./favoritos.css"
import { Link } from "react-router-dom";
import {toast} from "react-toastify"

export default function Favoritos(){

    const [favoritos, setFavoritos]  = useState([]);

    useEffect( ()=>{
        const minhaLista = localStorage.getItem("@primeflix");

        setFavoritos(JSON.parse(minhaLista)||[]);        
    },[]);

    function handleRemover(id){
        let filtroFilme  = favoritos.filter( (item)=>{
            return (item.id !== id);
        });

        setFavoritos(filtroFilme);

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilme));
        toast.success("O filme foi removido dos favoritos!");
    }

    return (
        <div className="meusFavoritos">
            <h1>Favoritos</h1>

            {favoritos.length === 0 && <span>Nenhum filme salvo!</span>}

            <ul>
                {favoritos.map( (item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`} >Detalhe</Link>
                                <button onClick={() => handleRemover(item.id)}>Remover</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}