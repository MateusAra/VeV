/// <reference types="Cypress"/>
import 'cypress-xpath'
describe.only('RF01 - Login', () => {
  beforeEach(() => {
    cy.visit('https://phptravels.org/login')
  });
  it('[CT - 001] - Verificar se o usuário pode fazer login com sucesso  ao fornecer credenciais válidas', () => {
    cy.get('#inputEmail').type('mateus19araujo@hotmail.com')
    cy.get('#inputPassword').type('1234')
    cy.wait(5000)
    cy.get('#login').click()
    cy.get('.navbar-brand').should('not.be.visible')
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
  it('[CT - 005] - Verificar se o usuário consegue acessar os Announcements sem estar logado no site.', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Announcements > .pr-4').click()
    cy.get('[class="card-title"]').should('be.visible')
  })
  it('[CT - 006] - Verificar se o usuário consegue acessar o Network Status sem estar logado no site', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Network_Status > .pr-4').click()
    cy.get('[class="card-title"]').should('be.visible')
  })
  it('[CT - 007] - Verificar se o usuário consegue acessar a página Contact Us sem estar logado', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Contact_Us > .pr-4').click()
    cy.get('.h3').should('be.visible')
  })
  it('[CT - 008] - Verificar se o usuário consegue acessar o Knowledgebase sem estar logado.', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Knowledgebase > .pr-4').click()
    cy.get('.breadcrumb > .active').should('be.visible')
  })
  it('[CT - 009] - Verificar se o usuário consegue acessar a Store sem estar logado.', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Store > .pr-4').click()
    cy.get('#Primary_Navbar-Store > .dropdown-menu').should('be.visible')
  })
  it('[CT - 010] - Verificar se o usuário consegue acessar a página do twitter selecionando o icone do mesmo.', () => {
    cy.get('#footer > div > ul.list-inline.mb-7.text-center.float-lg-right > li:nth-child(4) > a').should('have.attr', 'href', 'https://www.twitter.com/https://twitter.com/phptravels')
  })
  it('[CT - 011] - Verificar se o usuário consegue trocar a linguagem do site para português.', () => {
    cy.get(':nth-child(7) > .btn').click()
    cy.get(':nth-child(21) > .item').click()
    cy.get('#modalChooseLanguage > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    cy.get('.h3').should('have.text', 'Entrar')
  })
  it('[CT - 012] - Verificar se o usuário consegue acessar o Affiliates sem estar logado.', () => {
    cy.get('.d-xl-none > .btn').click()
    cy.get('#Primary_Navbar-Affiliates > .pr-4').click()
    cy.get('.h3').should('not.be.visible')
  })
  it('[CT - 26] - Verificar se clicando no ícone " Whatsapp " na tela inicial o usuário é redirecionado com sucesso para a página do Whatsapp da empresa.', () => {
    cy.get(':nth-child(5) > .btn > .fab').click()
    cy.url().then((currentUrl) => {
      cy.url().should('not.equal', currentUrl);
    });
  })
  it('[CT - 27] - Verificar se clicando no ícone " Youtube " na tela inicial o usuário é redirecionado com sucesso para a página do youtube da empresa.', () => {
    cy.get(':nth-child(6) > .btn > .fab').click()
    cy.url().then((currentUrl) => {
      cy.url().should('not.equal', currentUrl);
    });
  })
})

describe('RF02 - Registro',() =>{
  beforeEach(() => {
    cy.visit('https://phptravels.org/register.php')
  });
  it('[CT - 012] - Todos os campos estão preenchidos corretamente.', () => {
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
  it('[CT - 013] - Nome está correto, mas outros campos estão em branco.', () => {
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
  beforeEach(() =>{
    cy.visit('https://phptravels.com')
  })
  it('[CT - 009] - O usuário clica no link "LinkedIn" na tela inicial e é redirecionado com sucesso para a página do LinkedIn da empresa.', () => {
    cy.get('body > footer > div > div > div.col-md-4 > div.col-md-12.links.follow-us > a:nth-child(4)').should('have.attr', 'href', 'https://www.linkedin.com/company/phptravels/')
  })
  it('[CT - 017] - Verificar se clicando no ícone "Facebook" na tela inicial o usuário é redirecionado com sucesso para a página do Facebook da empresa. ', () => {
    cy.get('body > footer > div > div > div.col-md-4 > div.col-md-12.links.follow-us > a:nth-child(2)').should('have.attr', 'href', 'https://www.facebook.com/phptravels/')
  })
  it('[CT - 018] - Verificar se clicando no ícone "Instagram" na tela inicial o usuário é redirecionado com sucesso para a página do Instagram da empresa.', () => {
    cy.xpath('//*[@id="footer"]/div/ul[1]/li[2]/a').should('have.attr', 'href')
  })
  it('[CT - 019] - Verificar se o usuário consegue visualizar os termos de serviço.', () => {
    cy.get('[href="https://phptravels.com/terms-and-conditions/"] > strong').should('be.visible')
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

describe('RF05 - Pricing', () =>{
  beforeEach(()=>{
    cy.visit('https://phptravels.com/pricing')
  })
  it('[CT - 022] O usuário logado tenta realizar a compra de qualquer serviço oferecido no site.', () =>{
    cy.get(':nth-child(1) > .pricing-package > .sticky > .btn').should('have.attr', 'href')
  })
  it('[CT - 023] O usuário deslogado tenta realizar a compra de qualquer serviço oferecido no site.', () =>{
    cy.get(':nth-child(1) > .pricing-package > .sticky > .btn').should('not.have.attr', 'href')
  })
  it('[CT - 024] O usuário clica no link "info@phptravels.com" na tela Pricing e é redirecionado com sucesso para o email, com o destinatario já preenchido.', () =>{
    cy.get('.mb3 > :nth-child(3) > .waves-effect').should('have.attr', 'href')
  })
})