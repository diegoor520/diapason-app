# 🎸 Diapasón · Teoría y oído para guitarra

App para aprender **teoría musical, entrenamiento auditivo e improvisación** en guitarra (nivel intermedio).
Todo funciona **sin conexión**: el sonido se sintetiza en el navegador (Karplus-Strong), el mástil se dibuja en SVG y los ejercicios se generan al azar a partir de la teoría programada. No usa librerías, CDN, fuentes externas ni ninguna IA o API.

## Qué incluye

- **Mapa "Lo que sé"**: 8 bloques y 36 temas que se desbloquean con un 80 % de aciertos en una serie de 10. Cada tema aparece bloqueado (gris), en curso (amarillo) o dominado (verde).
- **4 modos de práctica**
  1. 👂 **Acordes de oído**: escuchas un acorde y escribes cuál es.
  2. 🎧 **Progresiones de oído**: tonalidad → grados → acordes, con la progresión en bucle y las respuestas acumuladas arriba.
  3. 🧠 **Notas de los acordes**: notas de cada acorde, notas en común y escala para improvisar.
  4. 🎸 **Figuras en el mástil**: construyes la figura de una escala y nombras sus notas.
- **Aprender algo nuevo** (lección + ejercicios con explicación) o **Repasar lo que sé** (solo temas desbloqueados).
- Ajustes: notación latina o americana, volumen, tempo, acorde plaqueado o arpegiado, tema claro/oscuro.
- Progreso en el navegador, con **Exportar / Importar** (JSON) y **Reiniciar**.
- Pruebas automáticas de la teoría en **Ajustes → Ejecutar pruebas**.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | **La app completa.** Funciona sola, incluso abriéndola con doble clic. |
| `manifest.webmanifest` | Nombre, colores e iconos para instalarla como app. |
| `sw.js` | *Service worker*: guarda la app en el móvil para usarla sin conexión y detecta versiones nuevas. |
| `icons/` | Iconos de la app (Android, iPhone y ordenador). |
| `.nojekyll` | Hace que GitHub Pages publique los archivos tal cual. |

`manifest.webmanifest`, `sw.js` e `icons/` solo se usan cuando la app se sirve por **https** (GitHub Pages). Si abres `index.html` directamente, no hacen falta.

## Publicarla en GitHub Pages (sin instalar nada)

1. Entra en [github.com](https://github.com) con tu cuenta y pulsa **New repository** (botón verde, o el **+** de arriba a la derecha).
2. Ponle un nombre, por ejemplo `diapason`. Déjalo **Public** y pulsa **Create repository**.
3. En la página del repositorio vacío, pulsa el enlace **uploading an existing file**.
4. Abre la carpeta `diapason-pwa` en tu ordenador, **selecciona todo su contenido** (no la carpeta en sí) y arrástralo a la página. Comprueba que se suben `index.html`, `manifest.webmanifest`, `sw.js`, `README.md`, `.nojekyll` y la carpeta `icons`.
   - `.nojekyll` es un archivo vacío. En Mac está oculto (pulsa **Cmd + Mayús + .** para verlo). Si no se sube, no pasa nada: la app funciona sin él.
5. Pulsa **Commit changes**.
6. Ve a **Settings → Pages**. En **Source** elige **Deploy from a branch**, en **Branch** elige **main** y la carpeta **/ (root)**, y pulsa **Save**.
7. Espera 1–2 minutos y recarga la página de Settings → Pages. Arriba aparecerá la dirección de tu app, del tipo:
   `https://TU-USUARIO.github.io/diapason/`

## Instalarla en el móvil

- **Android (Chrome)**: abre la dirección. En Inicio aparecerá el aviso **📲 Instalar**; si no, menú ⋮ → **Instalar app** o **Añadir a pantalla de inicio**.
- **iPhone / iPad (Safari)**: abre la dirección en **Safari**, pulsa **Compartir ⬆️ → Añadir a pantalla de inicio**.
- **Ordenador (Chrome / Edge)**: icono de instalar en la barra de direcciones.

Después de abrirla una vez, funciona **sin conexión**.

> 🔊 En iPhone, si no oyes nada, quita el modo silencio y sube el volumen. El audio se activa al tocar la pantalla por primera vez.

> 💾 El progreso se guarda **en cada navegador o app por separado**. Para pasarlo del ordenador al móvil (o de Safari a la app instalada), usa **Ajustes → Exportar progreso** y luego **Importar progreso**.

## Publicar cambios (actualizaciones)

Cada vez que modifiques algún archivo:

1. En `sw.js`, sube el número de `VERSION` (por ejemplo de `'1.1.0'` a `'1.1.1'`).
2. En `index.html`, busca `APP_VERSION` y pon el mismo número.
3. Sube los archivos cambiados al repositorio (**Add file → Upload files**) y pulsa **Commit changes**.

Al abrir la app, aparecerá el aviso **🆕 Nueva versión disponible → Actualizar**. El progreso no se pierde.

Si no subes la versión en `sw.js`, los móviles que ya la tienen instalada seguirán usando la versión anterior guardada.

## Ampliar la app

El código de `index.html` está organizado y comentado por secciones:

- **Núcleo 1/5 · Teoría**: notas, intervalos, acordes (`QUAL`), escalas (`SCALES`), campos armónicos, mástil y voicings.
- **Núcleo 2/5 · Parser**: interpreta las respuestas escritas (latina/americana, enharmonías, grados…).
- **Núcleo 3/5 · Generadores**: un generador por modo y tema (`GEN.O`, `GEN.P`, `GEN.N`, `GEN.M`) y el repertorio de progresiones por estilo (`REP`).
- **Núcleo 4/5 · Currículum**: bloques (`BLOCKS`), temas (`TOPICS`) y lecciones (`LESSONS`).
- **Núcleo 5/5 · Pruebas**: `runTests()`.
- **Interfaz**: almacén de progreso, audio, mástil SVG, PWA, pantallas y eventos.

Para añadir un tema: añádelo a `TOPICS`, escribe su lección en `LESSONS` y crea su generador `GEN.<modo>.<id>`. Después ejecuta las pruebas desde Ajustes.
