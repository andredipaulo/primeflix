import {BrowserRouter, Routes, Route} from "react-router-dom"


import  HomePage from './pages/Home';
import  FilmePage from './pages/Filme';
import  FavoritosPage from './pages/Favoritos';
import ErroPage from "./pages/Erro";

import Header from "./components/Header"


export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route  path="/" element={<HomePage />}/>
                <Route path="/favoritos"  element= {<FavoritosPage />} />
                <Route path="/filme/:id"  element= {<FilmePage />} />
                <Route path="*"  element= {<ErroPage />} />    
            </Routes>
        </BrowserRouter>      
    );
}