import React from 'react'

const Services = () => {
  return (
    <section className='servicio'>
      
        <article className='servicesArticle'>
        <h2>
        Nuestros servicios
        </h2>
        <p>
        Descubre la gama completa de estilos y tratamientos que llevamos directamente a tu hogar. Calidad de salón, sin salir de casa.
        </p>
        </article>

        <div className='serviceCatalog'>
        <div className='serviceColunm'>
        <article className='miniArticle'>
            <img src='./icons/Adult haircut img.png'/>
            <div className='miniArticleBody'>
            <h4>Corte Adultos</h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$39 USD</p>
            </div>
        </article>
        <article className='miniArticle'>
            <img src='./icons/Beard trim img.png'/>
            <div className='miniArticleBody'>
            <h4>Corte de Barba</h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$29 USD</p>
            </div>
        </article>
        <article className='miniArticle'>
            <img src='./icons/Scalp moisturizing img.png'/>
            <div className='miniArticleBody'>
            <h4>Hidratación </h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$10 USD</p>
            </div>
        </article>
        </div>
        <div className='serviceColunm'>
        <article className='miniArticle'>
            <img src='./icons/Kids haircut img.png'/>
            <div className='miniArticleBody'>
            <h4>corte nños</h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$19 USD</p>
            </div>
        </article>
        <article className='miniArticle'>
            <img src='./icons/Barbershop.png'/>
            <div className='miniArticleBody'>
            <h4>Afeitado de cuello</h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$39 USD</p>
            </div>
        </article>
        <article className='miniArticle'>
            <img src='./icons/beard.png'/>
            <div className='miniArticleBody'>
            <h4>Aseo de la barba</h4>
            <p>Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis</p>
            <p className='price'>$49 USD</p>
            </div>
        </article>
        </div>
        
        </div>

        <div className="article_buttons">
        <button className='primaryBtn'>Agendar Cita</button>
        </div>
      
    </section>
  )
}

export default Services