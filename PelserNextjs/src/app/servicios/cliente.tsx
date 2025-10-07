export async function registrarUsario(usuario: {nombre: string, apellidos: string, nombre_usuario: string, correo: string, contrasena: string,fecha_creacion: string}) {
  const res = await fetch('/api/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}
