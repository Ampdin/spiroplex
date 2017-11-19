import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CourseMySuffix } from './course-my-suffix.model';
import { CourseMySuffixService } from './course-my-suffix.service';

@Component({
    selector: 'jhi-course-my-suffix-detail',
    templateUrl: './course-my-suffix-detail.component.html'
})
export class CourseMySuffixDetailComponent implements OnInit, OnDestroy {

    course: CourseMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private courseService: CourseMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCourses();
    }

    load(id) {
        this.courseService.find(id).subscribe((course) => {
            this.course = course;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCourses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'courseListModification',
            (response) => this.load(this.course.id)
        );
    }
}
