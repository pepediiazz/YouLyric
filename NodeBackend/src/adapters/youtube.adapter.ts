import ytdl from '@distube/ytdl-core';

export class YouTubeAdapter {
  public static async downloadAudioStream(videoURL: string): Promise<NodeJS.ReadableStream> {
    try {
      return ytdl(videoURL, { filter: 'audioonly' });
    } catch (error) {
      // Aseguramos que error sea tratado como un Error
      if (error instanceof Error) {
        throw new Error(`Error al descargar el stream de YouTube: ${error.message}`);
      }
      throw new Error('Error desconocido al descargar el stream de YouTube');
    }
  }
}
