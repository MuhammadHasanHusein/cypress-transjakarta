class DroppablePage {
  visit() {
    cy.visit("https://demoqa.com/droppable");
  }

  dragAndDrop() {
    cy.window().then((win) => {
      cy.get("#draggable").then(($drag) => {
        cy.get("#droppable").then(($drop) => {
          const dragRect = $drag[0].getBoundingClientRect();
          const dropRect = $drop[0].getBoundingClientRect();

          const dragStart = new win.MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: win,
            clientX: dragRect.left + 10,
            clientY: dragRect.top + 10,
          });
          $drag[0].dispatchEvent(dragStart);

          const moveSteps = 10;
          for (let i = 1; i <= moveSteps; i++) {
            const moveX = dragRect.left + 10 + ((dropRect.left + 10 - dragRect.left - 10) * i) / moveSteps;
            const moveY = dragRect.top + 10 + ((dropRect.top + 10 - dragRect.top - 10) * i) / moveSteps;
            const mouseMove = new win.MouseEvent("mousemove", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: moveX,
              clientY: moveY,
            });
            win.document.dispatchEvent(mouseMove);
          }

          const mouseUp = new win.MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: win,
            clientX: dropRect.left + 10,
            clientY: dropRect.top + 10,
          });
          $drop[0].dispatchEvent(mouseUp);
        });
      });
    });
  }

  verifyDropSuccess() {
    cy.get("#droppable").should("contain.text", "Dropped!");
  }
}

export default DroppablePage;
