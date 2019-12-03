import { Histogram } from "@/Histogram";

describe("Histogram", () => {
  it("rank() ranges from 0 to 100", () => {
    const hist = new Histogram([
      { character: "一", strokes: 1 },
      { character: "二", strokes: 2 },
      { character: "人", strokes: 2 },
      { character: "八", strokes: 2 },
      { character: "世", strokes: 5 },
      { character: "丼", strokes: 5 },
      { character: "串", strokes: 7 }
    ]);

    expect(hist.rank(1)).toBe(0);
    expect(hist.rank(7)).toBe(100);
    expect(hist.rank(3)).toBe((4 / 7) * 100);
  });

  it("value()", () => {
    const hist = new Histogram([
      { character: "一", strokes: 1 },
      { character: "二", strokes: 2 },
      { character: "人", strokes: 2 },
      { character: "八", strokes: 2 },
      { character: "世", strokes: 5 },
      { character: "丼", strokes: 5 },
      { character: "串", strokes: 7 }
    ]);

    expect(hist.strokes(0)).toBe(1);
    expect(hist.strokes((1 / 7) * 100)).toBe(1);
    expect(hist.strokes((4 / 7) * 100)).toBe(2);
    expect(hist.strokes((6 / 7) * 100)).toBe(5);
    expect(hist.strokes(100)).toBe(7);
  });
});
