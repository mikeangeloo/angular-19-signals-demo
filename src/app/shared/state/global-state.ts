import { signal, WritableSignal } from '@angular/core';

export const sharedMessage: WritableSignal<string> = signal<string>('Hola');
