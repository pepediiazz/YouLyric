import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranscriptionComponent } from './components/transcription/transcription.component';
import { StarfieldComponent } from "./components/starfield/starfield.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranscriptionComponent, StarfieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-Whisper';
}
