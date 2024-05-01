import React, { useState } from 'react'
import './Menu.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
    const user = useSelector(state => state.userSlice)
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    
    const menuList = [
      { id:1, anchor: 'Inicio',link:'/'},
      { id:2, anchor: 'Reproductor',link:'/music'},
      { id:3, anchor: 'Player',link:'/player'},
      { id:4, anchor: 'AGENDA',link:'/AGENDA'},
      { id:5, anchor: 'CLIENTES',link:'/CLIENTES'},
      { id:6, anchor: 'ADMINISTRAR',link:'/ADMINISTRAR'},
      { id:7, anchor: isLogged ? 'Logout' : 'Login', link: isLogged ? '/logout' : '/login' },
      { id:8, anchor: '404',link:'/404'},
      
  ]
  
    return (
    <>
    {/* position: fixed; */}
    <div className='mainMenu'style={{position: isOpen ? 'fixed' : 'absolute'}} >

    <div className='menuContainer'>
    <div style={{color:"white"}}>
          {
            user?.email
          }
        </div>
    <div className={`menu-toggle ${isOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
    </div>
    </div>
    
    <div className="menuList" style={{marginLeft: isOpen ? '0%' : '-200%'}}>
        <div className="menuListGradient">
        <ul>
          {
            menuList.map((li)=>(
              <li key={li.id} className='itemMenu'>
                  <Link to={li.link} onClick={()=>localStorage.setItem('redirectPath', li.link)}>
                {li.anchor}
                </Link>
                </li>
            ))
          }
        </ul>
        </div>
        </div>
    
    
    </>
  )
}

export default Menu