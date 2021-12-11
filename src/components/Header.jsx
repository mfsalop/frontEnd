import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
   
    return (
    <div>
        <header>
            <ul className="xForce">
                <li id="logo">X-Force</li>
                <Link to='/GestionarProyectos'><li className="botonForce">Gestión de proyectos</li></Link>
                <Link to='/Proyectos'><li className="botonForce">Proyectos</li></Link>
                <Link to='/GestionarUsuarios'><li className="botonForce">Gestión de usuarios</li></Link>
                <button className="botonSalir" >Salir</button>               
            </ul>
        </header>
    </div>
    )
}

export default Header
