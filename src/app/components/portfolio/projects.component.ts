import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Project } from 'src/app/domain/project';

@Component({
  selector: 'app-projects',
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
                <th>Id</th>
                <th>Title</th>
                <th>Github</th>
                <th>Demo</th>
                <th>Image</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
            <tr>
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td>{{item.github}}</td>
                <td>{{item.demo}}</td>
                <td>{{item.image}}</td>
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
            <label for="name">Title</label>
            <input type="text" pInputText id="name" [(ngModel)]="editItem!.title" autofocus />
            <small class="p-invalid" *ngIf="!editItem!.degree">title is required.</small>
        </div>
        <div class="p-field">
            <label for="github">Github</label>
            <input type="text" pInputText id="github" [(ngModel)]="editItem!.github" required autofocus />
        </div>
        <div class="p-field">
            <label for="demo">Demo</label>
            <input type="text" pInputText id="demo" [(ngModel)]="editItem!.demo"  autofocus />
        </div>
        <div class="p-field">
            <label for="image">Image</label>
            <input type="file" id="image" [(ngModel)]="editItem!.image"  autofocus />
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
export class ProjectsComponent implements OnInit {

  @Input() items!: any[];
  vid: number = 0;
  isOpen: boolean = false;
  editItem: any;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.items!.map(item => {
      item.id = this.vid++;
    })
  }

  openNew() {
    let le: any = new Project();
    le.vid = this.vid++;
    this.items!.push(le);
  }

  edit(item: any) {
    this.isOpen = true;
    this.editItem = { ...item };
  }

  deleteItem(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.title + '?',
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
    if (this.editItem!.title.trim()) {
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
