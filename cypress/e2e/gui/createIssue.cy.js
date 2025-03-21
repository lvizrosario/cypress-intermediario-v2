import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  const issue = {
    title: `issue-${ faker.datatype.uuid() }`,
    description: faker.random.word(3),
    project: {
      name: `project-${ faker.datatype.uuid() }`
    }
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.login()
    cy.api_createProject(issue.project)
  })

  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})