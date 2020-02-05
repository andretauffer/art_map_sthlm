describe("In the add item view", () => {
  it("visits the create item view", () => {
    cy.visit("/form");
  });
});
describe("The add item form", () => {
  beforeEach(() => {
    cy.get(".input-name").clear();
    cy.get(".input-latitude").clear();
    cy.get(".input-longitude").clear();
    cy.get(".input-description").clear();
    cy.get(".input-name").clear();
  });
  it("name input field should be on focus when page is first visited", () => {
    cy.get(".input-name").should("have.focus");
  });
  it("accepts text in the name input field", () => {
    cy.get(".input-name")
      .type("fake name")
      .should("have.value", "fake name");
  });
  it("should accept numbers in the latitude and longitude fields", () => {
    cy.get(".input-latitude")
      .type("19519")
      .should("have.value", "19519");
    cy.get(".input-longitude")
      .type("19519")
      .should("have.value", "19519");
  });
  it("should accept all characters in the description field", () => {
    cy.get(".input-description")
      .type("fake name123123!@#$")
      .should("have.value", "fake name123123!@#$");
  });
  it("should pop notification when succesfully added item", () => {
    cy.get(".input-name")
      .type("fake name")
      .should("have.value", "fake name");
    cy.get(".input-latitude")
      .type("19519")
      .should("have.value", "19519");
    cy.get(".input-longitude")
      .type("19519")
      .should("have.value", "19519");
    cy.get(".input-description")
      .type("fake name123123!@#$")
      .should("have.value", "fake name123123!@#$");
    cy.get(".request-button").click();
    //should display notification
    //fields should be cleared
    cy.get(".input-name").should("be.empty");
    cy.get(".input-latitude").should("be.empty");
    cy.get(".input-longitude").should("be.empty");
    cy.get(".input-description").should("be.empty");
  });
});
