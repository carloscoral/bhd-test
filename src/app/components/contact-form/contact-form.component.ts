import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {ContactsService} from '../../services/contacts.service';
import {Contact} from '../../models/Contact';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  items: FormArray;
  phoneTypes: string[] = [
    'Residencial', 'Trabajo', 'Movil', 'Otros'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]{1,35}$/)]),
      birthday: new FormControl(''),
      age: new FormControl(''),
      phones: this.formBuilder.array([ this.createPhone() ])
    });
    this.items = this.contactForm.get('phones') as FormArray;
  }

  createPhone(): FormGroup {
    return this.formBuilder.group({
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(809|829|849)[0-9]+$/)]),
      type: new FormControl(''),
      main: new FormControl()
    });
  }

  addPhone(): void {
    this.items.push(this.createPhone());
  }

  validateMain(index: number): void {
    const phones = this.contactForm.controls.phones as FormArray;
    let counter = 0;
    for ( let i = 0; i < phones.length; i++ ) {
      const phone = phones.at(i) as FormGroup;
      if ( phone.controls.main.value ) {
        counter ++;
      }
    }
    if (counter > 1) {
      this.contactForm.controls.phones.get(`${index}`).setValue(false);
      alert('This contact has a main phone');
    }
  }

  saveContact(event: Event): void {
    event.preventDefault();
    this.calculateAge();
    if ( this.contactForm.valid ) {
      const contact = this.contactForm.value as Contact;
      this.contactsService.addContact(contact);
    }
    console.log(this.contactForm);
    console.log(this.contactForm.value);
  }

  calculateAge(): void {
    const birthday = this.contactForm.controls.birthday.value;
    if ( birthday ) {
      const birthdayDate = moment(birthday);
      const currentDate = moment();
      const difference = currentDate.diff(birthdayDate, 'year');
      this.contactForm.controls.age.setValue(difference);
    }
  }

}
