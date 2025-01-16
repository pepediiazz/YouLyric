import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transcription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.css'],
})
export class TranscriptionComponent {
  videoURL: string = '';
  model: string = 'base';
  language: string = 'en';
  transcription: string = '';
  formattedTranscription: string[] = [];
  transcriptionTitle: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isLoading = true;

    const data = {
      videoURL: this.videoURL,
      model: this.model,
      language: this.language,
    };

    this.http.post('http://localhost:3000/process', data, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.transcription = this.cleanTranscription(response);
        this.formattedTranscription = this.formatTranscription(this.transcription);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  // Elimina los timestamps y los caracteres innecesarios
  cleanTranscription(text: string): string {
    return text.replace(/\[.*?\]/g, '').replace(/\n/g, ' ').trim();
  }

  // Divide el texto en líneas cortas (máximo 80 caracteres por línea)
  formatTranscription(text: string): string[] {
    const maxLength = 80; // Máximo caracteres por línea
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }
}
