export async function registrarUsario(usuario: any) {
  const res = await fetch('/api/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}
