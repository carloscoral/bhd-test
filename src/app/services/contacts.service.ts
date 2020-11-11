import { Injectable } from '@angular/core';
import {Contact} from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[] = [];

  constructor() { }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }
}
