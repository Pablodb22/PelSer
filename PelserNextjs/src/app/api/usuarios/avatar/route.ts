import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { id, avatar_url } = body

        if (!id || !avatar_url) {
            return NextResponse.json(
                { error: 'ID y avatar_url son requeridos' }, 
                { status: 400 }
            )
        }

        const { data, error } = await supabaseServer
            .from('usuarios')
            .update({ avatar_url })
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('Error de Supabase:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ ok: true, data })
    } catch (error: any) {
        console.error('Error en la API:', error)
        return NextResponse.json(
            { error: error?.message || 'Error al actualizar el avatar' }, 
            { status: 500 }
        )
    }    
}