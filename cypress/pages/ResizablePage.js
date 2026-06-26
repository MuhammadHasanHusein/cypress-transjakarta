class ResizablePage {
  visit() {
    cy.visit("https://demoqa.com/resizable");
  }

  resizeTo(width, height) {
    cy.get("#resizableBoxWithRestriction .react-resizable-handle").then(($handle) => {
      const rect = $handle[0].getBoundingClientRect();
      cy.get("#resizableBoxWithRestriction .react-resizable-handle")
        .trigger("mousedown", { button: 0, force: true })
        .trigger("mousemove", {
          clientX: rect.left + (width - 200),
          clientY: rect.top + (height - 200),
          force: true,
        })
        .trigger("mouseup", { force: true });
    });
  }

  verifySize(width, height) {
    // toleransi lebih besar karena browser rendering tidak selalu exact
    cy.get("#resizableBoxWithRestriction").should(($el) => {
      expect($el.width()).to.be.closeTo(width, 50);
      expect($el.height()).to.be.closeTo(height, 50);
    });
  }
}

export default ResizablePage;
