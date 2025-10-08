
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





