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

          $drag[0].dispatchEvent(
            new win.MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: dragRect.left + 10,
              clientY: dragRect.top + 10,
            }),
          );

          const steps = 20;
          for (let i = 1; i <= steps; i++) {
            const x = dragRect.left + 10 + ((dropRect.left + dropRect.width / 2 - dragRect.left - 10) * i) / steps;
            const y = dragRect.top + 10 + ((dropRect.top + dropRect.height / 2 - dragRect.top - 10) * i) / steps;
            win.document.dispatchEvent(
              new win.MouseEvent("mousemove", {
                bubbles: true,
                cancelable: true,
                view: win,
                clientX: x,
                clientY: y,
              }),
            );
          }

          $drop[0].dispatchEvent(
            new win.MouseEvent("mouseup", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: dropRect.left + dropRect.width / 2,
              clientY: dropRect.top + dropRect.height / 2,
            }),
          );

          $drop[0].dispatchEvent(
            new win.MouseEvent("drop", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: dropRect.left + dropRect.width / 2,
              clientY: dropRect.top + dropRect.height / 2,
            }),
          );
        });
      });
    });
  }

  verifyDropSuccess() {
    cy.get("#droppable").should("contain.text", "Dropped!");
  }
}

export default DroppablePage;
