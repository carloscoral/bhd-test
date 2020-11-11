import {Phone} from './Phone';

export interface Contact {
  name: string;
  birthday: Date;
  age?: number;
  phones: Phone[];
}
