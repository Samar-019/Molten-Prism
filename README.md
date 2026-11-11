<div align="center">

<a href="https://github.com/Samar-019/Molten-Prism">
  <img src="assets/icon.svg" alt="Molten Prism Icon" width="130" height="130">
</a>

# 🎵 Molten Prism
### 🌊💎 Liquid Glass Client | ▶️🎶 YouTube Music Desktop

**YouTube Music on your desktop reimagined with Apple Music aesthetics & fluid Liquid Glass.**  
Translucent frosted glass, word-by-word shining synced lyrics, audio visualizer, 10-band equalizer, and spatial acoustic rooms.

[![Latest Version](https://img.shields.io/github/v/release/Samar-019/Molten-Prism?label=version&color=00f5d4&style=for-the-badge)](https://github.com/Samar-019/Molten-Prism/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Samar-019/Molten-Prism/total?label=downloads&color=7b2cbf&style=for-the-badge)](https://github.com/Samar-019/Molten-Prism/releases)
[![Windows](https://img.shields.io/badge/Windows-10%20%7C%2011-0078D4?logo=windows11&logoColor=white&style=for-the-badge)](https://github.com/Samar-019/Molten-Prism/releases/latest)

![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![License MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)

[**⬇ Download Molten Prism v0.1.0 for Windows**](https://github.com/Samar-019/Molten-Prism/releases/tag/v0.1.0)

</div>

> [!IMPORTANT]
> Proyecto personal y no oficial. No está afiliado, autorizado ni respaldado por Google LLC ni por YouTube. "YouTube" y "YouTube Music" son marcas de Google LLC.

## Lo más destacado

### Letras como en Apple Music

Letra sincronizada, grande y centrada en la canción. Cada palabra se ilumina justo cuando se canta, sube un poco y brilla en las notas largas. Debajo de cada línea aparece la traducción a tu idioma.

### Sonido a tu gusto, sin salir del reproductor

El botón de ajustes rápidos de la cápsula abre un panel de vidrio con todo el audio:

- **Ecualizador** de 10 bandas con modos (Más graves, Voz, Electrónica, Rock…).
- **Fundido** entre canciones.
- **Audio espacial** para auriculares y **estéreo amplio**.
- **Salas** de reverberación: estudio, sala y auditorio.
- Estilo del fondo, de la barra de progreso y traducción de letras.

### Tu biblioteca a un clic

Menú lateral flotante con tus playlists, álbumes y artistas, en lista o en **cuadrícula de portadas grandes**. Barra superior con Inicio, Explorar y Biblioteca, buscador en píldora y el historial.

### Discord y Last.fm integrados

- **Estado de Discord** con la portada, el progreso de la canción y un botón para escucharla. Tú eliges el texto de "Escuchando…" y el icono pequeño, con vista previa en vivo.
- **Last.fm**: conecta tu cuenta autorizando la app o con usuario y contraseña, y registra lo que escuchas (scrobbling).

## Todas las funciones

- **Diseño "liquid glass"** inspirado en iOS 26: vidrio con refracción y aberración cromática en los bordes.
- **Fondo líquido** con los colores de la portada, en movimiento.
- **Portadas animadas** de Apple Music cuando la canción las tiene.
- **Visualizador en la portada**: ondas de luz que salen de sus bordes y la portada late con los graves.
- **Barra de progreso** precisa y fluida, con cuatro estilos: onda, onda con bolita, línea y línea con bolita.
- **Preferir música**: los videoclips se escuchan como canción y se ve la portada.
- **Arranque en pausa**: al abrir la app vuelve tu última canción, en pausa.
- **Controles en la barra de tareas de Windows** (anterior, pausa, siguiente) y la canción en el título de la ventana.
- **Resumen mensual** estilo Wrapped y estadísticas de escucha en tu perfil.
- **Sin publicidad de Premium** ni ventanas raras: diálogos centrados y menús de vidrio.

## Descargar e instalar

En [Releases](https://github.com/bbernalm/MusicSense/releases/latest) hay dos opciones para Windows de 64 bits:

- **MusicSense-Setup.exe**: instalador (crea el acceso directo y te deja elegir la carpeta).
- **MusicSense-portable.exe**: se abre sin instalar nada.

El programa no lleva firma digital: si Windows muestra "Windows protegió su PC", pulsa **Más información → Ejecutar de todas formas**.

## Qué es

MusicSense es una versión modificada de [Pear Desktop](https://github.com/pear-devs/pear-desktop) (antes `th-ch/youtube-music`), un cliente de YouTube Music hecho con Electron y TypeScript. Todo el diseño y las funciones nuevas viven en el complemento [`src/plugins/liquid-glass/`](src/plugins/liquid-glass/), que siempre está activo.

## Desarrollo

Requisitos: Node.js 22 o superior y pnpm 11 o superior.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Comprobaciones:

```bash
pnpm typecheck
pnpm lint
pnpm format:check
```

Instalador de Windows (cierra antes la app de desarrollo):

```bash
pnpm dist:win
```

Para traer las novedades de Pear Desktop (remoto `upstream`, solo lectura):

```bash
git fetch upstream
git merge upstream/master
```

## Hecho con IA

MusicSense se ha desarrollado con ayuda de **[Claude Code](https://claude.com/claude-code)**, el asistente de programación de Anthropic: la idea, el diseño y las pruebas son de una persona, y gran parte del código se escribió junto a la IA. Las notas que usa para trabajar en el proyecto están en [`CLAUDE.md`](CLAUDE.md).

## Créditos y licencia

Basado en [Pear Desktop](https://github.com/pear-devs/pear-desktop) y el trabajo de sus colaboradores. Estilo de letras inspirado en [Better Lyrics](https://github.com/better-lyrics/better-lyrics); portadas animadas gracias a [Better Lyrics Shaders](https://github.com/better-lyrics/shaders); fondo líquido con [Kawarp](https://www.npmjs.com/package/@kawarp/core). Se distribuye bajo la licencia MIT; ver [`license`](license).
