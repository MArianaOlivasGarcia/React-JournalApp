

/* get notes by uid user */

import { db } from "../firebase/firebase-config"

export const getNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes;

}