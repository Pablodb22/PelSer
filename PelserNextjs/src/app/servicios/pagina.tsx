
export async function obtenerPeliculasPrincipal(numero: number) {
    
    const repuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${numero}&sort_by=popularity.desc`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept': 'application/json'
        }
    });

    

    const datos = await repuesta.json();
    return datos;
}
export async function obtenerSeriePrincipal() {
    
    const repuesta = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept': 'application/json'
        }
    });

    

    const datos = await repuesta.json();
    return datos;
}

