import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ProgramMySuffix } from './program-my-suffix.model';
import { ProgramMySuffixPopupService } from './program-my-suffix-popup.service';
import { ProgramMySuffixService } from './program-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { DisciplineMySuffix, DisciplineMySuffixService } from '../discipline';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-program-my-suffix-dialog',
    templateUrl: './program-my-suffix-dialog.component.html'
})
export class ProgramMySuffixDialogComponent implements OnInit {

    program: ProgramMySuffix;
    isSaving: boolean;

    courses: CourseMySuffix[];

    disciplines: DisciplineMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private programService: ProgramMySuffixService,
        private courseService: CourseMySuffixService,
        private disciplineService: DisciplineMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.disciplineService.query()
            .subscribe((res: ResponseWrapper) => { this.disciplines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.program, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.program.id !== undefined) {
            this.subscribeToSaveResponse(
                this.programService.update(this.program));
        } else {
            this.subscribeToSaveResponse(
                this.programService.create(this.program));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProgramMySuffix>) {
        result.subscribe((res: ProgramMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProgramMySuffix) {
        this.eventManager.broadcast({ name: 'programListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }

    trackDisciplineById(index: number, item: DisciplineMySuffix) {
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
    selector: 'jhi-program-my-suffix-popup',
    template: ''
})
export class ProgramMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programPopupService: ProgramMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.programPopupService
                    .open(ProgramMySuffixDialogComponent as Component, params['id']);
            } else {
                this.programPopupService
                    .open(ProgramMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
