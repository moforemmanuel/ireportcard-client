import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rc-welcome',
  templateUrl: './rc-welcome.component.html',
  styleUrls: ['./rc-welcome.component.scss']
})
export class RcWelcomeComponent implements OnInit {
  features: {title: string, description: string, icon: string}[] = [
    {title: 'Easy to use', description: 'Easy to use, no need to learn anything', icon: 'pi pi-check-circle'},
    {title: 'Flexible', description: 'Flexible, you can use it in your project', icon: 'pi pi-replay'},
    {title: 'Lightweight', description: 'Lightweight, it\'s just a few KB', icon: 'pi pi-circle'},
    {title: 'Secure', description: 'Secure, it\'s encrypted', icon: 'pi pi-shield'},
    {title: 'Fast', description: 'Fast, it\'s just a few milliseconds', icon: 'pi pi-bolt'},
    {title: 'Open Source', description: 'Open Source, it\'s free to use', icon: 'pi pi-code'},
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

}
