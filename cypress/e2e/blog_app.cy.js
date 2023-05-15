describe('Blog App', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Super',
            username: 'root',
            password: 'test123'
        }

        const user2 = {
            name: 'Super2',
            username: 'root2',
            password: 'test123'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
            .click()

        cy.get('#username')
        cy.get('#password')
    })

    describe('Login', function() {
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

    describe('When logged in', function() {
        beforeEach(function() {
            // user == 'user'
            cy.login({ username: 'root', password: 'test123' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog by Cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('docs.cypress.io')
            cy.get('#add-blog-button').click()

            cy.get('.success')
                .should('contain', 'Blog by Cypress successfully added')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('#blog-container').contains('Blog by Cypress')
        })


        it('A blog creation will fail without title', function() {
            cy.contains('new blog').click()
            cy.get('#author').type('Cypress')
            cy.get('#url').type('docs.cypress.io')
            cy.get('#add-blog-button').click()

            cy.get('.error')
                .should('contain', 'Blog validation failed: title: Path `title` is required.')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })

        it('A blog creation will fail without author', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Cypress blog')
            cy.get('#url').type('docs.cypress.io')
            cy.get('#add-blog-button').click()

            cy.get('.error')
                .should('contain', 'Blog validation failed: author: Path `author` is required.')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })

        it('A blog creation will fail without url', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Cypress blog')
            cy.get('#author').type('Cypress')
            cy.get('#add-blog-button').click()

            cy.get('.error')
                .should('contain', 'Blog validation failed: url: Path `url` is required.')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })

        describe('When blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'Cypress one', author: 'Cypress', url: 'docs.cypress.io' })
                cy.createBlog({ title: 'Cypress two', author: 'Super', url: 'supersuper.com' })
                cy.createBlog({ title: 'Cypress three', author: 'Duper', url: 'duperduper.com' })
                cy.wait(1000)
                cy.visit('')
            })

            it('A blog can be expanded', function() {
                cy.get('#blog-container').contains('Cypress one').contains('show').click()

            })

            it.only('blogs are sorted desc by likes', function() {
                cy.get('#blog-container').as('blogs')
                cy.get('@blogs').get('.blog').eq(0).should('contain', 'Cypress one').as('blog1')
                cy.get('@blogs').get('.blog').eq(1).should('contain', 'Cypress two').as('blog2')
                cy.get('@blogs').get('.blog').eq(2).should('contain', 'Cypress three').as('blog3')
                cy.get('@blog3').contains('show').click()
                cy.get('@blog2').contains('show').click()
                cy.get('@blog1').contains('show').click()

                cy.get('@blog3').find('#Like-button').click()
                cy.wait(500)
                cy.get('@blog3').find('#Like-button').click()
                cy.wait(500)
                cy.get('@blog3').find('#Like-button').click()
                cy.wait(500)
                cy.get('@blog2').find('#Like-button').click()
                cy.wait(500)
                cy.get('@blog2').find('#Like-button').click()
                cy.wait(500)

                cy.get('@blogs').get('.blog').eq(0).should('contain', 'Cypress three').and('contain', 'Likes: 3')
                cy.get('@blogs').get('.blog').eq(1).should('contain', 'Cypress two').and('contain', 'Likes: 2')
            })

            describe('When the creator is logged in', function() {
                beforeEach(function() {
                    cy.get('#blog-container')
                        .contains('Cypress one')
                        .contains('show')
                        .click()
                })

                it('A blog can be liked', function() {
                    cy.get('#blog-container').contains('Cypress one').as('blog')

                    cy.get('@blog')
                        .get('#like-count')
                        .invoke('text')
                        .as('initialLikeCount')

                    cy.get('@blog')
                        .get('#Like-button')
                        .click()

                    cy.get('@blog')
                        .get('#like-count')
                        .should(($likeCount) => {
                            const updatedLikeCount = $likeCount.text()
                            expect(parseInt(updatedLikeCount)).to.be.greaterThan(parseInt(this.initialLikeCount))
                        })
                })



                it('A blog can be deleted', function() {
                    cy.get('#blog-container')
                        .contains('Cypress one')
                        .get('#Remove-button')
                        .click()
                    cy.on('window:confirm', () => {
                        return true
                    })

                    cy.get('.success')
                        .should('contain', 'Cypress one successfully removed')
                        .and('have.css', 'color', 'rgb(0, 128, 0)')
                        .and('have.css', 'border-style', 'solid')

                    cy.get('#blog-container')
                        .contains('Cypress one')
                        .should('not.exist')
                })

            })

            describe('When the non-creator is logged in', function() {
                beforeEach(function() {
                    //root is creator, root2 is not
                    cy.login({ username: 'root2', password: 'test123' })
                    cy.get('#blog-container')
                        .contains('Cypress one')
                        .contains('show')
                        .click()
                })

                it('A blog they did not create should not be deleted', function() {
                    cy.get('#blog-container')
                        .contains('Cypress one')
                        .get('#Remove-button')
                        .click()

                    cy.get('.error')
                        .should('contain', 'not authorized to delete blog')
                        .and('have.css', 'color', 'rgb(255, 0, 0)')
                        .and('have.css', 'border-style', 'solid')
                })
            })


        })
    })
})