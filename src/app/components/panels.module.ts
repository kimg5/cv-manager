import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabViewModule} from 'primeng/tabview';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {PickListModule} from 'primeng/picklist';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { ResumeSubmitComponent } from './resume-submit/resume-submit.component';
import { CareerWebComponent } from './career-web/career-web.component';
import { HeaderComponent } from './portfolio/header.component';
import { AboutComponent } from './portfolio/about.component';
import { SkillsComponent } from './portfolio/skills.component';
import { SkillPickListComponent } from './portfolio/skill-pick-list.component';
import { SkillItemComponent } from './portfolio/skill-item.component';

import { ItemComponent } from './password/item.component';
import { EducationComponent } from './portfolio/education.component';
import { SkillLevelComponent } from './portfolio/skill-level.component';
import { ProjectsComponent } from './portfolio/projects.component';
import { PreviewComponent } from './portfolio/preview.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    ProfileComponent,
    PasswordComponent,
    InterviewsComponent,
    ResumeSubmitComponent,
    CareerWebComponent,
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    SkillPickListComponent,
    SkillItemComponent,
    ItemComponent,
    EducationComponent,
    SkillLevelComponent,
    ProjectsComponent,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    ScrollPanelModule,
    TabViewModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    PickListModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule    
  ],
  exports:[
    PortfolioComponent,
    ProfileComponent,
    PasswordComponent,
    InterviewsComponent,
    ResumeSubmitComponent,
    CareerWebComponent
  ]
})
export class PanelsModule {}

export const DockItemMap = new Map();
DockItemMap.set('Portfolio',PortfolioComponent);
DockItemMap.set('Profile',ProfileComponent);
DockItemMap.set('Password',PasswordComponent);
DockItemMap.set('Theme',PortfolioComponent);
DockItemMap.set('Track',ProfileComponent);
DockItemMap.set('Submit',PasswordComponent);
DockItemMap.set('Interviews',PasswordComponent);
DockItemMap.set('Document',PortfolioComponent);
DockItemMap.set('Settings',ProfileComponent);
DockItemMap.set('Control',PasswordComponent);

