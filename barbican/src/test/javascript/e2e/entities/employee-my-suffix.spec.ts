import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Employee e2e test', () => {

    let navBarPage: NavBarPage;
    let employeeDialogPage: EmployeeDialogPage;
    let employeeComponentsPage: EmployeeComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Employees', () => {
        navBarPage.goToEntity('employee-my-suffix');
        employeeComponentsPage = new EmployeeComponentsPage();
        expect(employeeComponentsPage.getTitle()).toMatch(/barbicanApp.employee.home.title/);

    });

    it('should load create Employee dialog', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage = new EmployeeDialogPage();
        expect(employeeDialogPage.getModalTitle()).toMatch(/barbicanApp.employee.home.createOrEditLabel/);
        employeeDialogPage.close();
    });

    it('should create and save Employees', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage.setEmployeeIdInput('5');
        expect(employeeDialogPage.getEmployeeIdInput()).toMatch('5');
        employeeDialogPage.setPlayerTypeInput('playerType');
        expect(employeeDialogPage.getPlayerTypeInput()).toMatch('playerType');
        employeeDialogPage.setFirstNameInput('firstName');
        expect(employeeDialogPage.getFirstNameInput()).toMatch('firstName');
        employeeDialogPage.setLastNameInput('lastName');
        expect(employeeDialogPage.getLastNameInput()).toMatch('lastName');
        employeeDialogPage.setEmailInput('email');
        expect(employeeDialogPage.getEmailInput()).toMatch('email');
        employeeDialogPage.setPhoneInput('phone');
        expect(employeeDialogPage.getPhoneInput()).toMatch('phone');
        employeeDialogPage.setBadgeNumberInput('badgeNumber');
        expect(employeeDialogPage.getBadgeNumberInput()).toMatch('badgeNumber');
        employeeDialogPage.setStartDateInput('2000-12-31');
        expect(employeeDialogPage.getStartDateInput()).toMatch('2000-12-31');
        employeeDialogPage.setMemberSinceInput(12310020012301);
        expect(employeeDialogPage.getMemberSinceInput()).toMatch('2001-12-31T02:30');
        employeeDialogPage.setPreviousSalaryInput('5');
        expect(employeeDialogPage.getPreviousSalaryInput()).toMatch('5');
        employeeDialogPage.setCurrentSalaryInput('5');
        expect(employeeDialogPage.getCurrentSalaryInput()).toMatch('5');
        employeeDialogPage.setGoalSalaryInput('5');
        expect(employeeDialogPage.getGoalSalaryInput()).toMatch('5');
        employeeDialogPage.setPathGoalInput('pathGoal');
        expect(employeeDialogPage.getPathGoalInput()).toMatch('pathGoal');
        employeeDialogPage.setAddressInput('address');
        expect(employeeDialogPage.getAddressInput()).toMatch('address');
        employeeDialogPage.setCityInput('city');
        expect(employeeDialogPage.getCityInput()).toMatch('city');
        employeeDialogPage.setZipInput('5');
        expect(employeeDialogPage.getZipInput()).toMatch('5');
        employeeDialogPage.setStateInput('state');
        expect(employeeDialogPage.getStateInput()).toMatch('state');
        employeeDialogPage.setEmployeeAvatarInput(absolutePath);
        employeeDialogPage.socSpecificSelectLastOption();
        employeeDialogPage.departmentSelectLastOption();
        employeeDialogPage.managerSelectLastOption();
        employeeDialogPage.disciplineSelectLastOption();
        employeeDialogPage.save();
        expect(employeeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EmployeeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-employee-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmployeeDialogPage {
    modalTitle = element(by.css('h4#myEmployeeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    employeeIdInput = element(by.css('input#field_employeeId'));
    playerTypeInput = element(by.css('input#field_playerType'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    phoneInput = element(by.css('input#field_phone'));
    badgeNumberInput = element(by.css('input#field_badgeNumber'));
    startDateInput = element(by.css('input#field_startDate'));
    memberSinceInput = element(by.css('input#field_memberSince'));
    previousSalaryInput = element(by.css('input#field_previousSalary'));
    currentSalaryInput = element(by.css('input#field_currentSalary'));
    goalSalaryInput = element(by.css('input#field_goalSalary'));
    pathGoalInput = element(by.css('input#field_pathGoal'));
    addressInput = element(by.css('input#field_address'));
    cityInput = element(by.css('input#field_city'));
    zipInput = element(by.css('input#field_zip'));
    stateInput = element(by.css('input#field_state'));
    employeeAvatarInput = element(by.css('input#file_employeeAvatar'));
    socSpecificSelect = element(by.css('select#field_socSpecific'));
    departmentSelect = element(by.css('select#field_department'));
    managerSelect = element(by.css('select#field_manager'));
    disciplineSelect = element(by.css('select#field_discipline'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEmployeeIdInput = function (employeeId) {
        this.employeeIdInput.sendKeys(employeeId);
    }

    getEmployeeIdInput = function () {
        return this.employeeIdInput.getAttribute('value');
    }

    setPlayerTypeInput = function (playerType) {
        this.playerTypeInput.sendKeys(playerType);
    }

    getPlayerTypeInput = function () {
        return this.playerTypeInput.getAttribute('value');
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }

    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    setPhoneInput = function (phone) {
        this.phoneInput.sendKeys(phone);
    }

    getPhoneInput = function () {
        return this.phoneInput.getAttribute('value');
    }

    setBadgeNumberInput = function (badgeNumber) {
        this.badgeNumberInput.sendKeys(badgeNumber);
    }

    getBadgeNumberInput = function () {
        return this.badgeNumberInput.getAttribute('value');
    }

    setStartDateInput = function (startDate) {
        this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput = function () {
        return this.startDateInput.getAttribute('value');
    }

    setMemberSinceInput = function (memberSince) {
        this.memberSinceInput.sendKeys(memberSince);
    }

    getMemberSinceInput = function () {
        return this.memberSinceInput.getAttribute('value');
    }

    setPreviousSalaryInput = function (previousSalary) {
        this.previousSalaryInput.sendKeys(previousSalary);
    }

    getPreviousSalaryInput = function () {
        return this.previousSalaryInput.getAttribute('value');
    }

    setCurrentSalaryInput = function (currentSalary) {
        this.currentSalaryInput.sendKeys(currentSalary);
    }

    getCurrentSalaryInput = function () {
        return this.currentSalaryInput.getAttribute('value');
    }

    setGoalSalaryInput = function (goalSalary) {
        this.goalSalaryInput.sendKeys(goalSalary);
    }

    getGoalSalaryInput = function () {
        return this.goalSalaryInput.getAttribute('value');
    }

    setPathGoalInput = function (pathGoal) {
        this.pathGoalInput.sendKeys(pathGoal);
    }

    getPathGoalInput = function () {
        return this.pathGoalInput.getAttribute('value');
    }

    setAddressInput = function (address) {
        this.addressInput.sendKeys(address);
    }

    getAddressInput = function () {
        return this.addressInput.getAttribute('value');
    }

    setCityInput = function (city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function () {
        return this.cityInput.getAttribute('value');
    }

    setZipInput = function (zip) {
        this.zipInput.sendKeys(zip);
    }

    getZipInput = function () {
        return this.zipInput.getAttribute('value');
    }

    setStateInput = function (state) {
        this.stateInput.sendKeys(state);
    }

    getStateInput = function () {
        return this.stateInput.getAttribute('value');
    }

    setEmployeeAvatarInput = function (employeeAvatar) {
        this.employeeAvatarInput.sendKeys(employeeAvatar);
    }

    getEmployeeAvatarInput = function () {
        return this.employeeAvatarInput.getAttribute('value');
    }

    socSpecificSelectLastOption = function () {
        this.socSpecificSelect.all(by.tagName('option')).last().click();
    }

    socSpecificSelectOption = function (option) {
        this.socSpecificSelect.sendKeys(option);
    }

    getSocSpecificSelect = function () {
        return this.socSpecificSelect;
    }

    getSocSpecificSelectedOption = function () {
        return this.socSpecificSelect.element(by.css('option:checked')).getText();
    }

    departmentSelectLastOption = function () {
        this.departmentSelect.all(by.tagName('option')).last().click();
    }

    departmentSelectOption = function (option) {
        this.departmentSelect.sendKeys(option);
    }

    getDepartmentSelect = function () {
        return this.departmentSelect;
    }

    getDepartmentSelectedOption = function () {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    }

    managerSelectLastOption = function () {
        this.managerSelect.all(by.tagName('option')).last().click();
    }

    managerSelectOption = function (option) {
        this.managerSelect.sendKeys(option);
    }

    getManagerSelect = function () {
        return this.managerSelect;
    }

    getManagerSelectedOption = function () {
        return this.managerSelect.element(by.css('option:checked')).getText();
    }

    disciplineSelectLastOption = function () {
        this.disciplineSelect.all(by.tagName('option')).last().click();
    }

    disciplineSelectOption = function (option) {
        this.disciplineSelect.sendKeys(option);
    }

    getDisciplineSelect = function () {
        return this.disciplineSelect;
    }

    getDisciplineSelectedOption = function () {
        return this.disciplineSelect.element(by.css('option:checked')).getText();
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
