# SupertGas

App web para el móvil que busca la gasolinera más ventajosa según tu consumo y la distancia.
GitHub descarga los precios oficiales del Ministerio cada 30 minutos y publica la app en
`https://TU-USUARIO.github.io/supertgas/`.

## Puesta en marcha (una sola vez, unos 5 minutos, desde el ordenador)

1. Crea una cuenta en https://github.com si no la tienes.
2. Pulsa **+ → New repository**. Nombre: `supertgas`. Marca **Public** y pulsa **Create repository**.
3. En la página del repositorio vacío, pulsa **uploading an existing file**.
   Descomprime el .zip y arrastra **el contenido** de la carpeta (`.github`, `scripts`, `site`, `README.md`).
   Ojo: la carpeta `.github` está oculta en Mac/Windows. Si no aparece, en Mac pulsa Cmd+Mayús+. en el Finder;
   en Windows, Vista → Mostrar → Elementos ocultos. Pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En **Source** elige **GitHub Actions**.
5. Ve a la pestaña **Actions**. Si pide permiso, pulsa **I understand… enable them**.
   Abre **Actualizar precios y publicar → Run workflow → Run workflow**.
6. A los 2–3 minutos aparece un tic verde. Tu app estará en
   `https://TU-USUARIO.github.io/supertgas/`.
7. Ábrela en el móvil y elige **Añadir a pantalla de inicio**.

## Cómo funciona

- `.github/workflows/actualizar.yml`: tarea programada cada 30 min. Descarga los precios, los compacta
  y publica la app con los datos. Si el Ministerio no responde, mantiene los últimos datos buenos.
- `scripts/compactar.mjs`: reduce el JSON del Ministerio (~15 MB) a ~1,5 MB con solo lo necesario.
- `site/index.html`: la app.

## Si algo falla

- **Tic rojo en Actions**: ábrelo y mira el paso «Descargar precios del Ministerio». Si el primer
  intento falla siempre, puede que el Ministerio bloquee los servidores de GitHub (están fuera de España).
  En ese caso habría que lanzar la descarga desde un equipo en España.
- **GitHub pausa las tareas programadas** tras 60 días sin actividad. La tarea hace un pequeño commit cada lunes
  para evitarlo. Si aun así se pausa, GitHub te avisa por correo y se reactiva con un clic en Actions.
- Los horarios de GitHub pueden retrasarse unos minutos en horas punta. Es normal.
