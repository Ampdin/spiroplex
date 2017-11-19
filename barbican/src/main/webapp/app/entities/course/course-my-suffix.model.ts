import { BaseEntity } from './../../shared';

export const enum Level {
    'NOVICE',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'PROFESSIONAL'
}

export class CourseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public courseTitle?: string,
        public courseAvatorContentType?: string,
        public courseAvator?: any,
        public courseDescription?: string,
        public coursePrice?: number,
        public courseLevel?: Level,
        public resources?: BaseEntity[],
        public lessons?: BaseEntity[],
        public programs?: BaseEntity[],
    ) {
    }
}
