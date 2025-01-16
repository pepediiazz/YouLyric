import * as fs from 'fs';
import { YouTubeAdapter } from '../adapters/youtube.adapter';

export class YouTubeModel {
  public static async downloadAudioToFile(videoURL: string, filePath: string): Promise<void> {
    try {
      const audioStream = await YouTubeAdapter.downloadAudioStream(videoURL);
      const fileStream = fs.createWriteStream(filePath);

      return new Promise((resolve, reject) => {
        audioStream.pipe(fileStream);
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al guardar el audio en el archivo: ${error.message}`);
      }
      throw new Error('Error desconocido al guardar el archivo de audio');
    }
  }
}
