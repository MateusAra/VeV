/// <reference types="Cypress"/>

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

describe('RF02 - Registro',() =>{
  beforeEach(() => {
    cy.visit('https://phptravels.org/register.php')
  });
  it('[CT - 005] - Todos os campos estão preenchidos corretamente.', () => {
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
  it('[CT - 006] - Nome está correto, mas outros campos estão em branco.', () => {
    cy.get('#inputFirstName').type('Mateus')
    cy.get('[align="center"] > .btn').click()
    cy.get('#inputLastName').should('have.attr', 'required')
  })
  it(' [CT - 007] - Nome contém caracteres inválidos.', () => {
    cy.get('#inputFirstName').type('#$$%*&¨!@_+=')
    cy.get('#inputLastName').type('Araujo')
    cy.get('#inputEmail').type('mateus2araujo@gmail.com')
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
    cy.get('.card-body > .alert').should('be.visible')
  })
  it('[CT - 008] - O E-mail fornecido é inválido.', () => {
    cy.get('#inputFirstName').type('Mateus')
    cy.get('#inputLastName').type('Araujo')
    cy.get('#inputEmail').type('mateus23araujo')
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
    cy.get('#inputEmail').should('be.visible')
  })
})

describe('RF03 - Tela Inicial', () =>{
  it('[CT - 009] - O usuário clica no link "LinkedIn" na tela inicial e é redirecionado com sucesso para a página do LinkedIn da empresa.', () => {
    cy.visit('https://phptravels.com')
    cy.get('body > footer > div > div > div.col-md-4 > div.col-md-12.links.follow-us > a:nth-child(4)').should('have.attr', 'href', 'https://www.linkedin.com/company/phptravels/')
  })
})

describe('RF04 - Tela Demo', () =>{
  beforeEach(() => {
    cy.visit('https://phptravels.com/demo')
  });
  it('[CT - 010] O usuário preenche todos os campos obrigatórios e consegue criar a conta demo com sucesso.', () => {
    let num1;
    let num2;
    let soma;
    cy.get('[placeholder="First Name"]').type('Mateus', { force: true });
    cy.get('.last_name').type('araujo', { force: true });
    cy.get('.business_name').type('MtsTestes', { force: true });
    cy.get('.email').type('mateus19araujo@hotmail.com', { force: true });
  
    cy.get('#numb1')
      .invoke('html')
      .then(html => {
        let valorSpan = html.replace('<span>', '').replace('</span>', '');
        num1 = parseInt(valorSpan); 
      });
  
    cy.get('#numb2')
      .invoke('html')
      .then(html => {
        let valorSpan = html.replace('<span>', '').replace('</span>', '');
        num2 = parseInt(valorSpan); 
      })
      .then(() => {
        soma = num1 + num2;
        cy.get('#number').type(soma, {force: true});
      });
    cy.get('#demo').click({force: true})
    cy.get('#demo').should('not.be.visible')
  });
  it('[CT - 011] O usuário não preenche um ou mais campos obrigatórios e tenta criar a conta demo.', () => {
    cy.get('[placeholder="First Name"]').type('Mateus', { force: true });
    cy.get('.last_name').type('araujo', { force: true });
    cy.get('.business_name').type('MtsTestes', { force: true });
    cy.get('.email').type('mateus19araujo@hotmail.com', { force: true });
    cy.get('#demo').click({force: true})
    cy.get('#number').should('have.attr', 'required')
  });
  
})