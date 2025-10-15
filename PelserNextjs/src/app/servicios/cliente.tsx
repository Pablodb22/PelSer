
export async function registrarUsario(usuario: {nombre: string, apellidos: string, nombre_usuario: string, correo: string, contrasena: string,fecha_creacion: string}) {
const res = await fetch(`${window.location.origin}/api/usuarios/crear`, {
  method: 'POST',
  body: JSON.stringify(usuario),
  headers: { 'Content-Type': 'application/json' }
})

  return res.json()
}

export async function LoginUsario(correo: string, contrasena: string) {
  const res = await fetch(`${window.location.origin}/api/usuarios/login`, {
    method: 'POST',
    body: JSON.stringify({ correo, contrasena }),
    headers: { 'Content-Type': 'application/json' }
  })

  return res.json()
}

export async function actualizarAvatarUsuario(id: number, avatar_url: string) {
  const res = await fetch(`${window.location.origin}/api/usuarios/avatar`, {
    method: 'POST',
    body: JSON.stringify({ id, avatar_url }),
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export async function borrarCuenta( id:number){
  const res=await fetch(`${window.location.origin}/api/usuarios/eliminarcuenta`, {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export async function cambiarContrasena(id: number, nuevaContrasena: string) {
  const res = await fetch(`${window.location.origin}/api/usuarios/contrasena`, {
    method: 'POST',
    body: JSON.stringify({ id, nuevaContrasena }),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
}

export async function configurarUsuario(id: number, correo: string, nombre_usuario: string) {
  const res = await fetch(`${window.location.origin}/api/usuarios/configurar`, {
    method: 'POST',
    body: JSON.stringify({ id, correo, nombre_usuario }),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
}





