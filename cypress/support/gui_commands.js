Cypress.Commands.add('login', (
    user = Cypress.env('username'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')

      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
      cy.visit('/')
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', '/users/sign_in')
    }
    
    const options = {
      cacheAcrossSpecs: true,
      validate,
    }

    if(cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
    
})


Cypress.Commands.add('logout', () => {
  const logout = () => {
    cy.get("[data-testid='user-dropdown']").click()
    cy.get("[data-testid='sign_out_link']").click()
  }

  logout()
})


Cypress.Commands.add('gui_createProject' , project => {
  cy.visit('/projects/new')

  cy.get("[data-qa-panel-name='blank_project']").click()
  cy.get('#project_name').type(project.name)
  cy.get('#__BVID__20__BV_toggle_').click()
  cy.get('.gl-dropdown-item-text-wrapper').contains('root').click()
  cy.get('#project_visibility_level_0').check()
  cy.contains('Create project').click()
})


Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('username')}/${issue.project.name}/issues/new`)

  cy.get("[data-qa-selector='issuable_form_title_field']").type(issue.title)
  cy.get("[data-qa-selector='issuable_form_description_field']").type(issue.description)
  cy.contains('Create issue').click()
})