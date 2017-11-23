import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { SkillsMySuffix } from './skills-my-suffix.model';
import { SkillsMySuffixService } from './skills-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-skills-my-suffix',
    templateUrl: './skills-my-suffix.component.html'
})
export class SkillsMySuffixComponent implements OnInit, OnDestroy {
skills: SkillsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private skillsService: SkillsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.skillsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.skills = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.skillsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.skills = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SkillsMySuffix) {
        return item.id;
    }
    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe('skillsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
