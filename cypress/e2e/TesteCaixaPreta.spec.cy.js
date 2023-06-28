describe('RF01 - Login', () => {
  beforeEach(() => {
    cy.visit('https://phptravels.org/login')
  });
  it('[CT - 001] - Verificar se o usuário pode fazer login com sucesso  ao fornecer credenciais válidas', () => {
    cy.get('#inputEmail').type('mateus19araujo@hotmail.com')
    cy.get('#inputPassword').type('1234')
    cy.wait(5000)
    cy.get('#login').click()
    cy.get('.navbar-brand').should('be.visible')
  })
  it('[CT - 002] - Verificar se o usuário recebe uma mensagem de erro ao fornecer credenciais inválidas no acesso.', () => {
    cy.get('#inputEmail').type('mateus19sousa@hotmail.com')
    cy.get('#inputPassword').type('1234')
    cy.wait(5000)
    cy.get('#login').click()
    cy.get('.card-body > .alert').should('be.visible')
  })
  it('[CT - 003] - Verificar se o usuário tem acesso a página de registro a partir da página de login.', () => {
    cy.get('.card-footer > .small').click()
    cy.get('.navbar-brand').should('be.visible')
  })
  it('[CT - 004] - Verificar se o usuário pode acessar a página inicial sem fazer login.', () => {
    cy.get('#login').click()
    cy.get('.card-body > .alert').should('be.visible')
  })
})

describe.only('RF02 - Registro',() =>{
  beforeEach(() => {
    cy.visit('https://phptravels.org/register.php')
  });
  it(' [CT - 001] - Todos os campos estão preenchidos corretamente.', () => {
    cy.get('#inputFirstName').type('Mateus')
    cy.get('#inputLastName').type('Araujo')
    cy.get('#inputEmail').type('mateus235araujo@gmail.com')
    cy.get('#inputPhone').type('88994429174')
    cy.get('#inputAddress1').type('Rua do amor')
    cy.get('#inputAddress2').type('Rua dos apaixonados')
    cy.get('#inputCity').type('Russas')
    cy.get('#stateinput').type('Ceara')
    cy.get('#inputPostcode').type('62900000')
    cy.get('#inputCountry').type('Brazil')
    cy.get('#inputNewPassword1').type('12345')
    cy.get('#inputNewPassword2').type('12345')
    cy.get('.bootstrap-switch-handle-on').click()
    cy.wait(60000)
    cy.get('[align="center"] > .btn').click()
    cy.get('.navbar-brand').should('be.visible')
  })
})