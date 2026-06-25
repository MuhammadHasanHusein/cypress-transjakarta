# Cypress Automation Test - PT Transportasi Jakarta

Automation testing untuk Web Tables, Droppable, dan Resizable menggunakan Cypress dengan Page Object Model (POM).

## Prerequisite

- Node.js >= 18
- npm >= 9
- Google Chrome

## Instalasi

Clone repository:

```bash
git clone <repo-url>
cd cypress-transjakarta
npm install
```

## Menjalankan Test

### Buka Cypress GUI:

```bash
npx cypress open
```

### Jalankan semua test via terminal (headless):

```bash
npx cypress run
```

### Jalankan test spesifik:

```bash
npx cypress run --spec "cypress/e2e/webTables.cy.js"
npx cypress run --spec "cypress/e2e/droppable.cy.js"
npx cypress run --spec "cypress/e2e/resizable.cy.js"
```

## Struktur Project
