import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DockService } from '../service/dock.service';
import { DockItemMap } from '../components/panels.module';
import { PortfolioService } from '../service/portfolio.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  providers: [DialogService],
})
export class DockComponent implements OnInit, OnDestroy {

  dockItems!: any[];
  ref!: DynamicDialogRef;
  dialogConfig!: any;

  constructor(private router: Router, public authService: AuthService, public dialogService: DialogService, public messageService: MessageService, private dockService: DockService, private portfolioService: PortfolioService) {
    this.dialogConfig = {
      width: '98vw',
      height: '98vh',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: false,
    }
  }

  ngOnInit() {
    this.dockItems = this.dockService.getDockItems();
    this.addCommand();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  private addCommand() {
    this.dockItems.map(item => item.command = () => (this.show(item.label)));
  }

  show(label: String) {
    console.log(label);
    let component = DockItemMap.get(label);
    this.dialogConfig.header = label;
    this.ref = this.dialogService.open(component, this.dialogConfig);

    if (label === 'Portfolio') {
      if (this.authService.isLoggedIn) {
        this.portfolioService.getPortfolio(this.authService.username);
      } else {
        this.router.navigate(['/login']);
      }

    }

  }

}
