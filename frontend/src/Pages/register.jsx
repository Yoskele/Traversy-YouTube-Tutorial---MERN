import React from 'react'
import {useState, useEffect} from 'react'
// useSelector grabs the Global state
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {register, reset} from '../features/Auth/authSlice'
import Spinner from '../Components/spinner'


function Register() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email, password, password2} = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Grab the Authentication State from Redux(Global State)
    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        // If we manage to register user push him to dashboard.
        if(isSuccess || user){
            navigate('/')
        }
        // if any of the values belows changes this useEffect will run.
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        console.log('formData', formData)
        setFormData((prevState) => ({
            //...prevState, will take the other values and spread it to the correct places.
            ...prevState,
            // Key Value for the object is the Name from the Form
            [e.target.name]: e.target.value
        }))
        
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password !== password2){
            toast.error('Passwords Do Not Match')
        }else{
            const userData = {
                name,
                email,
                password
            }
            // dipatch to Redux look for register() 
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }
    return (
        <>
            <section>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please Create An Account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            id="email"
                            name="email"
                            value={email}
                            placeholder='Enter Your Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            id="password"
                            name="password"
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register