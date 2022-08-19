//// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Teste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, teste'
cy.get('#firstName').type('Nome')
cy.get('#lastName').type('Sobrenome')
cy.get('#email').type('email@exemplo.com')
cy.get('#open-text-area').type(longText, {delay : 0})
cy.contains('button' , 'Enviar').click()

cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Nome')
cy.get('#lastName').type('Sobrenome')
cy.get('#email').type('email@exemplo,com')
cy.get('#open-text-area').type('Texto')
cy.contains('button' , 'Enviar').click()

cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com valor numerio', function() {
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Nome')
    cy.get('#lastName').type('Sobrenome')
    cy.get('#email').type('email@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Texto')
    cy.contains('button' , 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('selecione um produto (youtube) por seu texto', function(){
cy.get('#product').select('YouTube').should('have.value','youtube')

  })

  it('selecione um produto (mentoria) por seu valor', function(){
    cy.get('#product').select('mentoria').should('have.value','mentoria')

  })
  
  it('selecione um produto (Blog) por seu indice', function(){
    cy.get('#product').select(1).should('have.value','blog')

  })

it('marca o tipo de atendimento "Feedback"', function(){
  cy.get('input[type="radio"][value="feedback"]').check()
  .should('have.value', 'feedback')
})
it('marca cada tipo de atendimento', function(){
cy.get('input[type="radio"]').should('have.length',3)
.each(function($radio) {
  cy.wrap($radio).check()
  cy.wrap($radio).should('be.checked')

})
})

it('marca ambos checkboxes, depois desmarca o ultimo', function(){
cy.get('input[type="checkbox"]')
.check()
.last()
.uncheck()
.should('not.be.checked')

})

it('revisao - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
  cy.get('#firstName').type('Nome')
  cy.get('#lastName').type('Sobrenome')
  cy.get('#email').type('email@exemplo.com')
  cy.get('#phone-checkbox').check()
  cy.get('#open-text-area').type('Texto')
  cy.contains('button' , 'Enviar').click()
  
  cy.get('.error').should('be.visible')
})
it('seleciona um arquivo da pasta fixtures', function(){
  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json')
  .should(function($input){
  expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo da pasta utilizando drag-and-drop', function(){
  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json', {action:'drag-drop' })
  .should(function($input){
  expect($input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo utlizando uma fixture dando um alias',function(){
  cy.fixture("example.json").as('sampleFile')
  cy.get('input[type="file"]')
  .selectFile('@sampleFile')
  .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
    })
})
it('verfica que a politica de privacidade abre em outra abra sem a necessidade de um clique', function(){
  cy.get('#privacy a').should('have.attr', 'target', '_blank')
})

it('acessa a pagina de privacidade removendo o target e entao clicar no link ', function(){
  cy.get('#privacy a')
  .invoke('removeAttr','target')
  .click()
  cy.contains('Talking About Testing').should('be.visible')
})
})



