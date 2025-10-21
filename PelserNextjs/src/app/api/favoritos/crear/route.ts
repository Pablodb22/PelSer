import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  
    const { id_usuario, id_pelicula, id_serie, favorito } = body;

    // si es serie
    if (id_serie && id_serie !== 0) {
      // buscar existente
      const { data: existing, error: err1 } = await supabaseServer
        .from('favoritos')
        .select('*')
        .eq('id_usuario', id_usuario)
        .eq('id_serie', id_serie)
        .maybeSingle();

      if (err1) {
        return NextResponse.json({ ok: false, message: err1.message }, { status: 500 });
      }

      if (existing) {
        const { data, error } = await supabaseServer
          .from('favoritos')
          .update({ favorito })
          .eq('id', existing.id)
          .select()
          .maybeSingle();

        if (error) {
          return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, data });
      } else {
        const { data, error } = await supabaseServer
          .from("favoritos")
          .insert([{ id_usuario, id_pelicula, id_serie, favorito }])
          .select()
          .maybeSingle();

        if (error) {    
          return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }   
        return NextResponse.json({ ok: true, data });
      }
    }

    // si es pelicula
    if (id_pelicula && id_pelicula !== 0) {
      const { data: existing, error: err1 } = await supabaseServer
        .from('favoritos')
        .select('*')
        .eq('id_usuario', id_usuario)
        .eq('id_pelicula', id_pelicula)
        .maybeSingle();

      if (err1) {
        return NextResponse.json({ ok: false, message: err1.message }, { status: 500 });
      }

      if (existing) {
        const { data, error } = await supabaseServer
          .from('favoritos')
          .update({ favorito })
          .eq('id', existing.id)
          .select()
          .maybeSingle();

        if (error) {
          return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, data });
      } else {
        const { data, error } = await supabaseServer
          .from("favoritos")
          .insert([{ id_usuario, id_pelicula, id_serie, favorito }])
          .select()
          .maybeSingle();

        if (error) {    
          return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
        }   
        return NextResponse.json({ ok: true, data });
      }
    }

    return NextResponse.json({ ok: false, message: 'Necesita id_serie o id_pelicula' }, { status: 400 });
  } catch (err) {    
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}