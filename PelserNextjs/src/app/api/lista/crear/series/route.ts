import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { id_usuario, id_pelicula, id_series } = await req.json()

    // Primero verificamos si ya existe un registro igual
    const { data: existente, error: errorSelect } = await supabaseServer
      .from('milista')
      .select('*')
      .eq('id_usuario', id_usuario)
      .eq('id_series', id_series)
      .maybeSingle() // devuelve 1 o null

    if (errorSelect) {
      throw new Error(errorSelect.message)
    }

    if (existente) {
      // Ya existe en la lista del usuario
      return NextResponse.json(
        { ok: false, message: 'Esta película ya está en la lista del usuario.' },
        { status: 400 }
      )
    }

    // Si no existe, insertamos
    const { data, error } = await supabaseServer
      .from('milista')
      .insert([{ id_pelicula, id_series, id_usuario }])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
