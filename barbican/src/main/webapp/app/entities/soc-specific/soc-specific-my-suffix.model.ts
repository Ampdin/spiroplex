import { BaseEntity } from './../../shared';

export const enum Group {
    'MAIN',
    'MAJOR',
    'ROLE',
    'TITLED'
}

export class SocSpecificMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public socSpecificName?: string,
        public socSpecificCode?: string,
        public socSpecificAvatorContentType?: string,
        public socSpecificAvator?: any,
        public socSpecificDescription?: string,
        public socSpecificURL?: string,
        public socSpecificPreviewImage?: string,
        public group?: Group,
        public totEmp?: number,
        public empPrse?: number,
        public hourlyMean?: number,
        public annualMean?: number,
        public meanPrse?: number,
        public hrPctHighest?: number,
        public hrPctHigh?: number,
        public hourlyMedian?: number,
        public hrPctBelow?: number,
        public hrPctLowest?: number,
        public anPctHighest?: number,
        public anPctHigh?: number,
        public annualMedian?: number,
        public anPctBelow?: number,
        public anPctLowest?: number,
        public socBroadId?: number,
        public skillsId?: number,
        public employees?: BaseEntity[],
    ) {
    }
}
