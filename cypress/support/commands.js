const { default: NewBlog } = require('../../src/components/NewBlog')

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('create', (newBlog) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { ...newBlog },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('registerUser', (userDetails) => {
  cy.request('POST', 'http://localhost:3001/api/users', userDetails)
  cy.visit('http://localhost:3000')
})
