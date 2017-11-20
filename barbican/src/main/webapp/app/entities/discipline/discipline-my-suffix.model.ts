import { BaseEntity } from './../../shared';

export class DisciplineMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public disciplineName?: string,
        public disciplineAvatorContentType?: string,
        public disciplineAvator?: any,
        public disciplineDescription?: string,
        public disciplinePrice?: number,
        public resources?: BaseEntity[],
        public employees?: BaseEntity[],
        public programs?: BaseEntity[],
    ) {
    }
}
