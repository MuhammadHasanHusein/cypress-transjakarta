describe("Droppable - Drag and Drop", () => {
  it("should successfully drag element to drop target", () => {
    cy.visit("https://demoqa.com/droppable");
    cy.wait(2000);

    cy.window().then((win) => {
      cy.get("#draggable").then(($drag) => {
        cy.get("#droppable").then(($drop) => {
          const dragRect = $drag[0].getBoundingClientRect();
          const dropRect = $drop[0].getBoundingClientRect();

          // step 1: mousedown di draggable
          $drag[0].dispatchEvent(
            new win.MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: dragRect.left + 10,
              clientY: dragRect.top + 10,
            }),
          );

          // step 2: mousemove bertahap dari drag ke drop
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

          // step 3: mouseup di droppable
          $drop[0].dispatchEvent(
            new win.MouseEvent("mouseup", {
              bubbles: true,
              cancelable: true,
              view: win,
              clientX: dropRect.left + dropRect.width / 2,
              clientY: dropRect.top + dropRect.height / 2,
            }),
          );

          // step 4: trigger drop event di droppable
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

    cy.wait(2000);
    cy.get("#droppable").should("contain.text", "Dropped!");
  });
});
