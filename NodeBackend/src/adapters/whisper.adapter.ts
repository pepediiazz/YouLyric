import { exec } from 'child_process';

export class WhisperAdapter {
  public static async transcribeAudio(
    inputFile: string,
    model: string,
    language: string
  ): Promise<string> {  // Solo devuelve la transcripción como string
    console.log('Ruta del archivo:', inputFile);
    console.log('Modelo:', model);
    console.log('Idioma:', language);

    // Depuración de la ruta generada para Docker
    const dockerFilePath = `/mnt/${inputFile.replace(/\\/g, '/')}`;
    console.log('Ruta de archivo para Docker:', dockerFilePath);

    const command = `docker run --rm \
      -v "${process.cwd()}:/mnt" \
      whisper-with-ffmpeg:latest whisper \
      ${dockerFilePath} --model ${model} --language ${language}`;

    console.log('Comando ejecutado:', command);

    const child = exec(command);

    let transcriptionResult = ''; // Almacenar el resultado de la transcripción

    // Captura la salida estándar línea por línea
    child.stdout?.on('data', (data) => {
      process.stdout.write(data); // Escribe directamente sin almacenar en un búfer
      transcriptionResult += data.toString(); // Acumula el resultado de la transcripción
    });

    // Captura errores y envía mensajes relevantes
    child.stderr?.on('data', (data) => {
      console.error('Error:', data.toString());
    });

    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve(transcriptionResult); // Retorna el resultado final de la transcripción
        } else {
          reject(new Error(`Proceso Whisper terminado con código ${code}`));
        }
      });
    });
  }
}

