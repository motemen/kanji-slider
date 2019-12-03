import { Histogram } from "@/Histogram";

describe("Histogram", () => {
  it("rank() ranges from 0 to 100", () => {
    const hist = new Histogram([
      { value: 1, count: 1 },
      { value: 2, count: 3 },
      { value: 5, count: 2 },
      { value: 7, count: 1 }
    ]);

    expect(hist.rank(1)).toBe(0);
    expect(hist.rank(7)).toBe(100);
    expect(hist.rank(3)).toBe((4 / 7) * 100);
  });

  it("value()", () => {
    const hist = new Histogram([
      { value: 1, count: 1 },
      { value: 2, count: 3 },
      { value: 5, count: 2 },
      { value: 7, count: 1 }
    ]);

    expect(hist.value(0)).toBe(1);
    expect(hist.value((1 / 7) * 100)).toBe(1);
    expect(hist.value(100)).toBe(7);
    expect(hist.value((4 / 7) * 100)).toBe(2);
    expect(hist.value((6 / 7) * 100)).toBe(5);
  });
});
