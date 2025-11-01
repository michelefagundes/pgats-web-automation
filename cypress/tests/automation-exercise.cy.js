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
    deleteAccountBtn, 
    logoutBtn, 
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

    it('login user with correct email and password', () => {
        const randomUserName = faker.person.fullName();
        const randomUserEmail = faker.internet.email();
        const randomPass = faker.internet.password();
        const randomCompanyAddress = faker.location.streetAddress();
        const randomState = faker.location.state();
        const randomCity = faker.location.city();
        const randomZipCode = faker.location.zipCode();
        const randomPhone = faker.phone.number();

        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');
        cy.get(loginBtn).click();

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
        cy.get('[data-qa="first_name"]').type('QA');
        cy.get('[data-qa="last_name"]').type('PGATS - Test');
        cy.get('[data-qa="address"]').type(randomCompanyAddress);
        cy.get('[data-qa="state"]').type(randomState);
        cy.get('[data-qa="city"]').type(randomCity);
        cy.get('[data-qa="zipcode"]').type(randomZipCode);
        cy.get('[data-qa="mobile_number"]').type(randomPhone);
    
        cy.get('[data-qa="create-account"]').click();
        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${randomUserName}`).should('be.visible');

        cy.get(logoutBtn).click();
        cy.get(loginBtn).click();
        cy.contains('Login to your account').should('be.visible');

        cy.get('[data-qa="login-email"]').type(randomUserEmail); 
        cy.get('[data-qa="login-password"]').type(randomPass); 
        cy.get('[data-qa="login-button"]').click();

        cy.contains(`Logged in as ${randomUserName}`).should('be.visible');
        
        cy.get(deleteAccountBtn).click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    });

    it('logout user ', () => {
        const userName = Cypress.env('USER_NAME'); 
        const userEmail = Cypress.env('USER_EMAIL');
        const userPass = Cypress.env('USER_PASSWORD');

        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');
        cy.get(loginBtn).click();
        
        cy.get('[data-qa="login-email"]').type(userEmail); 
        cy.get('[data-qa="login-password"]').type(userPass); 
        cy.get('[data-qa="login-button"]').click();

        cy.contains(`Logged in as ${userName}`).should('be.visible');
        cy.get(logoutBtn).click(); 
        cy.get(homePage).should('be.visible');    
    });

    it('try to register an existent user', () => {
        const userName = Cypress.env('USER_NAME'); 
        const userEmail = Cypress.env('USER_EMAIL');

        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');
        cy.get(loginBtn).click();
        cy.contains(newUserSignUpHeader).should('be.visible');

        cy.get(registerUserName).type(userName);
        cy.get(registerUserEmail).type(userEmail);
        cy.get(signUpBtn).click();
        cy.contains(emailAlreadyExistsHint).should('be.visible'); 
    });

    it('validating contact us form', () => {
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const randomSubject = faker.lorem.sentence();
        const randomMessage = faker.lorem.paragraph();

        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');
        cy.get('a[href="/contact_us"]').click();

        cy.get('h2.title.text-center').should('be.visible');
        
        cy.get('[data-qa="name"]').type(randomName);
        cy.get('[data-qa="email"]').type(randomEmail);
        cy.get('[data-qa="subject"]').type(randomSubject);
        cy.get('[data-qa="message"]').type(randomMessage);

        cy.get('input[name="upload_file"]').attachFile('test-file.jpeg');

        cy.get('[data-qa="submit-button"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Success! Your details have been submitted successfully.');
        });
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');

        cy.get('a.btn.btn-success[href="/"]').click();

        cy.get(homePage).should('be.visible');
    });

    it('verify products and products details page', () => {
        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');

        cy.get('a[href="/products"]').click();
        cy.contains('All Products').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('a[href="/product_details/1"]').click();

        cy.get('.product-information').should('be.visible');
        cy.get('.product-information h2').should('have.text', 'Blue Top');
        cy.get('.product-information p').contains('Category: Women > Tops').should('be.visible');
        cy.get('.product-information span span').should('have.text', 'Rs. 500');
        cy.get('.product-information p').contains('Availability: In Stock').should('be.visible');
        cy.get('.product-information p').contains('Condition: New').should('be.visible');
        cy.get('.product-information p').contains('Brand: Polo').should('be.visible');
    });

    it('search product', () => {
        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');

        cy.get('a[href="/products"]').click();
        cy.contains('All Products').should('be.visible');
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();
        cy.contains('Searched Products').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items .productinfo').each(($el) => {
            cy.wrap($el).should('be.visible');
        });
    });

    it('verify subscription in home page', () => {
        const randomEmail = faker.internet.email();
    
        cy.visit('https://automationexercise.com');
        cy.get(homePage).should('be.visible');

        cy.scrollTo('bottom');

        cy.contains('h2', 'Subscription').should('be.visible');

        cy.get('#susbscribe_email').type(randomEmail);
        cy.get('#subscribe').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');
    });
});