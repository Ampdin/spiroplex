import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Skills e2e test', () => {

    let navBarPage: NavBarPage;
    let skillsDialogPage: SkillsDialogPage;
    let skillsComponentsPage: SkillsComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Skills', () => {
        navBarPage.goToEntity('skills-my-suffix');
        skillsComponentsPage = new SkillsComponentsPage();
        expect(skillsComponentsPage.getTitle()).toMatch(/barbicanApp.skills.home.title/);

    });

    it('should load create Skills dialog', () => {
        skillsComponentsPage.clickOnCreateButton();
        skillsDialogPage = new SkillsDialogPage();
        expect(skillsDialogPage.getModalTitle()).toMatch(/barbicanApp.skills.home.createOrEditLabel/);
        skillsDialogPage.close();
    });

    it('should create and save Skills', () => {
        skillsComponentsPage.clickOnCreateButton();
        skillsDialogPage.setSocSpecificSkNameInput('socSpecificSkName');
        expect(skillsDialogPage.getSocSpecificSkNameInput()).toMatch('socSpecificSkName');
        skillsDialogPage.setSocSpecificSkCodeInput('socSpecificSkCode');
        expect(skillsDialogPage.getSocSpecificSkCodeInput()).toMatch('socSpecificSkCode');
        skillsDialogPage.setAnDaInLvInput('5');
        expect(skillsDialogPage.getAnDaInLvInput()).toMatch('5');
        skillsDialogPage.setAnDaInImInput('5');
        expect(skillsDialogPage.getAnDaInImInput()).toMatch('5');
        skillsDialogPage.setAsCaOthLvInput('5');
        expect(skillsDialogPage.getAsCaOthLvInput()).toMatch('5');
        skillsDialogPage.setAsCaOthImInput('5');
        expect(skillsDialogPage.getAsCaOthImInput()).toMatch('5');
        skillsDialogPage.setCoDevOthLvInput('5');
        expect(skillsDialogPage.getCoDevOthLvInput()).toMatch('5');
        skillsDialogPage.setCoDevOthImInput('5');
        expect(skillsDialogPage.getCoDevOthImInput()).toMatch('5');
        skillsDialogPage.setCoPerOutOrgLvInput('5');
        expect(skillsDialogPage.getCoPerOutOrgLvInput()).toMatch('5');
        skillsDialogPage.setCoPerOutOrgImInput('5');
        expect(skillsDialogPage.getCoPerOutOrgImInput()).toMatch('5');
        skillsDialogPage.setCoSupPeSubLvInput('5');
        expect(skillsDialogPage.getCoSupPeSubLvInput()).toMatch('5');
        skillsDialogPage.setCoSupPeSubImInput('5');
        expect(skillsDialogPage.getCoSupPeSubImInput()).toMatch('5');
        skillsDialogPage.setConMaProLvInput('5');
        expect(skillsDialogPage.getConMaProLvInput()).toMatch('5');
        skillsDialogPage.setConMaProImInput('5');
        expect(skillsDialogPage.getConMaProImInput()).toMatch('5');
        skillsDialogPage.setCooWorActOthLvInput('5');
        expect(skillsDialogPage.getCooWorActOthLvInput()).toMatch('5');
        skillsDialogPage.setCooWorActOthImInput('5');
        expect(skillsDialogPage.getCooWorActOthImInput()).toMatch('5');
        skillsDialogPage.setDevBuildTeamsLvInput('5');
        expect(skillsDialogPage.getDevBuildTeamsLvInput()).toMatch('5');
        skillsDialogPage.setDevBuildTeamsImInput('5');
        expect(skillsDialogPage.getDevBuildTeamsImInput()).toMatch('5');
        skillsDialogPage.setDevObjStratLvInput('5');
        expect(skillsDialogPage.getDevObjStratLvInput()).toMatch('5');
        skillsDialogPage.setDevObjStratImInput('5');
        expect(skillsDialogPage.getDevObjStratImInput()).toMatch('5');
        skillsDialogPage.setDocRecInfoLvInput('5');
        expect(skillsDialogPage.getDocRecInfoLvInput()).toMatch('5');
        skillsDialogPage.setDocRecInfoImInput('5');
        expect(skillsDialogPage.getDocRecInfoImInput()).toMatch('5');
        skillsDialogPage.setDrLayOutSpecLvInput('5');
        expect(skillsDialogPage.getDrLayOutSpecLvInput()).toMatch('5');
        skillsDialogPage.setDrLayOutSpecImInput('5');
        expect(skillsDialogPage.getDrLayOutSpecImInput()).toMatch('5');
        skillsDialogPage.setEstMaIntRelLvInput('5');
        expect(skillsDialogPage.getEstMaIntRelLvInput()).toMatch('5');
        skillsDialogPage.setEstMaIntRelImInput('5');
        expect(skillsDialogPage.getEstMaIntRelImInput()).toMatch('5');
        skillsDialogPage.save();
        expect(skillsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkillsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-skills-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SkillsDialogPage {
    modalTitle = element(by.css('h4#mySkillsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    socSpecificSkNameInput = element(by.css('input#field_socSpecificSkName'));
    socSpecificSkCodeInput = element(by.css('input#field_socSpecificSkCode'));
    anDaInLvInput = element(by.css('input#field_anDaInLv'));
    anDaInImInput = element(by.css('input#field_anDaInIm'));
    asCaOthLvInput = element(by.css('input#field_asCaOthLv'));
    asCaOthImInput = element(by.css('input#field_asCaOthIm'));
    coDevOthLvInput = element(by.css('input#field_coDevOthLv'));
    coDevOthImInput = element(by.css('input#field_coDevOthIm'));
    coPerOutOrgLvInput = element(by.css('input#field_coPerOutOrgLv'));
    coPerOutOrgImInput = element(by.css('input#field_coPerOutOrgIm'));
    coSupPeSubLvInput = element(by.css('input#field_coSupPeSubLv'));
    coSupPeSubImInput = element(by.css('input#field_coSupPeSubIm'));
    conMaProLvInput = element(by.css('input#field_conMaProLv'));
    conMaProImInput = element(by.css('input#field_conMaProIm'));
    cooWorActOthLvInput = element(by.css('input#field_cooWorActOthLv'));
    cooWorActOthImInput = element(by.css('input#field_cooWorActOthIm'));
    devBuildTeamsLvInput = element(by.css('input#field_devBuildTeamsLv'));
    devBuildTeamsImInput = element(by.css('input#field_devBuildTeamsIm'));
    devObjStratLvInput = element(by.css('input#field_devObjStratLv'));
    devObjStratImInput = element(by.css('input#field_devObjStratIm'));
    docRecInfoLvInput = element(by.css('input#field_docRecInfoLv'));
    docRecInfoImInput = element(by.css('input#field_docRecInfoIm'));
    drLayOutSpecLvInput = element(by.css('input#field_drLayOutSpecLv'));
    drLayOutSpecImInput = element(by.css('input#field_drLayOutSpecIm'));
    estMaIntRelLvInput = element(by.css('input#field_estMaIntRelLv'));
    estMaIntRelImInput = element(by.css('input#field_estMaIntRelIm'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSocSpecificSkNameInput = function (socSpecificSkName) {
        this.socSpecificSkNameInput.sendKeys(socSpecificSkName);
    }

    getSocSpecificSkNameInput = function () {
        return this.socSpecificSkNameInput.getAttribute('value');
    }

    setSocSpecificSkCodeInput = function (socSpecificSkCode) {
        this.socSpecificSkCodeInput.sendKeys(socSpecificSkCode);
    }

    getSocSpecificSkCodeInput = function () {
        return this.socSpecificSkCodeInput.getAttribute('value');
    }

    setAnDaInLvInput = function (anDaInLv) {
        this.anDaInLvInput.sendKeys(anDaInLv);
    }

    getAnDaInLvInput = function () {
        return this.anDaInLvInput.getAttribute('value');
    }

    setAnDaInImInput = function (anDaInIm) {
        this.anDaInImInput.sendKeys(anDaInIm);
    }

    getAnDaInImInput = function () {
        return this.anDaInImInput.getAttribute('value');
    }

    setAsCaOthLvInput = function (asCaOthLv) {
        this.asCaOthLvInput.sendKeys(asCaOthLv);
    }

    getAsCaOthLvInput = function () {
        return this.asCaOthLvInput.getAttribute('value');
    }

    setAsCaOthImInput = function (asCaOthIm) {
        this.asCaOthImInput.sendKeys(asCaOthIm);
    }

    getAsCaOthImInput = function () {
        return this.asCaOthImInput.getAttribute('value');
    }

    setCoDevOthLvInput = function (coDevOthLv) {
        this.coDevOthLvInput.sendKeys(coDevOthLv);
    }

    getCoDevOthLvInput = function () {
        return this.coDevOthLvInput.getAttribute('value');
    }

    setCoDevOthImInput = function (coDevOthIm) {
        this.coDevOthImInput.sendKeys(coDevOthIm);
    }

    getCoDevOthImInput = function () {
        return this.coDevOthImInput.getAttribute('value');
    }

    setCoPerOutOrgLvInput = function (coPerOutOrgLv) {
        this.coPerOutOrgLvInput.sendKeys(coPerOutOrgLv);
    }

    getCoPerOutOrgLvInput = function () {
        return this.coPerOutOrgLvInput.getAttribute('value');
    }

    setCoPerOutOrgImInput = function (coPerOutOrgIm) {
        this.coPerOutOrgImInput.sendKeys(coPerOutOrgIm);
    }

    getCoPerOutOrgImInput = function () {
        return this.coPerOutOrgImInput.getAttribute('value');
    }

    setCoSupPeSubLvInput = function (coSupPeSubLv) {
        this.coSupPeSubLvInput.sendKeys(coSupPeSubLv);
    }

    getCoSupPeSubLvInput = function () {
        return this.coSupPeSubLvInput.getAttribute('value');
    }

    setCoSupPeSubImInput = function (coSupPeSubIm) {
        this.coSupPeSubImInput.sendKeys(coSupPeSubIm);
    }

    getCoSupPeSubImInput = function () {
        return this.coSupPeSubImInput.getAttribute('value');
    }

    setConMaProLvInput = function (conMaProLv) {
        this.conMaProLvInput.sendKeys(conMaProLv);
    }

    getConMaProLvInput = function () {
        return this.conMaProLvInput.getAttribute('value');
    }

    setConMaProImInput = function (conMaProIm) {
        this.conMaProImInput.sendKeys(conMaProIm);
    }

    getConMaProImInput = function () {
        return this.conMaProImInput.getAttribute('value');
    }

    setCooWorActOthLvInput = function (cooWorActOthLv) {
        this.cooWorActOthLvInput.sendKeys(cooWorActOthLv);
    }

    getCooWorActOthLvInput = function () {
        return this.cooWorActOthLvInput.getAttribute('value');
    }

    setCooWorActOthImInput = function (cooWorActOthIm) {
        this.cooWorActOthImInput.sendKeys(cooWorActOthIm);
    }

    getCooWorActOthImInput = function () {
        return this.cooWorActOthImInput.getAttribute('value');
    }

    setDevBuildTeamsLvInput = function (devBuildTeamsLv) {
        this.devBuildTeamsLvInput.sendKeys(devBuildTeamsLv);
    }

    getDevBuildTeamsLvInput = function () {
        return this.devBuildTeamsLvInput.getAttribute('value');
    }

    setDevBuildTeamsImInput = function (devBuildTeamsIm) {
        this.devBuildTeamsImInput.sendKeys(devBuildTeamsIm);
    }

    getDevBuildTeamsImInput = function () {
        return this.devBuildTeamsImInput.getAttribute('value');
    }

    setDevObjStratLvInput = function (devObjStratLv) {
        this.devObjStratLvInput.sendKeys(devObjStratLv);
    }

    getDevObjStratLvInput = function () {
        return this.devObjStratLvInput.getAttribute('value');
    }

    setDevObjStratImInput = function (devObjStratIm) {
        this.devObjStratImInput.sendKeys(devObjStratIm);
    }

    getDevObjStratImInput = function () {
        return this.devObjStratImInput.getAttribute('value');
    }

    setDocRecInfoLvInput = function (docRecInfoLv) {
        this.docRecInfoLvInput.sendKeys(docRecInfoLv);
    }

    getDocRecInfoLvInput = function () {
        return this.docRecInfoLvInput.getAttribute('value');
    }

    setDocRecInfoImInput = function (docRecInfoIm) {
        this.docRecInfoImInput.sendKeys(docRecInfoIm);
    }

    getDocRecInfoImInput = function () {
        return this.docRecInfoImInput.getAttribute('value');
    }

    setDrLayOutSpecLvInput = function (drLayOutSpecLv) {
        this.drLayOutSpecLvInput.sendKeys(drLayOutSpecLv);
    }

    getDrLayOutSpecLvInput = function () {
        return this.drLayOutSpecLvInput.getAttribute('value');
    }

    setDrLayOutSpecImInput = function (drLayOutSpecIm) {
        this.drLayOutSpecImInput.sendKeys(drLayOutSpecIm);
    }

    getDrLayOutSpecImInput = function () {
        return this.drLayOutSpecImInput.getAttribute('value');
    }

    setEstMaIntRelLvInput = function (estMaIntRelLv) {
        this.estMaIntRelLvInput.sendKeys(estMaIntRelLv);
    }

    getEstMaIntRelLvInput = function () {
        return this.estMaIntRelLvInput.getAttribute('value');
    }

    setEstMaIntRelImInput = function (estMaIntRelIm) {
        this.estMaIntRelImInput.sendKeys(estMaIntRelIm);
    }

    getEstMaIntRelImInput = function () {
        return this.estMaIntRelImInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
