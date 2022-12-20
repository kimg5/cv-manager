import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview',
  template: `
    <p-toolbar styleClass="mb-4 gap-2">
        <ng-template pTemplate="left">
            <button pButton label="Preview" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
        </ng-template>
    </p-toolbar>
  `,
  styles: [
  ]
})
export class PreviewComponent implements OnInit {

  @Input() projects! : any[];
  @Input() les! : any[];
  @Input() group! : FormGroup;
  @Input() skillMap? : Map<string,any>;
  constructor() { }

  ngOnInit(): void {
  }

  openNew() {
    console.log(this.projects);
    console.log(this.les);
    console.log(this.group);
    console.log(this.skillMap)
  }

}
