import React from 'react'

const About = () => {
  return (
    <section className='aboutSection'>
      <article className='aboutArticle'>
        <div className="articleBody">
        <h2>
        Tu Barbero Personal a Domicilio
        </h2>
        <p>
        Estilo y comodidad a tu puerta. Tu barbería personal, donde y cuando la necesites.
        </p>
        <ul className="experience">
        <li className='experienceItem'>
        <span>100</span><span className='simbol'>%</span>
        <p>
        satisfaccíon Garantizada
        </p>
        </li>
        <li className='experienceItem'>
        <span>10</span><span className='simbol'>+</span>
        <p>
        años de experiencia
        </p>
        </li>
        </ul>
        </div>
        <img src='./model2.jpg'/>
      </article>
    </section>
  )
}

export default About