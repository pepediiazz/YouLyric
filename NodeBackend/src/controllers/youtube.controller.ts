import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { YouTubeModel } from '../models/youtube.model';
import { SpleeterAdapter } from '../adapters/spleeter.adapter';
import { WhisperAdapter } from '../adapters/whisper.adapter';

export class YouTubeController {
  public static async handleAudioProcessing(req: Request, res: Response): Promise<void> {
    const { videoURL, model, language } = req.body;

    if (!videoURL || !model || !language) {
      res.status(400).send('Error: Faltan los parámetros "videoURL", "model" o "language".');
      return;
    }

    const filePath = './audio/audio2.mp3';  // Ruta del archivo descargado
    const outputDir = './audio/output';
    const outputVocalsDir = path.join(outputDir, 'audio2');
    const outputDenoisedFile = path.join(outputVocalsDir, 'vocals_denoised.wav');

    try {
      // 1. Eliminar archivos temporales anteriores si existen
      console.log('Eliminando archivos temporales...');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);  // Eliminar archivo descargado
        console.log(`Archivo eliminado: ${filePath}`);
      }
      if (fs.existsSync(outputVocalsDir)) {
        fs.rmdirSync(outputVocalsDir, { recursive: true });  // Eliminar directorio de vocales
        console.log(`Directorio eliminado: ${outputVocalsDir}`);
      }

      // 2. Descargar el audio desde YouTube
      console.log('Iniciando la descarga desde YouTube...');
      await YouTubeModel.downloadAudioToFile(videoURL, filePath);
      console.log(`Descarga completada. Archivo guardado en: ${filePath}`);

      // Verificar si el archivo se descargó correctamente
      if (!fs.existsSync(filePath)) {
        throw new Error('El archivo de audio no se descargó correctamente.');
      }

      // 3. Separar las pistas de audio
      console.log('Iniciando separación de audio...');
      await SpleeterAdapter.separateAudio(filePath, outputDir);
      console.log(`Separación completada. Archivos guardados en: ${outputDir}`);

      // Verificar que la separación generó los archivos esperados
      if (!fs.existsSync(outputVocalsDir)) {
        throw new Error('La separación de pistas no generó los archivos esperados.');
      }

      // 4. Reducir el ruido de la pista vocal
      const inputVocalsFile = path.join(outputVocalsDir, 'vocals.wav');
      console.log('Iniciando reducción de ruido...');
      await SpleeterAdapter.denoiseAudio(inputVocalsFile, outputDenoisedFile);
      console.log(`Reducción de ruido completada. Archivo guardado en: ${outputDenoisedFile}`);

      // Verificar que el archivo de audio denoise exista
      if (!fs.existsSync(outputDenoisedFile)) {
        throw new Error('El archivo de audio denoise no se generó correctamente.');
      }

      // 5. Transcribir el audio con Whisper
      console.log('Iniciando transcripción con Whisper...');
      const transcription = await WhisperAdapter.transcribeAudio(outputDenoisedFile, model, language);
      console.log('Transcripción completada.');

      // 6. Enviar la transcripción al frontend
      res.json( transcription );

    } catch (error) {
      
      console.error('Error en el procesamiento:', error);
      res.status(500).send(`Error en el procesamiento: ${error instanceof Error ? error.message : 'desconocido'}`);
    }
  }
}
