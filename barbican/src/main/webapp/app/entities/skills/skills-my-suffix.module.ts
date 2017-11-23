import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarbicanSharedModule } from '../../shared';
import {
    SkillsMySuffixService,
    SkillsMySuffixPopupService,
    SkillsMySuffixComponent,
    SkillsMySuffixDetailComponent,
    SkillsMySuffixDialogComponent,
    SkillsMySuffixPopupComponent,
    SkillsMySuffixDeletePopupComponent,
    SkillsMySuffixDeleteDialogComponent,
    skillsRoute,
    skillsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skillsRoute,
    ...skillsPopupRoute,
];

@NgModule({
    imports: [
        BarbicanSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SkillsMySuffixComponent,
        SkillsMySuffixDetailComponent,
        SkillsMySuffixDialogComponent,
        SkillsMySuffixDeleteDialogComponent,
        SkillsMySuffixPopupComponent,
        SkillsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SkillsMySuffixComponent,
        SkillsMySuffixDialogComponent,
        SkillsMySuffixPopupComponent,
        SkillsMySuffixDeleteDialogComponent,
        SkillsMySuffixDeletePopupComponent,
    ],
    providers: [
        SkillsMySuffixService,
        SkillsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarbicanSkillsMySuffixModule {}
