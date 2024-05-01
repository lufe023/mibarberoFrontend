import React from 'react'

const Infobox = () => {
  return (
    <section className="infoboxSection">
    <div className="infobox">
    <ul>
        <li>
        <i className="fas fa-map-marker-alt infoIcon" />
        <h4>
        dirección
        </h4>
        <div className='separador'></div>
        <p>
        3696 Lynden Road, Lefroy Ontario canada
        </p>
        </li>
        <li>
        <i className="fas fa-phone-alt infoIcon" />
        <h4>
        telefono
        </h4>
        <div className='separador'></div>
        <p>
        +62(123)-456-7890
+62(123)-456-7890
        </p>
        </li>
        <li>
        <i className="fas fa-clock infoIcon" />

        <h4>
        horario
        </h4>
        <div className='separador'></div>
        <p>
        martes - Sabado: 8AM - 8PM domingo: 8AM - 6PM
        </p>
        </li>
  
    </ul>
    </div>
    </section>
  )
}

export default Infobox