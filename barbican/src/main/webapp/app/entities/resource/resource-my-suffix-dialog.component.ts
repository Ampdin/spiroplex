import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResourceMySuffixPopupService } from './resource-my-suffix-popup.service';
import { ResourceMySuffixService } from './resource-my-suffix.service';
import { DisciplineMySuffix, DisciplineMySuffixService } from '../discipline';
import { ProgramMySuffix, ProgramMySuffixService } from '../program';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { LessonMySuffix, LessonMySuffixService } from '../lesson';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resource-my-suffix-dialog',
    templateUrl: './resource-my-suffix-dialog.component.html'
})
export class ResourceMySuffixDialogComponent implements OnInit {

    resource: ResourceMySuffix;
    isSaving: boolean;

    disciplines: DisciplineMySuffix[];

    programs: ProgramMySuffix[];

    courses: CourseMySuffix[];

    lessons: LessonMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private resourceService: ResourceMySuffixService,
        private disciplineService: DisciplineMySuffixService,
        private programService: ProgramMySuffixService,
        private courseService: CourseMySuffixService,
        private lessonService: LessonMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.disciplineService.query()
            .subscribe((res: ResponseWrapper) => { this.disciplines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.programService.query()
            .subscribe((res: ResponseWrapper) => { this.programs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.lessonService.query()
            .subscribe((res: ResponseWrapper) => { this.lessons = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.resource, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resourceService.update(this.resource));
        } else {
            this.subscribeToSaveResponse(
                this.resourceService.create(this.resource));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResourceMySuffix>) {
        result.subscribe((res: ResourceMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ResourceMySuffix) {
        this.eventManager.broadcast({ name: 'resourceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDisciplineById(index: number, item: DisciplineMySuffix) {
        return item.id;
    }

    trackProgramById(index: number, item: ProgramMySuffix) {
        return item.id;
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }

    trackLessonById(index: number, item: LessonMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resource-my-suffix-popup',
    template: ''
})
export class ResourceMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resourcePopupService: ResourceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resourcePopupService
                    .open(ResourceMySuffixDialogComponent as Component, params['id']);
            } else {
                this.resourcePopupService
                    .open(ResourceMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
