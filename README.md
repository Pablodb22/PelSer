# 🚀 PelSer — ¡Tu app rápida y elegante con Next.js, Supabase, TMDB y Vercel!

¡Bienvenido/a a PelSer! 🎉  
PelSer es una aplicación web construida con Next.js (TypeScript), usa Supabase como backend, consume la API pública de The Movie Database (TMDB) para datos multimedia y está desplegada en Vercel. Está pensada para ser ágil, moderna y fácil de usar — ideal para gestionar y mostrar información relacionada con películas/series y otros recursos.

Demo en Vercel: https://pelser.vercel.app/ ✨  
TMDB: https://www.themoviedb.org/ 🎬

---

## 🔧 Tecnologías
- Next.js + TypeScript — rendimiento y DX excelentes  
- Supabase — base de datos, autenticación y APIs en un solo lugar  
- The Movie Database (TMDB) — API pública para datos, portadas, búsquedas y metadata  
- Vercel — despliegue instantáneo y previews automáticas  

---

## ✨ Lo más destacado
- Interfaz rápida y responsiva con Next.js  
- Integración con TMDB para buscar y mostrar películas/series (portadas, sinopsis, fechas, etc.)  
- Autenticación y gestión de usuarios con Supabase  
- CRUD completo (crear / ver / editar / eliminar) sobre los recursos principales  
- Despliegue automático en Vercel con cada push

---

## 🔗 Integración con TMDB
PelSer utiliza la API de TMDB para obtener información de películas/series y recursos multimedia. Algunas notas rápidas:
- Web: https://www.themoviedb.org/  
- Endpoint de ejemplo (búsqueda):  
```bash
https://api.themoviedb.org/3/search/movie?api_key=TU_TMDB_API_KEY&query=Matrix
```
- Para imágenes usa las URLs base que TMDB proporciona (consulta la configuración de la API si necesitas tamaños específicos).
- Asegúrate de respetar los términos de uso de TMDB y de incluir las atribuciones requeridas si las piden.

---

## 🏁 ¿Quieres probarlo ya? — Quick Start (local)
1. Clona el repo  
```bash
git clone https://github.com/Pablodb22/PelSer.git
```
2. Entra en la carpeta:  
```bash
cd PelSer
```
3. Instala dependencias:  
```bash
npm install
# o
yarn
```
4. Copia el archivo de ejemplo de variables de entorno (si existe) y configúralas:  
```bash
cp .env.example .env.local
```
5. Añade tus variables en .env.local:
- NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url  
- NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key  
- NEXT_PUBLIC_TMDB_API_KEY=tu_tmdb_api_key  (usa la key pública en cliente solo si es seguro; para operaciones seguras usa key en server)
- SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key  (solo en servidor)
> Nunca subas keys secretas a repositorios públicos.

6. Ejecuta en modo desarrollo:  
```bash
npm run dev
# o
yarn dev
```
7. Abre http://localhost:3000 y disfruta 🚀

---

## 🔐 Variables de entorno recomendadas
- NEXT_PUBLIC_SUPABASE_URL — URL de tu proyecto Supabase  
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Key pública (anon) de Supabase  
- NEXT_PUBLIC_TMDB_API_KEY — Key pública de TMDB (o TMDB_API_KEY para uso en server)  
- SUPABASE_SERVICE_ROLE_KEY — (si necesitas operaciones admin; NUNCA exponer en cliente)

---

## 📦 Despliegue en Vercel
1. Conecta tu repo en Vercel.  
2. Añade las mismas variables de entorno en Settings > Environment Variables (incluye la TMDB key si la usas en frontend).  
3. Vercel detecta Next.js y hace build automáticamente.  
4. Tu app estará disponible en: https://pelser.vercel.app/

---

## 📁 Estructura sugerida (resumen)
- /pages o /app — rutas Next.js  
- /components — UI reutilizable  
- /lib o /services — cliente y utilidades de Supabase y TMDB  
- /styles — estilos globales

(Ajusta según la estructura real del proyecto)

---

## 🤝 Cómo contribuir
1. Haz fork y crea una rama:  
```bash
git checkout -b feat/tu-idea
```
2. Haz commits claros y abre un PR describiendo tu aporte.  
3. Añade tests o capturas si aplica.  
4. Mantén el código limpio y la documentación actualizada.

---

## 🧾 Licencia
Incluye la licencia que prefieras (por ejemplo MIT). Si quieres, la añado por ti.

---

## 📬 Contacto
- Autor: Pablodb22  
- Demo: https://pelser.vercel.app/  
- TMDB: https://www.themoviedb.org/  

¿Quieres que añada badges (build, coverage), capturas/GIF de la app o un ejemplo de flujo de autenticación con Supabase + TMDB? Puedo prepararlos y también subir el README directamente en un PR si me das luz verde.