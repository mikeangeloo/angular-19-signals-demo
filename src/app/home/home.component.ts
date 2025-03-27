import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { username } from '../signals/shared-signals';
import { ChildHomeComponent } from './child-home/child-home.component';

@Component({
  selector: 'app-home',
  imports: [ChildHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public userNameData = computed(() => {
    return {
      label: `Valor ingresado: ${username()}`,
      value: username(),
    };
  });

  public componentUserName = signal<string>('');

  constructor() {
    effect(() => {
      console.log('🚀 ~ HomeComponent ~ effect ~ username():', username());
    });
  }
  ngOnInit(): void {}

  handleInputChange(data: string | undefined) {
    const inputData = data || '';
    username.set(inputData);

    this.componentUserName.set(inputData);
  }
}
