import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes)

    const [ formValues, handleInputChange, reset ] = useForm(note);

    const { title, body } = formValues;

    /* Almacenar en una referencia el id de la nota */
    const activeId = useRef( note.id );

    /* cambiar la nota activa
    ya que solo se cambia en el store
    pero no en el formualrio.
    Aqui cambiamos la nota activa en el formulario */
    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
        
    }, [note, reset])



    /* Efecto cuando mi formulario cambia
    cambiar los valores de mi actvide note del store*/

    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues }) )

    }, [formValues, dispatch])


    const handleDelete = () => {
        dispatch( startDeleting( note.id ) )
    }


    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value={ title }
                    name="title"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    onChange={ handleInputChange }
                    value={ body }
                    name="body"
                ></textarea>

                { note.url &&
                    <div className="notes__image">
                        <img 
                            src={ note.url }
                            alt="imagen"
                        />
                    </div>
                }


            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
