
import { db } from '../firebase/firebase-config';
import { getNotes } from '../helpers/getNotes';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';





export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid }  = getState().auth;

        /* Crear la nota que queremos grabar */
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection( `${ uid }/journal/notes` ).add( newNote )

        dispatch( activeNote( docRef.id, newNote )  )
        
        dispatch( addNewNote( docRef.id, newNote )  )

    }
}

/* Activar la nota */
export const activeNote = ( id, note ) => {

    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }

}


export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...note
        }
    }
}





export const setNotes = ( notes ) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}





export const startLoadingNote = ( uid ) => {

    return async( dispatch ) => {
        
        /* Obtener las notes del usuario */
        const notes = await getNotes( uid );
        dispatch( setNotes( notes ) );

    }

}




export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        /* Si no manda url foto */
        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        
        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );
            dispatch( refreshNode( note.id, noteToFirestore ) );
            Swal.fire('Saved', note.title, 'success');
        } catch ( err ) {
            console.log(err)
            Swal.fire('Error', err.message, 'error');

        }

    }
}



export const refreshNode = ( id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}




export const startUploading = ( file ) => {

    return async( dispatch, getState ) => {
        const { active } = getState().notes;


        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
        })
        
        const fileUrl = await fileUpload( file );
        active.url = fileUrl;

        dispatch( startSaveNote( active ) );

        Swal.close();
    }

}




export const startDeleting = ( id ) => {

    return async( dispatch, getState ) => {

        const uid = getState().auth.uid
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );

    }

}



export const deleteNote = ( id ) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}




export const notesLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}