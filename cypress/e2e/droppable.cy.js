describe('Droppable - Drag and Drop', () => {
  it('should successfully drag element to drop target', () => {
    cy.visit('https://demoqa.com/droppable')
    cy.wait(2000)

    cy.window().then(win => {
      cy.get('#draggable').then($drag => {
        cy.get('#droppable').then($drop => {
          const dragRect = $drag[0].getBoundingClientRect()
          const dropRect = $drop[0].getBoundingClientRect()

          const dragStart = new win.MouseEvent('mousedown', {
            bubbles: true, cancelable: true, view: win,
            clientX: dragRect.left + 10,
            clientY: dragRect.top + 10
          })
          $drag[0].dispatchEvent(dragStart)

          cy.wait(100)

          const moveSteps = 10
          for (let i = 1; i <= moveSteps; i++) {
            const moveX = dragRect.left + 10 + ((dropRect.left + 10 - dragRect.left - 10) * i / moveSteps)
            const moveY = dragRect.top + 10 + ((dropRect.top + 10 - dragRect.top - 10) * i / moveSteps)
            const mouseMove = new win.MouseEvent('mousemove', {
              bubbles: true, cancelable: true, view: win,
              clientX: moveX, clientY: moveY
            })
            win.document.dispatchEvent(mouseMove)
          }

          cy.wait(200)

          const mouseUp = new win.MouseEvent('mouseup', {
            bubbles: true, cancelable: true, view: win,
            clientX: dropRect.left + 10,
            clientY: dropRect.top + 10
          })
          $drop[0].dispatchEvent(mouseUp)
        })
      })
    })

    cy.wait(1000)
    cy.get('#droppable').should('contain.text', 'Dropped!')
  })
})