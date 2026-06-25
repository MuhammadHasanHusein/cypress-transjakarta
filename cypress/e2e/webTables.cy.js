describe("Web Tables - Bulk Registration", () => {
  // ===== POSITIVE TEST =====
  it("should add all users from CSV to the table", () => {
    cy.visit("https://demoqa.com/webtables");
    cy.wait(1000);

    cy.fixture("users.csv").then((csvContent) => {
      const rows = csvContent.trim().split("\n");
      const users = rows.slice(1).map((row) => {
        const values = row.split(",");
        return {
          firstName: values[0].trim(),
          lastName: values[1].trim(),
          email: values[2].trim(),
          age: values[3].trim(),
          salary: values[4].trim(),
          department: values[5].trim(),
        };
      });

      cy.wrap(users).each((user) => {
        cy.wait(500);

        cy.get("#addNewRecordButton").click({ force: true });
        cy.get(".modal-content").should("be.visible");

        cy.get("#firstName").clear().type(user.firstName);
        cy.get("#lastName").clear().type(user.lastName);
        cy.get("#userEmail").clear().type(user.email);
        cy.get("#age").clear().type(user.age.replace(/\D/g, ""));
        cy.get("#salary").clear().type(user.salary.toString().slice(0, 6));
        cy.get("#department").clear().type(user.department);

        cy.get("#firstName").should("have.value", user.firstName);
        cy.get("#userEmail").should("have.value", user.email);

        cy.get("#submit").click({ force: true });
        cy.get(".modal-content", { timeout: 20000 }).should("not.exist");
        cy.wait(500);

        cy.get("tbody").should("contain", user.firstName);
        cy.get("tbody").should("contain", user.email);
      });
    });
  });

  // ===== NEGATIVE TEST 1: Submit form kosong =====
  it("should show validation when submitting empty form", () => {
    cy.visit("https://demoqa.com/webtables");
    cy.get("#addNewRecordButton").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#submit").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#firstName").should("be.visible").and("have.value", "");
    cy.get("#lastName").should("be.visible").and("have.value", "");
    cy.get("#userEmail").should("be.visible").and("have.value", "");
    cy.get("#age").should("be.visible").and("have.value", "");
    cy.get("#salary").should("be.visible").and("have.value", "");
    cy.get("#department").should("be.visible").and("have.value", "");
  });

  // ===== NEGATIVE TEST 2: Email tidak valid =====
  it("should show validation for invalid email format", () => {
    cy.visit("https://demoqa.com/webtables");
    cy.get("#addNewRecordButton").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");
    cy.get("#userEmail").type("invalid-email");
    cy.get("#age").type("25");
    cy.get("#salary").type("5000");
    cy.get("#department").type("IT");
    cy.get("#submit").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#userEmail").should("have.value", "invalid-email");
  });

  // ===== NEGATIVE TEST 3: Age tidak valid =====
  it("should show validation for non-numeric age", () => {
    cy.visit("https://demoqa.com/webtables");
    cy.get("#addNewRecordButton").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("User");
    cy.get("#userEmail").type("test@test.com");
    cy.get("#age").type("abc");
    cy.get("#salary").type("5000");
    cy.get("#department").type("IT");
    cy.get("#submit").click({ force: true });
    cy.get(".modal-content").should("be.visible");
    cy.get("#age")
      .invoke("val")
      .then((val) => {
        expect(val).to.satisfy((v) => v === "abc" || v === "ab" || v === "a" || v === "");
      });
  });
});
