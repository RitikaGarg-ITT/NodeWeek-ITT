test("addition", () => {
  expect(2 + 2).toBe(4);
});

test("null", () => {
  const i = null;
  expect(i).toBeNull();
  expect(i).toBeDefined();
});

const animals = ["cat", "dog"];
test("Animal Array", () => {
  expect(animals).toContain("cat");
});

const getData = () => {
  throw new Error("Not Found");
};

test("getData", () => {
  expect(() => getData()).toThrow();
});


