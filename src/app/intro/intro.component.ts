import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, RouterLink],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  public changeColor: boolean = false;
  private readonly initialCounter = 1;

  public counter = signal<number>(0); // Se inicializa el signal con un valor
  public doubled = computed<number>(() => this.counter() * 2);

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

  ngOnInit(): void {}

  public incrementCounter(): void {
    this.counter.set(this.counter() + 1);
  }

  public resetCounter(): void {
    this.counter.set(this.initialCounter);
  }
}
