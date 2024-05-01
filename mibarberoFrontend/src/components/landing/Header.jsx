import React, { useEffect, useState } from 'react';
import Menu from '../menu/Menu';
import { useSelector } from 'react-redux';

const Header = () => {

  const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
  return (
    <section className='header'>
      <Menu/>
        <div className="container">
        <article>
            <h1>
            La máxima comodidad para personas ocupadas  
            </h1>
            <p>Experimente la comodidad de los servicios de barbería a domicilio</p>
            <div className="article_buttons">
                <button className='btn primaryBtn'>Agendar Cita</button>
                <button className='btn secundaryBtn'>Ver Servicios</button>
            </div>
        </article>
        </div>

    </section>
  );
}

export default Header;
