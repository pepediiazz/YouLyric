import express from 'express';
import cors from 'cors';  // Importar el paquete CORS
import { YouTubeController } from '../controllers/youtube.controller';

export class Server {
  private static app = express(); // Inicializa la app de Express
  private static port = 3000; // Puerto donde escuchará el servidor

  public static async start(): Promise<void> {
    console.log('Inicializando servidor...');

    // Habilitar CORS para permitir solicitudes desde cualquier origen
    this.app.use(cors());

    // Configuración para recibir datos en formato JSON
    this.app.use(express.json());

    // Ruta para procesar automáticamente el audio
    this.app.post('/process', async (req, res) => {
      await YouTubeController.handleAudioProcessing(req, res);
    });

    // Inicia el servidor en el puerto definido
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}
