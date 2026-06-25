class ResizablePage {
  visit() {
    cy.visit("https://demoqa.com/resizable");
  }

  resizeTo(width, height) {
    cy.get("#resizableBoxWithRestriction .react-resizable-handle").then(($handle) => {
      const rect = $handle[0].getBoundingClientRect();
      cy.get("#resizableBoxWithRestriction .react-resizable-handle")
        .trigger("mousedown", { button: 0 })
        .trigger("mousemove", {
          clientX: rect.left + width - 200,
          clientY: rect.top + height - 200,
        })
        .trigger("mouseup");
    });
  }

  verifySize(width, height) {
    cy.get("#resizableBoxWithRestriction").should(($el) => {
      expect($el.width()).to.be.closeTo(width, 10);
      expect($el.height()).to.be.closeTo(height, 10);
    });
  }
}

export default ResizablePage;
