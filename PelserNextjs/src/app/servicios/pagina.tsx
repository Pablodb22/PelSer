
export async function obtenerPeliculasPrincipal(numero: number) {
    
    const repuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-US&page=${numero}&sort_by=popularity.desc`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept': 'application/json'
        }
    });

    

    const datos = await repuesta.json();
    return datos;
}

export async function obtenerSeries(numero: number) {
    
    const repuesta = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=es-US&page=${numero}&sort_by=popularity.desc`, {
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
    
    const repuesta = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-US&page=1&sort_by=popularity.desc`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept': 'application/json'
        }
    });

    

    const datos = await repuesta.json();
    return datos;
}

export async function obtenerCategorias() {
    const respuesta=await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function obtenerCategorias2() {
    const respuesta=await fetch('https://api.themoviedb.org/3/genre/tv/list?language=es',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function obtenerPeliculasPorCategoria(idCategoria: number) {
    const respuesta=await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${idCategoria}&language=es-US&sort_by=popularity.desc&page=1`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function obtenerSeriesPorCategoria(idCategoria: number) {
    const respuesta=await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${idCategoria}&language=es-US&sort_by=popularity.desc&page=1`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function obtenerPeliculaDetalle(id: number) {
    const respuesta=await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-US`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}
export async function obtenerSerieDetalle(id: number) {
    const respuesta=await fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-US`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function obtenerListaUsuario(id:number){
    const respuesta=await fetch(`${window.location.origin}/api/lista/consultar`,{
        method:'POST',
        body: JSON.stringify({id}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const datos=await respuesta.json();
    return datos ;
}

export async function agregarPeliculaLista(id_usuario:number, id_pelicula:number, id_series:number){
    const respuesta=await fetch(`${window.location.origin}/api/lista/crear/pelis`,{
        method:'POST',
        body: JSON.stringify({id_usuario, id_pelicula, id_series}), 
        headers:{
            'Content-Type':'application/json'
        }
    });
    const datos=await respuesta.json();
    return datos ;
}

export async function agregarSerieLista(id_usuario:number, id_pelicula:number, id_series:number){
    const respuesta=await fetch(`${window.location.origin}/api/lista/crear/series`,{
        method:'POST',
        body: JSON.stringify({id_usuario, id_pelicula, id_series}), 
        headers:{
            'Content-Type':'application/json'
        }
    });
    const datos=await respuesta.json();
    return datos ;
}

export async function borrarListaUsuario(id_usuario:number,id:number){
    const respuesta=await fetch(`${window.location.origin}/api/lista/borrar`,{
        method:'POST',
        body: JSON.stringify({id_usuario,id}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const datos=await respuesta.json();
    return datos ;
}

export async function alertaPelis(){
    const respuesta=await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&language=es-US&page=1',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }
    });
    const datos=await respuesta.json(); 
    return datos;
}

export async function alertaSeries(){
    const respuesta=await fetch('https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&language=es-US&page=1',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${process.env.NEXT_PUBLIC_TOKEN_ACCESO_LECTURA ?? ''}`,
            'accept':'application/json'
        }   
    });
    const datos=await respuesta.json(); 
    return datos;
}