import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`
    }

    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
      })
  })
})  