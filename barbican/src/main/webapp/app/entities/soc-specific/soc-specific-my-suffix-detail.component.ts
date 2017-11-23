import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { SocSpecificMySuffix } from './soc-specific-my-suffix.model';
import { SocSpecificMySuffixService } from './soc-specific-my-suffix.service';

@Component({
    selector: 'jhi-soc-specific-my-suffix-detail',
    templateUrl: './soc-specific-my-suffix-detail.component.html'
})
export class SocSpecificMySuffixDetailComponent implements OnInit, OnDestroy {

    socSpecific: SocSpecificMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private socSpecificService: SocSpecificMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSocSpecifics();
    }

    load(id) {
        this.socSpecificService.find(id).subscribe((socSpecific) => {
            this.socSpecific = socSpecific;
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

    registerChangeInSocSpecifics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'socSpecificListModification',
            (response) => this.load(this.socSpecific.id)
        );
    }
}
