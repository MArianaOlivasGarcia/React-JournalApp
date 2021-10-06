


export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/mariana-olivas/image/upload?upload_preset=kxhti5po';

    const formData = new FormData();

    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            /* return url de la imagen */
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (err) {
        console.log(err)
    }


}