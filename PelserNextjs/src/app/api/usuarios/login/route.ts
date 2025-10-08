
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)



export async function POST(req: NextRequest) {

  const { correo, contrasena } = await req.json()

  const { data: usuarios, error } = await supabaseServer
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (usuarios.length === 0) {
      return NextResponse.json({ ok: false, mensaje: 'Usuario no encontrado' }, { status: 404 })
    }

    const usuario = usuarios[0]
 
    if (usuario.contrasena !== contrasena) {
      return NextResponse.json({ ok: false, mensaje: 'Contraseña incorrecta' }, { status: 401 })
    }

    return NextResponse.json({ ok: true, usuario })
}