describe('Blog App', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Super',
            username: 'root',
            password: 'test123'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
            .click()

        cy.get('#username')
        cy.get('#password')
    })

    describe.only('Login', function() {
        beforeEach(function() {
            cy.contains('login').click()
        })

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('root')
            cy.get('#password').type('test123')
            cy.get('#login-button').click()

            cy.contains('logged in as: root')
        })

        it('fails with incorrect credentials', function() {
            cy.get('#username').type('wrong')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
})