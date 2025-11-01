import { loginBtn, registerUserEmail, registerUserName } from '../../helpers/automation-exercise.page';

Cypress.Commands.add('login', (email, password) => {
    cy.get(loginBtn).click(); 
    cy.get(registerUserEmail).type(email); 
    cy.get(registerUserName).type(password); 
    cy.get('[data-qa="login-button"]').click();
});
