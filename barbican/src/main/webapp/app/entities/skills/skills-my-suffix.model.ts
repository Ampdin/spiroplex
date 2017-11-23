import { BaseEntity } from './../../shared';

export class SkillsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public socSpecificSkName?: string,
        public socSpecificSkCode?: string,
        public anDaInLv?: number,
        public anDaInIm?: number,
        public asCaOthLv?: number,
        public asCaOthIm?: number,
        public coDevOthLv?: number,
        public coDevOthIm?: number,
        public coPerOutOrgLv?: number,
        public coPerOutOrgIm?: number,
        public coSupPeSubLv?: number,
        public coSupPeSubIm?: number,
        public conMaProLv?: number,
        public conMaProIm?: number,
        public cooWorActOthLv?: number,
        public cooWorActOthIm?: number,
        public devBuildTeamsLv?: number,
        public devBuildTeamsIm?: number,
        public devObjStratLv?: number,
        public devObjStratIm?: number,
        public docRecInfoLv?: number,
        public docRecInfoIm?: number,
        public drLayOutSpecLv?: number,
        public drLayOutSpecIm?: number,
        public estMaIntRelLv?: number,
        public estMaIntRelIm?: number,
    ) {
    }
}
