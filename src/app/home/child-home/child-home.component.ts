import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, Subject, takeUntil } from 'rxjs';
import { username } from '../../signals/shared-signals';

@Component({
  selector: 'app-child-home',
  imports: [CommonModule],
  templateUrl: './child-home.component.html',
  styleUrl: './child-home.component.scss',
})
export class ChildHomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  public userName$: Observable<string>;
  constructor() {
    this.userName$ = toObservable(username);
  }

  handleClick() {
    username.set('Cambiado desde el hijo.');
  }

  ngOnInit(): void {
    this.userName$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('🚀 ~ ChildHomeComponent ~ ngOnInit ~ data:', data);
      return;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
