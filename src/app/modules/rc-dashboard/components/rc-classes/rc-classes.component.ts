import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
import {SectionService} from "../../../../services/section.service";
import {Section} from "../../../../models/dto/section.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rc-classes',
  templateUrl: './rc-classes.component.html',
  styleUrls: ['./rc-classes.component.scss']
})
export class RcClassesComponent implements OnInit {
  classMenuItems: MenuItem[] = [];
  classes: RcClass[] = [];
  sections: Section[] = [];
  sectionId: number = 0;
  constructor(
    private router: Router,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private sectionService: SectionService,
    private messageService: MessageService
  ) {
    this.classMenuItems = [
      {label: 'Edit', icon: 'pi pi-pencil',},
      {label: 'Delete', icon: 'pi pi-trash',}
    ]
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.sectionService.getAll().subscribe({
      next: (sections) => {
        this.sections = sections;
        this.loadClasses();
      }
    });
  }

  loadClasses(): void {
    const sectionId = this.sectionId;
    console.log(sectionId)
    this.classes = [];
    if (sectionId > 0) {
      this.classLevelService.getBySection(sectionId).subscribe({
        next: (classLevels: ClassLevel[]) => {
          classLevels.forEach((classLevel) => {
            this.loadClassSubs(classLevel);
          });
          this.sortClasses();
        },
        error: (error) => {
          addToMessageService(this.messageService, 'error', 'Error loading classes', `Server not responding.\n${error.message}`);
        }
      });
    }
  }

  sortClasses(): void {
    this.classes.sort((a, b) => {
      return a.classLevel.name.localeCompare(b.classLevel.name);
    })
  }

  deleteClassAction(classLevel: ClassLevel) {
    const confirmDelete = confirm(`Are you sure you want to delete this class: ${classLevel.name}?`)
    if (confirmDelete) {
      this.classLevelService.delete(classLevel).subscribe(
        (res) => addToMessageService(this.messageService, 'warn', 'Delete successful', res)
      )
    }
  }

  saveClassAction(classLevel?: ClassLevel) {
    if (!classLevel) {
      console.log('No class selected')
    } else {
      this.router.navigate([`/dashboard/class/${classLevel.id}`]).then();
    }
  }

  private loadClassSubs(classLevel: ClassLevel): void {
    this.classLevelSubService.getAllByClassLevelId(classLevel.id).subscribe({
      next: (classLevelSubs) => {
        this.classes.push({classLevel: classLevel, classLevelSubs: classLevelSubs})
      },
      error: (error) => {
        addToMessageService(this.messageService, 'error', 'Error loading class subs', error.message);
      }
    });
  }

  addClassLevelSubAction(classLevelId: number, value: string) {
    const classLevelSub: ClassLevelSub = {
      id: 0, name: value, classLevelId: classLevelId
    }
    this.classLevelSubService.save(classLevelSub).subscribe(() => {
      this.loadClasses();
    })
  }

  deleteClassSubAction(classLevelSubId: number, classLevel: ClassLevel) {
    this.classLevelSubService.delete(classLevelSubId).subscribe(() => this.loadClasses());
  }
}

type RcClass = {
  classLevel: ClassLevel,
  classLevelSubs: ClassLevelSub[],
}
