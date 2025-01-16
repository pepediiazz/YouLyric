import { exec } from 'child_process';
import { promisify } from 'util';

// Promisificar exec para usarlo con async/await
const execPromise = promisify(exec);

export class SpleeterAdapter {
  // Método para separar el audio con Spleeter
  public static async separateAudio(inputFile: string, outputDir: string): Promise<void> {
    try {
      // Comando Docker para ejecutar Spleeter y separar las pistas usando la imagen correcta
      const command = `docker run --rm \
      -v "${process.cwd()}/audio:/input" \
      -v "${process.cwd()}/audio/output:/output" \
      deezer/spleeter:3.8-2stems separate \
      -o /output /input/audio2.mp3`;
    

      // Ejecutamos el comando
      await execPromise(command);
      console.log('Separación completada con Spleeter.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al separar el audio con Spleeter: ${error.message}`);
      } else {
        throw new Error('Error desconocido al separar el audio con Spleeter');
      }
    }
  }

  // Método para reducir el ruido del audio usando FFmpeg
  public static async denoiseAudio(inputFile: string, outputFile: string): Promise<void> {
    try {
      // Comando Docker con rutas encerradas entre comillas dobles
      const command = `docker run --rm \
        -v "${process.cwd()}/audio:/audio" \
        jrottenberg/ffmpeg:latest \
        -i "/audio/output/audio2/vocals.wav" -af "afftdn=nf=-20:om=1" "/audio/output/audio2/vocals_denoised.wav"`;
  
      // Ejecutamos el comando
      await execPromise(command);
      console.log('Reducción de ruido completada con FFmpeg.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al reducir el ruido con FFmpeg: ${error.message}`);
      } else {
        throw new Error('Error desconocido al reducir el ruido con FFmpeg');
      }
    }
  }
  
}
