import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProgramMySuffix } from './program-my-suffix.model';
import { ProgramMySuffixPopupService } from './program-my-suffix-popup.service';
import { ProgramMySuffixService } from './program-my-suffix.service';

@Component({
    selector: 'jhi-program-my-suffix-delete-dialog',
    templateUrl: './program-my-suffix-delete-dialog.component.html'
})
export class ProgramMySuffixDeleteDialogComponent {

    program: ProgramMySuffix;

    constructor(
        private programService: ProgramMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.programService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'programListModification',
                content: 'Deleted an program'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-program-my-suffix-delete-popup',
    template: ''
})
export class ProgramMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private programPopupService: ProgramMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.programPopupService
                .open(ProgramMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
