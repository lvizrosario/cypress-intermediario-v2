describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('username')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get("[data-testid='user_avatar_content']").should('be.visible')
  })
})