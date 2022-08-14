import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="flex justify-content-between align-items-center w-full fixed bottom-0 bg-indigo-600 text-white">
      <div class="p-3">
        <span class="text-center vertical-align-middle">Copyright &copy; {{ currentYear }}</span>
      </div>

      <div class="p-3">
        <button *ngFor="let button of buttons" pButton pRipple type="button" [icon]="button.icon"
                class="p-button-rounded mx-1"></button>&nbsp;
      </div>
    </div>
  `
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  buttons: { label: string, icon: string }[] = [
    {label: 'Facebook', icon: 'pi pi-fw pi-facebook'},
    {label: 'Twitter', icon: 'pi pi-fw pi-twitter'},
    {label: 'Instagram', icon: 'pi pi-fw pi-instagram'},
    {label: 'Github', icon: 'pi pi-fw pi-github'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
