import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    money: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  salvar() {
    console.log(this.form);
  }
}
