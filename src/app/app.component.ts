import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DockService } from './service/dock.service';
import { DockItemMap } from './components/panels.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
})
export class AppComponent implements OnInit, OnDestroy {

  dockItems!: any[];
  ref!: DynamicDialogRef;
  dialogConfig!: any;

  constructor(private primengConfig: PrimeNGConfig, public dialogService: DialogService, public messageService: MessageService, private dockService: DockService) {
    this.dialogConfig = {
      width: '98vw',
      height: '98vh',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: false,
    }
  }

 
  show(label: String) {
    let component = DockItemMap.get(label);
    this.dialogConfig.header = label;
    this.ref = this.dialogService.open(component, this.dialogConfig);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.dockItems = this.dockService.getDockItems();
    this.addCommand();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  private addCommand(){
    this.dockItems.map(item => item.command = ()=>(this.show(item.label)));
  }
}