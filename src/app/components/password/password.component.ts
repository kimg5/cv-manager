import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  title = 'HTML';
  levels!: string[];
  
  constructor() { }

  ngOnInit(): void {
    this.levels = ['Experienced', 'Intermediate', 'Entry']
  }

}
