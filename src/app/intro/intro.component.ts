import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-intro',
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  public changeColor: boolean = false;
  private readonly initialCounter = 1;

  public counter = signal(0); // Se inicializa el signal con un valor
  public doubled = computed(() => this.counter() * 2);

  public counter$ = toObservable(this.counter);

  private timer$ = interval(1000).pipe(take(11));
  public timerSignal = toSignal(this.timer$, {
    initialValue: 0,
  });

  constructor() {
    this.counter.set(this.initialCounter); // Inicializa el valor

    effect(() => {
      if (this.counter() > 10) {
        this.changeColor = true;
      } else {
        this.changeColor = false;
      }
    });
  }

  public incrementCounter(): void {
    this.counter.set(this.counter() + 1);
  }

  public resetCounter(): void {
    this.counter.set(this.initialCounter);
  }
}
