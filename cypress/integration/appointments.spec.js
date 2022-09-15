/* eslint-disable no-undef */
describe("Appointments", () => {

  beforeEach(() => {

    // Reset the database
    cy.request("GET", "/api/debug/reset")
      
    // Visit the root
    cy.visit("/");
    cy.contains("Monday");
   });


  // Create Interview
  it("should book an interview", () => {

    // Click the Add button
    cy.get("[alt=Add]")
    .first()
    .click();

    // Input a name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Select an interviewer 
    cy.get("[alt='Sylvia Palmer']").click();

    // Click the Save button
    cy.contains("Save").click();

    // Verify that the student name and interviewer name are displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  //----- Edit Interview -----//
  it("should edit an interview", ()=> {
    
    // Click the Add button
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    // Input a name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    // Select an interviewer 
    cy.get("[alt='Tori Malcolm']").click();

    // Click the Save button
    cy.contains("Save").click();

    // Verify that the student name and interviewer name are displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })


  //----- Cancel Interview -----//
  it("should cancel an interview", () => {

    // Click the Delete button
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    // Click the Confirm button
    cy.contains("Confirm").click();
  
    // The "Deleting" message should appear and disappear
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    // The cancelled interview should not be displayed anymore
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});