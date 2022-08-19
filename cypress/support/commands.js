Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
cy.get('#firstName').type('Nome')
cy.get('#lastName').type('Sobrenome')
cy.get('#email').type('email@exemplo.com')
cy.get('#open-text-area').type('texto')
cy.contains('button' , 'Enviar').click()
})