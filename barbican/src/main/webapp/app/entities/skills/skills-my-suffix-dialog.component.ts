import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SkillsMySuffix } from './skills-my-suffix.model';
import { SkillsMySuffixPopupService } from './skills-my-suffix-popup.service';
import { SkillsMySuffixService } from './skills-my-suffix.service';

@Component({
    selector: 'jhi-skills-my-suffix-dialog',
    templateUrl: './skills-my-suffix-dialog.component.html'
})
export class SkillsMySuffixDialogComponent implements OnInit {

    skills: SkillsMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private skillsService: SkillsMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skills.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillsService.update(this.skills));
        } else {
            this.subscribeToSaveResponse(
                this.skillsService.create(this.skills));
        }
    }

    private subscribeToSaveResponse(result: Observable<SkillsMySuffix>) {
        result.subscribe((res: SkillsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SkillsMySuffix) {
        this.eventManager.broadcast({ name: 'skillsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-skills-my-suffix-popup',
    template: ''
})
export class SkillsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillsPopupService: SkillsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skillsPopupService
                    .open(SkillsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.skillsPopupService
                    .open(SkillsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
