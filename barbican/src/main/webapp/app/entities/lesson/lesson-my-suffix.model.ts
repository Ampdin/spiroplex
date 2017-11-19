import { BaseEntity } from './../../shared';

export const enum Language {
    'ENGLISH',
    'SPANISH',
    'HUNGARIAN',
    'GERMAN',
    'FRENCH'
}

export class LessonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public lessonTitle?: string,
        public lessonAvatorContentType?: string,
        public lessonAvator?: any,
        public lessonDescription?: string,
        public language?: Language,
        public resources?: BaseEntity[],
        public courses?: BaseEntity[],
    ) {
    }
}
