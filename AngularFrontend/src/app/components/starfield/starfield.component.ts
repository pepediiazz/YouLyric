import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-starfield',
  standalone: true,
  template: `<div class="starfield"></div>`,
  styles: [`
    .starfield {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: black;
      overflow: hidden;
    }
    .starfield canvas {
      display: block;
    }
  `]
})
export class StarfieldComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initializeStarfield();
  }

  private initializeStarfield() {
    const container = this.elementRef.nativeElement.querySelector('.starfield');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    const stars: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
    const numStars = 400;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      createStars();
    };

    const createStars = () => {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'grey';
        ctx.fill();

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener('resize', resizeCanvas);
  }
}
