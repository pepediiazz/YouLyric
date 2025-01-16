# YouLirics Backend

Este es el backend del proyecto **YouLirics**. Está implementado en Node.js con Express y se encarga de procesar las solicitudes, extraer audio de YouTube y obtener la letra de la canción utilizando Whisper.

## Tecnologías

- **Node.js** con **Express**
- **Fluent-FFmpeg** para manipulación de audio
- **DisTube** para obtener el audio de YouTube
- **Whisper** para la transcripción de audio
- **Docker**:
  - Usa la imagen `deezer/spleeter:3.8-2stems` para separar la voz de la pista.
  - Usa la imagen `jrottenberg/ffmpeg:latest` para mejorar la calidad del audio.

## Instalación

1. Clona este repositorio:

   cd NodeBackend

2. Instala las dependencias:

   npm install

3. Levanta el servidor de desarrollo:

   npm run dev

   Esto ejecutará el backend en modo desarrollo.

Levantar el Dockerfile
Este proyecto incluye un contenedor Docker que utiliza Python 3.10 con Whisper y FFmpeg instalados. Whisper se usa para la transcripción de audio y FFmpeg para la manipulación de archivos de medios.

Pasos para construir la imagen Docker:
Asegúrate de tener Docker instalado en tu máquina.

En el directorio raíz del proyecto (donde se encuentra el Dockerfile), ejecuta el siguiente comando para construir la imagen:
docker build -t youlirics-backend .
La aplicación se encargará de levantar el contenedor automáticamente cuando sea necesario.

## Nota sobre Whisper para CPU y GPU
Actualmente, Whisper está instalado para funcionar en la CPU. Si deseas usar la GPU, necesitas modificar el Dockerfile para instalar Whisper con soporte para GPU.