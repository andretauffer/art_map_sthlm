describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });
  it("visits the app", () => {
    cy.visit("/");
  });
  it("visits the app", () => {
    cy.visit("/gallery");
  });
  it("visits the app", () => {
    cy.visit("/form");
  });
});
