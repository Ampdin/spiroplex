import { BaseEntity } from './../../shared';

export const enum Language {
    'ENGLISH',
    'SPANISH',
    'HUNGARIAN',
    'GERMAN',
    'FRENCH'
}

export class JobHistoryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public language?: Language,
        public jobId?: number,
        public departmentId?: number,
        public employeeId?: number,
    ) {
    }
}
