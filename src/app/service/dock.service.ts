import { Injectable } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DockService {

  static dockItemsOfAdmin = [
    {
      id: 'Portfolio',
      label: 'Portfolio',
      icon: 'assets/images/dock/tools1.png',
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: 'assets/images/dock/user1.png',
    },
    {
      id: 'Password',
      label: 'Password',
      icon: 'assets/images/dock/password.png'
    },
    {
      id: 'Theme',
      label: 'Theme',
      icon: 'assets/images/dock/theme.png'
    },
    {
      id: 'Track',
      label: 'Track',
      icon: 'assets/images/dock/note.png'
    },
    {
      id: 'Submit',
      label: 'Resume Submit',
      icon: 'assets/images/dock/launch4.png'
    },
    {
      id: 'Interviews',
      label: 'Interviews',
      icon: 'assets/images/dock/chart-mac.png'
    },
    {
      id: 'Document',
      label: 'Career Web sites',
      icon: 'assets/images/dock/document.png'
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: 'assets/images/dock/settings.png'
    },
    {
      id: 'Control',
      label: 'Control',
      icon: 'assets/images/dock/search.png'
    }
  ];

  static dockItems = [
    {
      id: 'Portfolio',
      label: 'Portfolio',
      icon: 'assets/images/dock/tools1.png',
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: 'assets/images/dock/user1.png',
    },
    {
      id: 'Password',
      label: 'Password',
      icon: 'assets/images/dock/password.png'
    },
    {
      id: 'Theme',
      label: 'Theme',
      icon: 'assets/images/dock/theme.png'
    },
    {
      id: 'Track',
      label: 'Track',
      icon: 'assets/images/dock/note.png'
    },
    {
      id: 'Submit',
      label: 'Resume Submit',
      icon: 'assets/images/dock/launch4.png'
    },
    {
      id: 'Interviews',
      label: 'Interviews',
      icon: 'assets/images/dock/chart-mac.png'
    },
    {
      id: 'Document',
      label: 'Career Web sites',
      icon: 'assets/images/dock/document.png'
    }
  ];

  constructor(public messageService: MessageService) { }

  getDockItems(): MenuItem[] {
    return DockService.dockItems;
  }

  getDockItemsOfAdmin(): MenuItem[] {
    return DockService.dockItemsOfAdmin;
  }
}
