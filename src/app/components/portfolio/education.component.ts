import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LearningExperience } from 'src/app/domain/learning-experience';

@Component({
  selector: 'app-education',
  template: `
  <p-card >
    <p-toolbar styleClass="mb-4 gap-2">
        <ng-template pTemplate="left">
            <button pButton label="New" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
        </ng-template>
    </p-toolbar>

    <p-table #dt [value]="items!" [tableStyle]="{'min-width': '75rem'}"
        [rowHover]="true" dataKey="id">
        <ng-template pTemplate="header">
            <tr>
                <th style="min-width:15rem">Degree</th>
                <th>School</th>
                <th>City</th>
                <th>Country</th>
                <th>Start Time</th>
                <th>End Time</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
            <tr>
                <td>{{item.degree}}</td>
                <td>{{item.school}}</td>
                <td>{{item.city}}</td>
                <td>{{item.country}}</td>
                <td>{{item.startTime}}</td>
                <td>{{item.endTime}}</td>
                <td>
                    <button pButton icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="edit(item)"></button>
                    <button pButton icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteItem(item)"></button>
                </td>
            </tr>
        </ng-template>
      </p-table>

      <p-dialog [(visible)]="isOpen" [style]="{width: '450px'}" header="Details" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <div class="p-field">
            <label for="name">Degree</label>
            <input type="text" pInputText id="name" [(ngModel)]="editItem!.degree" autofocus />
            <small class="p-invalid" *ngIf="!editItem!.degree">Degree is required.</small>
        </div>
        <div class="p-field">
            <label for="school">School</label>
            <input type="text" pInputText id="school" [(ngModel)]="editItem!.school" required autofocus />
        </div>
        <div class="p-field">
            <label for="city">City</label>
            <input type="text" pInputText id="city" [(ngModel)]="editItem!.city"  autofocus />
        </div>
        <div class="p-field">
            <label for="country">Country</label>
            <input type="text" pInputText id="country" [(ngModel)]="editItem!.country"  autofocus />
        </div>
        <div class="p-field">
            <label for="starttime">Start Time</label>
            <input type="text" pInputText id="starttime" [(ngModel)]="editItem!.startTime" required autofocus />
        </div>
        <div class="p-field">
            <label for="endtime">End Time</label>
            <input type="text" pInputText id="endtime" [(ngModel)]="editItem!.endTime" required autofocus />
        </div>
      </ng-template>
    
      <ng-template pTemplate="footer">
        <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
        <button pButton pRipple label="Save" icon="pi pi-check" class="p-button-text" (click)="save()"></button>
      </ng-template>
    </p-dialog>

    <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
  </p-card>
  `,
  providers: [ConfirmationService]
})
export class EducationComponent implements OnInit {

  @Input() items!: any[];

  vid: number = 0;
  isOpen: boolean = false;
  editItem: any;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.items!.map(item => {
      item.vid = this.vid++;
    })
  }

  openNew() {
    let le: any = new LearningExperience();
    le.vid = this.vid++;
    this.items!.push(le);
  }

  edit(item: any) {
    this.isOpen = true;
    this.editItem = { ...item };
  }

  deleteItem(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.school + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let index = this.findIndexByVid(item.vid);
        if (index != -1)
          this.items!.splice(index, 1);
      }
    });
  }

  hideDialog() {
    this.isOpen = false;
  }

  save() {
    if (this.editItem!.school.trim()) {
      let index = this.findIndexByVid(this.editItem.vid);
      if (index != -1) this.items![index] = { ...this.editItem };
      this.items = [...this.items!];
      this.editItem = {};
    }
    this.isOpen = false;
  }

  findIndexByVid(vid: number): number {
    for (let i = 0; i < this.items!.length; i++) {
      if (this.items![i].vid === vid)
        return i;
    }
    return -1;
  }
}