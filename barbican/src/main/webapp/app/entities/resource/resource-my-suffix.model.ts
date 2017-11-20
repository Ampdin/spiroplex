import { BaseEntity } from './../../shared';

export const enum ResourceType {
    'VIDEO',
    'IMAGE',
    'TUTORIAL',
    'PAGE',
    'PARTIAL',
    'TOOL'
}

export class ResourceMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public resourceName?: string,
        public resourceAvatorContentType?: string,
        public resourceAvator?: any,
        public resourceDescription?: string,
        public resourceURL?: string,
        public resourcePreviewImage?: string,
        public resourceType?: ResourceType,
        public weight?: number,
        public disciplineId?: number,
        public programId?: number,
        public courseId?: number,
        public lessonId?: number,
    ) {
    }
}
