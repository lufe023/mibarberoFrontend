import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {

    const divStyle = {
        backgroundColor:"#DEC7A6",
        height:"100vh",
        display:"Flex",
        justifyContent:"center",
        alignItems:"Center",
        fontFamily: 'Barlow',
    }

    const contentStyle ={
        minHeight:"auto",
        backgroundColor:"white",
        padding:"100px"
    }

    const title = {
fontFamily: 'Barlow',
fontStyle: 'normal',
fontWeight: 900,
fontSize: '60px',
lineHeight: '86px',
textAlign: 'center',
textTransform: 'uppercase',
    }

  return (
    <div style={divStyle}>
  {/* Main content */}
  <section className="content" style={contentStyle}>
    <div className="error-page">
      <h2 className="headline text-warning" style={title}> 404</h2>
      <div className="error-content">
        <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! No he podido encontrar esta pagina.</h3>
        <p>
          quizas estes perdido
          regresa al <Link to="/">Inicio</Link>
        </p>
      </div>
      {/* /.error-content */}
    </div>
    {/* /.error-page */}
  </section>
  {/* /.content */}
</div>

  )
}

export default Error404