import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { DisciplineMySuffixPopupService } from './discipline-my-suffix-popup.service';
import { DisciplineMySuffixService } from './discipline-my-suffix.service';
import { ProgramMySuffix, ProgramMySuffixService } from '../program';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discipline-my-suffix-dialog',
    templateUrl: './discipline-my-suffix-dialog.component.html'
})
export class DisciplineMySuffixDialogComponent implements OnInit {

    discipline: DisciplineMySuffix;
    isSaving: boolean;

    programs: ProgramMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private disciplineService: DisciplineMySuffixService,
        private programService: ProgramMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.discipline, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discipline.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disciplineService.update(this.discipline));
        } else {
            this.subscribeToSaveResponse(
                this.disciplineService.create(this.discipline));
        }
    }

    private subscribeToSaveResponse(result: Observable<DisciplineMySuffix>) {
        result.subscribe((res: DisciplineMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DisciplineMySuffix) {
        this.eventManager.broadcast({ name: 'disciplineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProgramById(index: number, item: ProgramMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-discipline-my-suffix-popup',
    template: ''
})
export class DisciplineMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.disciplinePopupService
                    .open(DisciplineMySuffixDialogComponent as Component, params['id']);
            } else {
                this.disciplinePopupService
                    .open(DisciplineMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
