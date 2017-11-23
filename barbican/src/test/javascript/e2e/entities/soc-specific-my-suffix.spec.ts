import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('SocSpecific e2e test', () => {

    let navBarPage: NavBarPage;
    let socSpecificDialogPage: SocSpecificDialogPage;
    let socSpecificComponentsPage: SocSpecificComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SocSpecifics', () => {
        navBarPage.goToEntity('soc-specific-my-suffix');
        socSpecificComponentsPage = new SocSpecificComponentsPage();
        expect(socSpecificComponentsPage.getTitle()).toMatch(/barbicanApp.socSpecific.home.title/);

    });

    it('should load create SocSpecific dialog', () => {
        socSpecificComponentsPage.clickOnCreateButton();
        socSpecificDialogPage = new SocSpecificDialogPage();
        expect(socSpecificDialogPage.getModalTitle()).toMatch(/barbicanApp.socSpecific.home.createOrEditLabel/);
        socSpecificDialogPage.close();
    });

    it('should create and save SocSpecifics', () => {
        socSpecificComponentsPage.clickOnCreateButton();
        socSpecificDialogPage.setSocSpecificNameInput('socSpecificName');
        expect(socSpecificDialogPage.getSocSpecificNameInput()).toMatch('socSpecificName');
        socSpecificDialogPage.setSocSpecificCodeInput('socSpecificCode');
        expect(socSpecificDialogPage.getSocSpecificCodeInput()).toMatch('socSpecificCode');
        socSpecificDialogPage.setSocSpecificAvatorInput(absolutePath);
        socSpecificDialogPage.setSocSpecificDescriptionInput('socSpecificDescription');
        expect(socSpecificDialogPage.getSocSpecificDescriptionInput()).toMatch('socSpecificDescription');
        socSpecificDialogPage.setSocSpecificURLInput('socSpecificURL');
        expect(socSpecificDialogPage.getSocSpecificURLInput()).toMatch('socSpecificURL');
        socSpecificDialogPage.setSocSpecificPreviewImageInput('socSpecificPreviewImage');
        expect(socSpecificDialogPage.getSocSpecificPreviewImageInput()).toMatch('socSpecificPreviewImage');
        socSpecificDialogPage.groupSelectLastOption();
        socSpecificDialogPage.setTotEmpInput('5');
        expect(socSpecificDialogPage.getTotEmpInput()).toMatch('5');
        socSpecificDialogPage.setEmpPrseInput('5');
        expect(socSpecificDialogPage.getEmpPrseInput()).toMatch('5');
        socSpecificDialogPage.setHourlyMeanInput('5');
        expect(socSpecificDialogPage.getHourlyMeanInput()).toMatch('5');
        socSpecificDialogPage.setAnnualMeanInput('5');
        expect(socSpecificDialogPage.getAnnualMeanInput()).toMatch('5');
        socSpecificDialogPage.setMeanPrseInput('5');
        expect(socSpecificDialogPage.getMeanPrseInput()).toMatch('5');
        socSpecificDialogPage.setHrPctHighestInput('5');
        expect(socSpecificDialogPage.getHrPctHighestInput()).toMatch('5');
        socSpecificDialogPage.setHrPctHighInput('5');
        expect(socSpecificDialogPage.getHrPctHighInput()).toMatch('5');
        socSpecificDialogPage.setHourlyMedianInput('5');
        expect(socSpecificDialogPage.getHourlyMedianInput()).toMatch('5');
        socSpecificDialogPage.setHrPctBelowInput('5');
        expect(socSpecificDialogPage.getHrPctBelowInput()).toMatch('5');
        socSpecificDialogPage.setHrPctLowestInput('5');
        expect(socSpecificDialogPage.getHrPctLowestInput()).toMatch('5');
        socSpecificDialogPage.setAnPctHighestInput('5');
        expect(socSpecificDialogPage.getAnPctHighestInput()).toMatch('5');
        socSpecificDialogPage.setAnPctHighInput('5');
        expect(socSpecificDialogPage.getAnPctHighInput()).toMatch('5');
        socSpecificDialogPage.setAnnualMedianInput('5');
        expect(socSpecificDialogPage.getAnnualMedianInput()).toMatch('5');
        socSpecificDialogPage.setAnPctBelowInput('5');
        expect(socSpecificDialogPage.getAnPctBelowInput()).toMatch('5');
        socSpecificDialogPage.setAnPctLowestInput('5');
        expect(socSpecificDialogPage.getAnPctLowestInput()).toMatch('5');
        socSpecificDialogPage.socBroadSelectLastOption();
        socSpecificDialogPage.skillsSelectLastOption();
        socSpecificDialogPage.save();
        expect(socSpecificDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SocSpecificComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-soc-specific-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SocSpecificDialogPage {
    modalTitle = element(by.css('h4#mySocSpecificLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    socSpecificNameInput = element(by.css('input#field_socSpecificName'));
    socSpecificCodeInput = element(by.css('input#field_socSpecificCode'));
    socSpecificAvatorInput = element(by.css('input#file_socSpecificAvator'));
    socSpecificDescriptionInput = element(by.css('input#field_socSpecificDescription'));
    socSpecificURLInput = element(by.css('input#field_socSpecificURL'));
    socSpecificPreviewImageInput = element(by.css('input#field_socSpecificPreviewImage'));
    groupSelect = element(by.css('select#field_group'));
    totEmpInput = element(by.css('input#field_totEmp'));
    empPrseInput = element(by.css('input#field_empPrse'));
    hourlyMeanInput = element(by.css('input#field_hourlyMean'));
    annualMeanInput = element(by.css('input#field_annualMean'));
    meanPrseInput = element(by.css('input#field_meanPrse'));
    hrPctHighestInput = element(by.css('input#field_hrPctHighest'));
    hrPctHighInput = element(by.css('input#field_hrPctHigh'));
    hourlyMedianInput = element(by.css('input#field_hourlyMedian'));
    hrPctBelowInput = element(by.css('input#field_hrPctBelow'));
    hrPctLowestInput = element(by.css('input#field_hrPctLowest'));
    anPctHighestInput = element(by.css('input#field_anPctHighest'));
    anPctHighInput = element(by.css('input#field_anPctHigh'));
    annualMedianInput = element(by.css('input#field_annualMedian'));
    anPctBelowInput = element(by.css('input#field_anPctBelow'));
    anPctLowestInput = element(by.css('input#field_anPctLowest'));
    socBroadSelect = element(by.css('select#field_socBroad'));
    skillsSelect = element(by.css('select#field_skills'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSocSpecificNameInput = function (socSpecificName) {
        this.socSpecificNameInput.sendKeys(socSpecificName);
    }

    getSocSpecificNameInput = function () {
        return this.socSpecificNameInput.getAttribute('value');
    }

    setSocSpecificCodeInput = function (socSpecificCode) {
        this.socSpecificCodeInput.sendKeys(socSpecificCode);
    }

    getSocSpecificCodeInput = function () {
        return this.socSpecificCodeInput.getAttribute('value');
    }

    setSocSpecificAvatorInput = function (socSpecificAvator) {
        this.socSpecificAvatorInput.sendKeys(socSpecificAvator);
    }

    getSocSpecificAvatorInput = function () {
        return this.socSpecificAvatorInput.getAttribute('value');
    }

    setSocSpecificDescriptionInput = function (socSpecificDescription) {
        this.socSpecificDescriptionInput.sendKeys(socSpecificDescription);
    }

    getSocSpecificDescriptionInput = function () {
        return this.socSpecificDescriptionInput.getAttribute('value');
    }

    setSocSpecificURLInput = function (socSpecificURL) {
        this.socSpecificURLInput.sendKeys(socSpecificURL);
    }

    getSocSpecificURLInput = function () {
        return this.socSpecificURLInput.getAttribute('value');
    }

    setSocSpecificPreviewImageInput = function (socSpecificPreviewImage) {
        this.socSpecificPreviewImageInput.sendKeys(socSpecificPreviewImage);
    }

    getSocSpecificPreviewImageInput = function () {
        return this.socSpecificPreviewImageInput.getAttribute('value');
    }

    setGroupSelect = function (group) {
        this.groupSelect.sendKeys(group);
    }

    getGroupSelect = function () {
        return this.groupSelect.element(by.css('option:checked')).getText();
    }

    groupSelectLastOption = function () {
        this.groupSelect.all(by.tagName('option')).last().click();
    }
    setTotEmpInput = function (totEmp) {
        this.totEmpInput.sendKeys(totEmp);
    }

    getTotEmpInput = function () {
        return this.totEmpInput.getAttribute('value');
    }

    setEmpPrseInput = function (empPrse) {
        this.empPrseInput.sendKeys(empPrse);
    }

    getEmpPrseInput = function () {
        return this.empPrseInput.getAttribute('value');
    }

    setHourlyMeanInput = function (hourlyMean) {
        this.hourlyMeanInput.sendKeys(hourlyMean);
    }

    getHourlyMeanInput = function () {
        return this.hourlyMeanInput.getAttribute('value');
    }

    setAnnualMeanInput = function (annualMean) {
        this.annualMeanInput.sendKeys(annualMean);
    }

    getAnnualMeanInput = function () {
        return this.annualMeanInput.getAttribute('value');
    }

    setMeanPrseInput = function (meanPrse) {
        this.meanPrseInput.sendKeys(meanPrse);
    }

    getMeanPrseInput = function () {
        return this.meanPrseInput.getAttribute('value');
    }

    setHrPctHighestInput = function (hrPctHighest) {
        this.hrPctHighestInput.sendKeys(hrPctHighest);
    }

    getHrPctHighestInput = function () {
        return this.hrPctHighestInput.getAttribute('value');
    }

    setHrPctHighInput = function (hrPctHigh) {
        this.hrPctHighInput.sendKeys(hrPctHigh);
    }

    getHrPctHighInput = function () {
        return this.hrPctHighInput.getAttribute('value');
    }

    setHourlyMedianInput = function (hourlyMedian) {
        this.hourlyMedianInput.sendKeys(hourlyMedian);
    }

    getHourlyMedianInput = function () {
        return this.hourlyMedianInput.getAttribute('value');
    }

    setHrPctBelowInput = function (hrPctBelow) {
        this.hrPctBelowInput.sendKeys(hrPctBelow);
    }

    getHrPctBelowInput = function () {
        return this.hrPctBelowInput.getAttribute('value');
    }

    setHrPctLowestInput = function (hrPctLowest) {
        this.hrPctLowestInput.sendKeys(hrPctLowest);
    }

    getHrPctLowestInput = function () {
        return this.hrPctLowestInput.getAttribute('value');
    }

    setAnPctHighestInput = function (anPctHighest) {
        this.anPctHighestInput.sendKeys(anPctHighest);
    }

    getAnPctHighestInput = function () {
        return this.anPctHighestInput.getAttribute('value');
    }

    setAnPctHighInput = function (anPctHigh) {
        this.anPctHighInput.sendKeys(anPctHigh);
    }

    getAnPctHighInput = function () {
        return this.anPctHighInput.getAttribute('value');
    }

    setAnnualMedianInput = function (annualMedian) {
        this.annualMedianInput.sendKeys(annualMedian);
    }

    getAnnualMedianInput = function () {
        return this.annualMedianInput.getAttribute('value');
    }

    setAnPctBelowInput = function (anPctBelow) {
        this.anPctBelowInput.sendKeys(anPctBelow);
    }

    getAnPctBelowInput = function () {
        return this.anPctBelowInput.getAttribute('value');
    }

    setAnPctLowestInput = function (anPctLowest) {
        this.anPctLowestInput.sendKeys(anPctLowest);
    }

    getAnPctLowestInput = function () {
        return this.anPctLowestInput.getAttribute('value');
    }

    socBroadSelectLastOption = function () {
        this.socBroadSelect.all(by.tagName('option')).last().click();
    }

    socBroadSelectOption = function (option) {
        this.socBroadSelect.sendKeys(option);
    }

    getSocBroadSelect = function () {
        return this.socBroadSelect;
    }

    getSocBroadSelectedOption = function () {
        return this.socBroadSelect.element(by.css('option:checked')).getText();
    }

    skillsSelectLastOption = function () {
        this.skillsSelect.all(by.tagName('option')).last().click();
    }

    skillsSelectOption = function (option) {
        this.skillsSelect.sendKeys(option);
    }

    getSkillsSelect = function () {
        return this.skillsSelect;
    }

    getSkillsSelectedOption = function () {
        return this.skillsSelect.element(by.css('option:checked')).getText();
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
