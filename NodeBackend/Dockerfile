# Usar una imagen base ligera de Python
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para Whisper y FFmpeg
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libsndfile1 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Instalar Whisper sin soporte para GPU
RUN pip install --no-cache-dir openai-whisper

# Establecer el comando por defecto (puedes cambiarlo si necesitas ejecutar algo específico)
CMD ["whisper", "--help"]
