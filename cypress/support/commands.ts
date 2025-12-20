// ***********************************************
// Comandos personalizados para Cypress
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para realizar login
       * @param username - Nombre de usuario
       * @param password - Contraseña
       * @example cy.login('testuser', '123456')
       */
      login(username: string, password: string): Chainable<void>;
      
      /**
       * Comando personalizado para realizar logout
       * @example cy.logout()
       */
      logout(): Chainable<void>;
      
      /**
       * Comando para verificar que el usuario está autenticado
       * @example cy.checkAuthenticated()
       */
      checkAuthenticated(): Chainable<void>;
    }
  }
}

/**
 * Comando personalizado para realizar login
 */
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('input[formControlName="username"]').clear().type(username);
  cy.get('input[formControlName="password"]').clear().type(password);
  cy.get('ion-button[type="submit"]').click();
  
  // Esperar a que la navegación se complete
  cy.url().should('not.include', '/login', { timeout: 10000 });
});

/**
 * Comando personalizado para realizar logout
 */
Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage();
  cy.visit('/login');
});

/**
 * Comando para verificar que el usuario está autenticado
 */
Cypress.Commands.add('checkAuthenticated', () => {
  cy.window().then((win) => {
    const token = win.localStorage.getItem('auth_token');
    expect(token).to.exist;
  });
});

export {};
