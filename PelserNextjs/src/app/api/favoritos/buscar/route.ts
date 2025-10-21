import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
    const { id_usuario, id_serie, id_pelicula } = await req.json();

    if (id_serie != 0) {
        const { data, error } = await supabaseServer
            .from('favoritos')
            .select('*')
            .eq('id_usuario', id_usuario)
            .eq('id_serie', id_serie)
            .single();

        if (error) {
            return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, data });
    }

    if (id_pelicula != 0) {
        const { data, error } = await supabaseServer
            .from('favoritos')
            .select('*')
            .eq('id_usuario', id_usuario)
            .eq('id_pelicula', id_pelicula)
            .single();

        if (error) {
            return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, data });
    }

    return NextResponse.json({ ok: false, message: 'Faltan parámetros' }, { status: 400 });
}