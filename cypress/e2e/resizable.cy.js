import ResizablePage from "../pages/ResizablePage";

const resizable = new ResizablePage();

describe("Resizable - Resize Element", () => {
  beforeEach(() => {
    resizable.visit();
  });

  it("should resize element to 400x200", () => {
    resizable.resizeTo(400, 200);
    resizable.verifySize(400, 200);
  });
});
