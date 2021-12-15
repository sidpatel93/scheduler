describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit the interview", () => {
    cy.get("[alt='Edit']")
      .first()
      .click({ force: true })
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Sid Patel")
      .get("[alt='Tori Malcolm']")
      .click()
    cy.contains("Save").click();
  cy.contains(/Saving/i).should("exist");
  cy.contains(/Saving/i).should("not.exist");
    cy.contains("Sid Patel");
    cy.contains("Tori Malcolm");
  })

  it("should calcel an interview", ()=> {
    cy.get("[alt='Delete']")
      .first()
      .click({ force: true })
    cy.contains("Confirm"). click()
    cy.contains(/Deleting/i).should("exist");
    cy.contains(/Deleting/i).should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  })
})