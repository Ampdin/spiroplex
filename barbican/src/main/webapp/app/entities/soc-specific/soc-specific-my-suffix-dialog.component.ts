import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { SocSpecificMySuffix } from './soc-specific-my-suffix.model';
import { SocSpecificMySuffixPopupService } from './soc-specific-my-suffix-popup.service';
import { SocSpecificMySuffixService } from './soc-specific-my-suffix.service';
import { SocBroadMySuffix, SocBroadMySuffixService } from '../soc-broad';
import { SkillsMySuffix, SkillsMySuffixService } from '../skills';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-soc-specific-my-suffix-dialog',
    templateUrl: './soc-specific-my-suffix-dialog.component.html'
})
export class SocSpecificMySuffixDialogComponent implements OnInit {

    socSpecific: SocSpecificMySuffix;
    isSaving: boolean;

    socbroads: SocBroadMySuffix[];

    skills: SkillsMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private socSpecificService: SocSpecificMySuffixService,
        private socBroadService: SocBroadMySuffixService,
        private skillsService: SkillsMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.socBroadService.query()
            .subscribe((res: ResponseWrapper) => { this.socbroads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.skillsService
            .query({filter: 'socspecific-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.socSpecific.skillsId) {
                    this.skills = res.json;
                } else {
                    this.skillsService
                        .find(this.socSpecific.skillsId)
                        .subscribe((subRes: SkillsMySuffix) => {
                            this.skills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.socSpecific, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.socSpecific.id !== undefined) {
            this.subscribeToSaveResponse(
                this.socSpecificService.update(this.socSpecific));
        } else {
            this.subscribeToSaveResponse(
                this.socSpecificService.create(this.socSpecific));
        }
    }

    private subscribeToSaveResponse(result: Observable<SocSpecificMySuffix>) {
        result.subscribe((res: SocSpecificMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SocSpecificMySuffix) {
        this.eventManager.broadcast({ name: 'socSpecificListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSocBroadById(index: number, item: SocBroadMySuffix) {
        return item.id;
    }

    trackSkillsById(index: number, item: SkillsMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-soc-specific-my-suffix-popup',
    template: ''
})
export class SocSpecificMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socSpecificPopupService: SocSpecificMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.socSpecificPopupService
                    .open(SocSpecificMySuffixDialogComponent as Component, params['id']);
            } else {
                this.socSpecificPopupService
                    .open(SocSpecificMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
