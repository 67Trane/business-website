import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { LanguageService } from '../../services/language';

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') private canvasRef?: ElementRef<HTMLCanvasElement>;

  protected readonly content = inject(LanguageService).content;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly zone = inject(NgZone);
  private readonly pointer = { x: null as number | null, y: null as number | null };
  private readonly pointerRadius = 175;
  private particles: Particle[] = [];
  private context?: CanvasRenderingContext2D;
  private resizeObserver?: ResizeObserver;
  private animationFrameId?: number;
  private width = 0;
  private height = 0;
  private previousFrameTime = 0;
  private reducedMotion = false;

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.canvasRef) {
      return;
    }

    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    this.context = context;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.canvasRef!.nativeElement);
      this.resizeCanvas();

      if (!this.reducedMotion) {
        this.animationFrameId = requestAnimationFrame(this.animate);
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  protected onPointerMove(event: PointerEvent): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || event.pointerType === 'touch') {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    this.pointer.x = event.clientX - bounds.left;
    this.pointer.y = event.clientY - bounds.top;
  }

  protected clearPointer(): void {
    this.pointer.x = null;
    this.pointer.y = null;
  }

  private readonly animate = (timestamp: number): void => {
    const elapsed = this.previousFrameTime
      ? Math.min((timestamp - this.previousFrameTime) / 16.67, 2)
      : 1;
    this.previousFrameTime = timestamp;
    this.drawScene(elapsed, true);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private resizeCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.context) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    this.width = Math.max(1, bounds.width);
    this.height = Math.max(1, bounds.height);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(this.width * pixelRatio);
    canvas.height = Math.round(this.height * pixelRatio);
    this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    this.createParticles();
    this.drawScene(1, false);
  }

  private createParticles(): void {
    const particleCount = Math.min(115, Math.max(36, Math.round((this.width * this.height) / 13000)));

    this.particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.18;

      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        radius: 1 + Math.random() * 1.6,
      };
    });
  }

  private drawScene(elapsed: number, moveParticles: boolean): void {
    const context = this.context;
    if (!context) {
      return;
    }

    context.clearRect(0, 0, this.width, this.height);

    for (const particle of this.particles) {
      if (moveParticles) {
        this.moveParticle(particle, elapsed);
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(121, 159, 255, 0.9)';
      context.fill();
    }

    this.connectParticles();
  }

  private moveParticle(particle: Particle, elapsed: number): void {
    if (particle.x <= 0 || particle.x >= this.width) {
      particle.velocityX *= -1;
    }
    if (particle.y <= 0 || particle.y >= this.height) {
      particle.velocityY *= -1;
    }

    if (this.pointer.x !== null && this.pointer.y !== null) {
      const deltaX = this.pointer.x - particle.x;
      const deltaY = this.pointer.y - particle.y;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > 0 && distance < this.pointerRadius) {
        const force = (this.pointerRadius - distance) / this.pointerRadius;
        particle.x -= (deltaX / distance) * force * 3.5;
        particle.y -= (deltaY / distance) * force * 3.5;
      }
    }

    particle.x += particle.velocityX * elapsed;
    particle.y += particle.velocityY * elapsed;
  }

  private connectParticles(): void {
    const context = this.context;
    if (!context) {
      return;
    }

    const connectionDistance = Math.min(165, Math.max(115, this.width / 8));
    const connectionDistanceSquared = connectionDistance * connectionDistance;

    for (let firstIndex = 0; firstIndex < this.particles.length; firstIndex += 1) {
      const first = this.particles[firstIndex];

      for (let secondIndex = firstIndex + 1; secondIndex < this.particles.length; secondIndex += 1) {
        const second = this.particles[secondIndex];
        const deltaX = first.x - second.x;
        const deltaY = first.y - second.y;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;

        if (distanceSquared >= connectionDistanceSquared) {
          continue;
        }

        const opacity = (1 - distanceSquared / connectionDistanceSquared) * 0.48;
        const pointerIsClose =
          this.pointer.x !== null &&
          this.pointer.y !== null &&
          Math.hypot(first.x - this.pointer.x, first.y - this.pointer.y) < this.pointerRadius;

        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.lineWidth = pointerIsClose ? 1.15 : 0.75;
        context.strokeStyle = pointerIsClose
          ? `rgba(219, 229, 255, ${Math.min(opacity * 1.8, 0.85)})`
          : `rgba(79, 124, 255, ${opacity})`;
        context.stroke();
      }
    }
  }
}
