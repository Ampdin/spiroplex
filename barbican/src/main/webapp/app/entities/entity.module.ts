import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BarbicanRegionMySuffixModule } from './region/region-my-suffix.module';
import { BarbicanCountryMySuffixModule } from './country/country-my-suffix.module';
import { BarbicanLocationMySuffixModule } from './location/location-my-suffix.module';
import { BarbicanDepartmentMySuffixModule } from './department/department-my-suffix.module';
import { BarbicanTaskMySuffixModule } from './task/task-my-suffix.module';
import { BarbicanEmployeeMySuffixModule } from './employee/employee-my-suffix.module';
import { BarbicanJobMySuffixModule } from './job/job-my-suffix.module';
import { BarbicanJobHistoryMySuffixModule } from './job-history/job-history-my-suffix.module';
import { BarbicanDisciplineMySuffixModule } from './discipline/discipline-my-suffix.module';
import { BarbicanProgramMySuffixModule } from './program/program-my-suffix.module';
import { BarbicanCourseMySuffixModule } from './course/course-my-suffix.module';
import { BarbicanLessonMySuffixModule } from './lesson/lesson-my-suffix.module';
import { BarbicanResourceMySuffixModule } from './resource/resource-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BarbicanRegionMySuffixModule,
        BarbicanCountryMySuffixModule,
        BarbicanLocationMySuffixModule,
        BarbicanDepartmentMySuffixModule,
        BarbicanTaskMySuffixModule,
        BarbicanEmployeeMySuffixModule,
        BarbicanJobMySuffixModule,
        BarbicanJobHistoryMySuffixModule,
        BarbicanDisciplineMySuffixModule,
        BarbicanProgramMySuffixModule,
        BarbicanCourseMySuffixModule,
        BarbicanLessonMySuffixModule,
        BarbicanResourceMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarbicanEntityModule {}
