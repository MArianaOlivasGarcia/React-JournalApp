import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithemailAndPasswordAndName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui )

    const { messageError } = useSelector(state => state.ui )

    const [ formValues, handleInputChanges ] = useForm({
        name: 'Mariana',
        email: 'example@example.com',
        password: '123456',
        password2: '123456',
    });   

    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ){
            console.log('Formulario valido');
            dispatch( startRegisterWithemailAndPasswordAndName(email, password, name) );
        }

    }

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is requerid') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password !== password2 || password.length < 6 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false;
        }

        dispatch( removeError() );

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {
                    messageError && 
                    <div className="auth__alert-error">
                        { messageError }
                    </div>
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChanges }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChanges }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChanges }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChanges }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={ loading }
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
