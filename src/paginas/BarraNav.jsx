import React from 'react'

//Logos
import { HiMenu } from "react-icons/hi";

///Imagenes
import logoSky from '../recursos/LogoSkyLink.png';

const BarraNav = () => {
    return (

        //Header contendra toda la barra de navegacion Principal sin iniciar sesion
        <header className='navBar flex'>
            <nav className='flex'>
                {/* //p1 sera la primera mitad de la barra contendra el logo y nombre de la compañia */}
                <div className='flex p1'>
                    <img className='logo'src={logoSky} />
                    <h4>Sky Link</h4>
                </div>
                {/* //p2 sera la segunda mitad de la barra contendra el inicio de sesion y el submenu */}
                <div className='flex p2'>
                    <span className='texto'>Iniciar Sesion</span>
                    <div className='flex icono'><HiMenu /></div>
                </div>
            </nav>
        </header>
    )
}

export default BarraNav
