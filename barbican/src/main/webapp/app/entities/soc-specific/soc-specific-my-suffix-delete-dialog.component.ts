import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SocSpecificMySuffix } from './soc-specific-my-suffix.model';
import { SocSpecificMySuffixPopupService } from './soc-specific-my-suffix-popup.service';
import { SocSpecificMySuffixService } from './soc-specific-my-suffix.service';

@Component({
    selector: 'jhi-soc-specific-my-suffix-delete-dialog',
    templateUrl: './soc-specific-my-suffix-delete-dialog.component.html'
})
export class SocSpecificMySuffixDeleteDialogComponent {

    socSpecific: SocSpecificMySuffix;

    constructor(
        private socSpecificService: SocSpecificMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.socSpecificService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'socSpecificListModification',
                content: 'Deleted an socSpecific'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-soc-specific-my-suffix-delete-popup',
    template: ''
})
export class SocSpecificMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socSpecificPopupService: SocSpecificMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.socSpecificPopupService
                .open(SocSpecificMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
