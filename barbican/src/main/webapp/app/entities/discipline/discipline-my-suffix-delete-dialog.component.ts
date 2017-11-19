import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { DisciplineMySuffixPopupService } from './discipline-my-suffix-popup.service';
import { DisciplineMySuffixService } from './discipline-my-suffix.service';

@Component({
    selector: 'jhi-discipline-my-suffix-delete-dialog',
    templateUrl: './discipline-my-suffix-delete-dialog.component.html'
})
export class DisciplineMySuffixDeleteDialogComponent {

    discipline: DisciplineMySuffix;

    constructor(
        private disciplineService: DisciplineMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.disciplineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'disciplineListModification',
                content: 'Deleted an discipline'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discipline-my-suffix-delete-popup',
    template: ''
})
export class DisciplineMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.disciplinePopupService
                .open(DisciplineMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
