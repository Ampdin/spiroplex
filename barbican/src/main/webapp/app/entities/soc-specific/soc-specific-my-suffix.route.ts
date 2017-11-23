import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SocSpecificMySuffixComponent } from './soc-specific-my-suffix.component';
import { SocSpecificMySuffixDetailComponent } from './soc-specific-my-suffix-detail.component';
import { SocSpecificMySuffixPopupComponent } from './soc-specific-my-suffix-dialog.component';
import { SocSpecificMySuffixDeletePopupComponent } from './soc-specific-my-suffix-delete-dialog.component';

@Injectable()
export class SocSpecificMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const socSpecificRoute: Routes = [
    {
        path: 'soc-specific-my-suffix',
        component: SocSpecificMySuffixComponent,
        resolve: {
            'pagingParams': SocSpecificMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.socSpecific.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'soc-specific-my-suffix/:id',
        component: SocSpecificMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.socSpecific.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socSpecificPopupRoute: Routes = [
    {
        path: 'soc-specific-my-suffix-new',
        component: SocSpecificMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.socSpecific.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'soc-specific-my-suffix/:id/edit',
        component: SocSpecificMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.socSpecific.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'soc-specific-my-suffix/:id/delete',
        component: SocSpecificMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.socSpecific.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
