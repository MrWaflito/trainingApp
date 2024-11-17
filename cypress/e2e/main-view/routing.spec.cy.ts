describe('Side navigation menu should redirect ', () => {
  it('to Dashboard view component', () => {
    cy.visit('http://localhost:4200')
    cy.get('app-menu-item > [ng-reflect-router-link=dashboard]').first().click()
    cy.get('mat-sidenav-content h1').contains('Dashboard').should('be.visible')
  })
  it('to Statisctics view component', () => {
    cy.visit('http://localhost:4200')
    cy.get('app-menu-item > [ng-reflect-router-link=statistics]').click()
    cy.get('mat-sidenav-content p').contains('statistics works!').should('be.visible')
  })
  it('to Challenges view component', () => {
    cy.visit('http://localhost:4200')
    cy.get('app-menu-item > [ng-reflect-router-link=challenges]').click()
    cy.get('mat-sidenav-content p').contains('challenges works!').should('be.visible')
  })
  it('to User Stats view component', () => {
    cy.visit('http://localhost:4200')
    cy.get('app-menu-item > [ng-reflect-router-link=userdata]').click()
    cy.get('mat-sidenav-content p').contains('user-data works!').should('be.visible')
  })
  it('to Settings view component', () => {
    cy.visit('http://localhost:4200')
    cy.get('app-menu-item > [ng-reflect-router-link=settings]').click()
    cy.get('mat-sidenav-content p').contains('settings works!').should('be.visible')
  })

})
