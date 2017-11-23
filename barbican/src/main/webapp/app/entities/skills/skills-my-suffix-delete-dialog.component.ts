import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SkillsMySuffix } from './skills-my-suffix.model';
import { SkillsMySuffixPopupService } from './skills-my-suffix-popup.service';
import { SkillsMySuffixService } from './skills-my-suffix.service';

@Component({
    selector: 'jhi-skills-my-suffix-delete-dialog',
    templateUrl: './skills-my-suffix-delete-dialog.component.html'
})
export class SkillsMySuffixDeleteDialogComponent {

    skills: SkillsMySuffix;

    constructor(
        private skillsService: SkillsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.skillsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'skillsListModification',
                content: 'Deleted an skills'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-skills-my-suffix-delete-popup',
    template: ''
})
export class SkillsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillsPopupService: SkillsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.skillsPopupService
                .open(SkillsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
