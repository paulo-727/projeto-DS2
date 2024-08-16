import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setvalues] = useState({
        email: '',
        password:''
    })
    const navigate = useNavigate()
    

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {

            navigate('/Home')

        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Pagina de Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email"  name='email' id='email' autoComplete='off' placeholder='Entre Email'
                    onChange={e => setvalues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Senha:</strong></label>
                    <input type="password"  name='password' id='password' placeholder='Entre Senha'
                    onChange={e => setvalues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-succes w-100 rounded-0 loginButton mb-2'>Entrar</button>
                <div className='mb-1'>
                    <input type="checkbox"name="tick" id='tick' className='me-2' />
                    <label htmlFor="password"><strong>Voce concorda com os termos de uso?</strong></label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login