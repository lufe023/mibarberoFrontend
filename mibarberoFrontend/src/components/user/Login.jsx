import React, { useState } from 'react';
import './Login.css';
import '../landing/landing.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import getUserbyId from '../utils/getUserbyId';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const submit = (e) => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/login`;
        axios.post(URL, form)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                getUserbyId(dispatch);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    allowOutsideClick: true, // Permitir cerrar al hacer clic fuera de la notificación
                    showCloseButton: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
                
                Toast.fire({
                    icon: 'success',
                    title: `Session Iniciada`
                });
                // Redirige a la ruta almacenada en el estado local o lo envia al inicio
                navigate(localStorage.getItem('redirectPath')=="/login"?'/':localStorage.getItem('redirectPath') || '/');
                // Limpia la ruta almacenada en el estado local
                localStorage.removeItem('redirectPath');
            })
            .catch(err => {
                console.log(err);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
                Toast.fire({
                    icon: 'error',
                    title: `Algo anda mal:`
                });
            });
    };

    return (
        <div className='loginPage'>
            <form onSubmit={submit} className='login_form'>
                <h3>Iniciar Sesión</h3>
                <label htmlFor="email">Usuario</label>
                <input className='login_input' type="text" placeholder="Email or Telefono" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <label htmlFor="password">Contraseña</label>
                <input className='login_input' type="password" placeholder="Contraseña" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <div className="article_buttons"><button className="btn-login primaryBtn">Iniciar</button></div>
                <div className="social">
                    <div className="go"><i className="fab fa-google" /> Google</div>
                    <div className="fb"><i className="fab fa-facebook" /> Facebook</div>
                </div>
                <div className="social">
                    <Link to='/'> Ir al Inicio </Link>
                </div>
                </form>
        </div>
    );
};

export default Login;