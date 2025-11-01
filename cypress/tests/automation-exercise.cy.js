const { faker } = require('@faker-js/faker'); 
import {
    homePage,
    loginBtn,
    newUserSignUpHeader,
    emailAlreadyExistsHint,
    registerUserName,
    registerUserEmail,
    signUpBtn,
    enterAccountInfoHeader,
    deleteAccountBtn, // Importado o seletor para deletar conta
} from '../../helpers/automation-exercise.page';

describe('Automation Exercise Test Suite', () => {
    it('register an user', () => {
        const randomUserName = faker.person.fullName();
        const randomUserEmail = faker.internet.email();
        const randomPass = faker.internet.password();
        const randomCompanyName = faker.company.name();
        const randomCompanyAddress = faker.location.streetAddress();
        const randomCompanyAddress2 = faker.location.secondaryAddress();
        const randomState = faker.location.state();
        const randomCity = faker.location.city();
        const randomZipCode = faker.location.zipCode();
        const randomPhone = faker.phone.number();

        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');
        cy.get(loginBtn).click();
        cy.contains(newUserSignUpHeader).should('be.visible');

        cy.get(registerUserName).type('Test 123');
        cy.get(registerUserEmail).type('test123@gmail.com');
        cy.get(signUpBtn).click();
        cy.contains(emailAlreadyExistsHint).should('be.visible'); 
        cy.get(registerUserName).clear();
        cy.get(registerUserEmail).clear();

        cy.get(registerUserName).type(randomUserName);
        cy.get(registerUserEmail).type(randomUserEmail);
        cy.get(signUpBtn).click();
        cy.contains(enterAccountInfoHeader).should('be.visible');

        cy.get('#id_gender1').check();
        cy.get('[data-qa="name"]').should('have.value', randomUserName);
        cy.get('[data-qa="email"]').should('have.value', randomUserEmail);

        cy.get('[data-qa="password"]').type(randomPass);
        cy.get('[data-qa="days"]').select('10');
        cy.get('[data-qa="months"]').select('May');
        cy.get('[data-qa="years"]').select('1990');

        cy.get('#newsletter').check();
        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('QA');
        cy.get('[data-qa="last_name"]').type('PGATS - Test');
        cy.get('[data-qa="company"]').type(randomCompanyName);
        cy.get('[data-qa="address"]').type(randomCompanyAddress);
        cy.get('[data-qa="address2"]').type(randomCompanyAddress2);

        cy.get('[data-qa="country"]')
            .find('option') 
            .then(($options) => {
                const randomIndex = Math.floor(Math.random() * $options.length); 
                const randomCountry = $options[randomIndex].value;
                cy.get('[data-qa="country"]').select(randomCountry); 
            });

        cy.get('[data-qa="state"]').type(randomState);
        cy.get('[data-qa="city"]').type(randomCity);
        cy.get('[data-qa="zipcode"]').type(randomZipCode);
        cy.get('[data-qa="mobile_number"]').type(randomPhone);

        cy.get('[data-qa="create-account"]').click();
        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${randomUserName}`).should('be.visible');

        cy.get(deleteAccountBtn).click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    });
});