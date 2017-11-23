import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SkillsMySuffix } from './skills-my-suffix.model';
import { SkillsMySuffixService } from './skills-my-suffix.service';

@Component({
    selector: 'jhi-skills-my-suffix-detail',
    templateUrl: './skills-my-suffix-detail.component.html'
})
export class SkillsMySuffixDetailComponent implements OnInit, OnDestroy {

    skills: SkillsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private skillsService: SkillsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSkills();
    }

    load(id) {
        this.skillsService.find(id).subscribe((skills) => {
            this.skills = skills;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'skillsListModification',
            (response) => this.load(this.skills.id)
        );
    }
}
