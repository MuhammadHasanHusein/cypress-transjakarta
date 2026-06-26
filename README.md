# Cypress Automation Test - PT Transportasi Jakarta

**Muhammad Hasan Husein**

Automation testing untuk Web Tables, Droppable, dan Resizable menggunakan Cypress dengan Page Object Model (POM) dan Data-Driven Testing dari file CSV.

---

## Prerequisite

- Node.js >= 18
- npm >= 9
- Google Chrome

---

## Instalasi

Clone repository:

```bash
git clone https://github.com/MuhammadHasanHusein/cypress-transjakarta.git
cd cypress-transjakarta
npm install
```

---
## Dependencies & Plugins

| Package | Versi | Kegunaan |
|---------|-------|----------|
| cypress | ^15.18.0 | Framework automation testing utama |
| csv-parse | latest | Parse data dari file CSV untuk data-driven testing |
| @4tw/cypress-drag-drop | latest | Plugin drag and drop untuk Cypress |
| cypress-real-events | latest | Plugin real mouse/keyboard events untuk Cypress |

### Cara Install Manual (jika diperlukan):

```bash
# Install Cypress
npm install cypress --save-dev

# Install CSV Parse
npm install csv-parse --save-dev

# Install plugin Drag and Drop
npm install @4tw/cypress-drag-drop --save-dev

# Install plugin Real Events
npm install cypress-real-events --save-dev
```

> **Note:** Jika sudah melakukan `npm install` setelah clone repository, semua dependencies di atas akan otomatis terinstall karena sudah terdaftar di `package.json`.

## Struktur Project

cypress/

├── e2e/

│ ├── webTables.cy.js # Test Web Tables (positive & negative)

│ ├── droppable.cy.js # Test Drag and Drop

│ └── resizable.cy.js # Test Resize Element

├── fixtures/

│ └── users.csv # Data test bulk registration

├── pages/

│ ├── WebTablePage.js # Page Object Model - Web Tables

│ ├── DroppablePage.js # Page Object Model - Droppable

│ └── ResizablePage.js # Page Object Model - Resizable

└── support/

├── commands.js

└── e2e.js

cypress.config.js

---

## Menjalankan Test

### Buka Cypress GUI (recommended):

```bash
npx cypress open
```

Pilih E2E Testing → Chrome → pilih spec file yang ingin dijalankan.

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

---

## Test Cases

### Web Tables (https://demoqa.com/webtables)

| Test Type | Skenario                                    |
| --------- | ------------------------------------------- |
| Positive  | Bulk registration seluruh data CSV ke tabel |
| Negative  | Submit form kosong                          |
| Negative  | Email format tidak valid                    |
| Negative  | Age berupa non-numeric                      |

### Droppable - Nilai Tambah (https://demoqa.com/droppable)

| Test Type | Skenario                                          |
| --------- | ------------------------------------------------- |
| Positive  | Drag and drop element, verifikasi status Dropped! |

### Resizable - Nilai Tambah (https://demoqa.com/resizable)

| Test Type | Skenario                                 |
| --------- | ---------------------------------------- |
| Positive  | Resize element ke ukuran 400 x 200 pixel |

---

## Tech Stack

- **Framework:** Cypress v15
- **Pattern:** Page Object Model (POM)
- **Testing:** Data-Driven Testing (CSV)
- **Language:** JavaScript
