import { Link } from "react-router-dom"
import "./erro.css"
export default function Erro(){
    return(
        <div className="erro">
            <h1>404</h1>
            <h2>Ops! Página não encontrada</h2>            
            <Link to="/">Ir para Home</Link>
        </div>
    )
}