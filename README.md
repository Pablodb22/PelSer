# 🚀 PelSer — ¡Tu app rápida y elegante para **películas y series** con Next.js, Supabase, TMDB y Vercel!

¡Bienvenido/a a PelSer! 🎉

PelSer es una aplicación web construida con Next.js (TypeScript) que te permite **explorar, gestionar y personalizar tu experiencia con miles de películas y series** 🍿📺. Usamos **Supabase** como backend, consumimos la vasta API pública de **The Movie Database (TMDB)** para datos multimedia y está desplegada de forma ágil en **Vercel**. Está pensada para ser ágil, moderna y fácil de usar.

Demo en Vercel: https://pelser.vercel.app/ ✨
TMDB: https://www.themoviedb.org/ 🎬

---

## ✨ Lo más destacado (Funcionalidades Clave)

**PelSer te permite:**

* **🔍 Explorar miles de títulos:** Accede a información detallada (sinopsis, fechas, portadas, reparto) de **miles de películas y series** gracias a la integración con la API de TMDB.
* **🔑 Gestión de Usuario Completa:**
    * **Registro y Login:** Crea una cuenta o inicia sesión de forma segura (Autenticación gestionada por Supabase).
    * **Configuración Personalizada:** Gestiona tu perfil, desde **cambiar tu contraseña** hasta **establecer un avatar** de usuario.
* **⭐ Personaliza tu experiencia:**
    * **Mi Lista:** **Añade a tu lista de favoritos** las películas y series que más te gusten para ver más tarde.
    * **Valoración:** **Califica** tus títulos favoritos con una puntuación de **0 a 10 estrellas**.
* **⚡ Interfaz Rápida y Responsiva:** Disfruta de una experiencia de navegación fluida y moderna, optimizada con Next.js.

---

## 🔧 Tecnologías
- **Next.js + TypeScript** — rendimiento y DX excelentes
- **Supabase** — base de datos, **autenticación** y APIs en un solo lugar
- **The Movie Database (TMDB)** — API pública para datos, portadas, búsquedas y metadata
- **Vercel** — despliegue instantáneo y previews automáticas

---

## 🔗 Integración con TMDB
PelSer utiliza la API de TMDB para obtener información de películas/series y recursos multimedia. Algunas notas rápidas:
- Web: https://www.themoviedb.org/
- Endpoint de ejemplo (búsqueda):
```bash
[https://api.themoviedb.org/3/search/movie?api_key=TU_TMDB_API_KEY&query=Matrix](https://api.themoviedb.org/3/search/movie?api_key=TU_TMDB_API_KEY&query=Matrix)
