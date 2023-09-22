// index.d.ts
import { ContextMessageUpdate } from 'telegraf';

declare module 'telegraf/typings' {
  export interface ContextMessageUpdate {
    name: string; // example
  }
}