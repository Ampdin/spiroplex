import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { LessonMySuffixPopupService } from './lesson-my-suffix-popup.service';
import { LessonMySuffixService } from './lesson-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lesson-my-suffix-dialog',
    templateUrl: './lesson-my-suffix-dialog.component.html'
})
export class LessonMySuffixDialogComponent implements OnInit {

    lesson: LessonMySuffix;
    isSaving: boolean;

    courses: CourseMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private lessonService: LessonMySuffixService,
        private courseService: CourseMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.lesson, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lessonService.update(this.lesson));
        } else {
            this.subscribeToSaveResponse(
                this.lessonService.create(this.lesson));
        }
    }

    private subscribeToSaveResponse(result: Observable<LessonMySuffix>) {
        result.subscribe((res: LessonMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LessonMySuffix) {
        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
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
    selector: 'jhi-lesson-my-suffix-popup',
    template: ''
})
export class LessonMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lessonPopupService
                    .open(LessonMySuffixDialogComponent as Component, params['id']);
            } else {
                this.lessonPopupService
                    .open(LessonMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
