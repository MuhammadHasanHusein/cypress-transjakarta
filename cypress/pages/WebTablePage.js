class WebTablePage {
  visit() {
    cy.visit("https://demoqa.com/webtables");
  }

  clickAdd() {
    cy.get("#addNewRecordButton").click();
  }

  fillForm(user) {
    cy.get("#firstName").clear().type(user.firstName);
    cy.get("#lastName").clear().type(user.lastName);
    cy.get("#userEmail").clear().type(user.email);
    cy.get("#age").clear().type(user.age);
    cy.get("#salary").clear().type(user.salary);
    cy.get("#department").clear().type(user.department);
  }

  submitForm() {
    cy.get("#submit").click();
  }

  verifyModalVisible() {
    cy.get(".modal-content").should("be.visible");
  }

  verifyModalNotVisible() {
    cy.get(".modal-content", { timeout: 15000 }).should("not.exist");
  }
}

export default WebTablePage;
