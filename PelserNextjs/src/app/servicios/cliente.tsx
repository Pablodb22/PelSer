import { NextResponse } from 'next/server'
import { supabaseServer } from '../lib/supabaseServidor'

export async function registrarUsario(usuario: {nombre: string, apellidos: string, nombre_usuario: string, correo: string, contrasena: string, fecha_creacion: string}) {

    const { data, error } = await supabaseServer.from('usuarios').insert([usuario]).select()

    if (error) {
        console.log('Error al registrar el usuario:', error)
        return NextResponse.json({ error: 'Error al registrar el usuario' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data }, { status: 200 })
}
