# YouLirics

**YouLirics** es una aplicación que te permite extraer la letra de una canción a partir de un enlace de YouTube. La aplicación está compuesta por un backend desarrollado en Node.js, un contenedor Docker para procesamiento de audio, y un frontend desarrollado en Angular.

## Estructura del Proyecto

- **Frontend**: Implementado con Angular. Se encarga de la interfaz de usuario.
- **Backend**: Implementado con Node.js y Express. Procesa las solicitudes, extrae audio de YouTube y obtiene la letra.
- **Docker**: Utiliza Docker para procesar el audio:
  - **Spleeter**: Usando la imagen `deezer/spleeter:3.8-2stems` para separar la voz de la pista.
  - **FFmpeg**: Usando la imagen `jrottenberg/ffmpeg:latest` para mejorar la calidad del audio.

### Instrucciones de Instalación

Para instalar y ejecutar el proyecto completo, sigue las instrucciones en los respectivos directorios:

1. **Frontend**: [Instrucciones en AngularFrontend/README.md]
2. **Backend**: [Instrucciones en NodeBackend/README.md]

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo `LICENSE`.
