import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SkillsMySuffixComponent } from './skills-my-suffix.component';
import { SkillsMySuffixDetailComponent } from './skills-my-suffix-detail.component';
import { SkillsMySuffixPopupComponent } from './skills-my-suffix-dialog.component';
import { SkillsMySuffixDeletePopupComponent } from './skills-my-suffix-delete-dialog.component';

export const skillsRoute: Routes = [
    {
        path: 'skills-my-suffix',
        component: SkillsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.skills.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'skills-my-suffix/:id',
        component: SkillsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.skills.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skillsPopupRoute: Routes = [
    {
        path: 'skills-my-suffix-new',
        component: SkillsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.skills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skills-my-suffix/:id/edit',
        component: SkillsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.skills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'skills-my-suffix/:id/delete',
        component: SkillsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barbicanApp.skills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
