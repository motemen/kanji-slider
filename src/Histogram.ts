export interface Item {
  character: string;
  strokes: number;
}

export interface Bucket {
  strokes: number;
  count: number;
}

export class Histogram {
  readonly buckets: Bucket[];
  readonly min: number;
  readonly max: number;
  readonly total: number;
  readonly itemsByStrokes: Record<number, Item[]>;
  readonly itemByCharacter: Record<string, Item>;

  constructor(items: Item[]) {
    if (items.length === 0) {
      throw "items should no be empty";
    }

    items = items.sort((a, b) => a.strokes - b.strokes);

    this.min = items[0].strokes;
    this.max = items[items.length - 1].strokes;
    this.total = items.length;
    this.itemsByStrokes = {};
    this.itemByCharacter = {};

    const buckets = [];
    for (const item of items) {
      if (!this.itemsByStrokes[item.strokes]) {
        this.itemsByStrokes[item.strokes] = [];
      }
      this.itemsByStrokes[item.strokes].push(item);
      this.itemByCharacter[item.character] = item;

      if (
        buckets.length === 0 ||
        buckets[buckets.length - 1].strokes != item.strokes
      ) {
        buckets.push({
          strokes: item.strokes,
          count: 1
        });
      } else {
        buckets[buckets.length - 1].count++;
      }
    }
    this.buckets = buckets;
  }

  rank(strokes: number): number {
    const { buckets, min, max, total } = this;

    // expand strokes in range [M, N] to [M-0.5, N+0.5]
    const center = (min + max) / 2;
    const radius = max - center;
    strokes = center + ((strokes - center) * (radius + 0.5)) / radius;

    let acc = 0;
    for (const b of buckets) {
      console.log(b);
      if (b.strokes < strokes) {
        acc += b.count;
      }
    }

    console.log(acc, total, 100);
    return (acc / total) * 100;
  }

  strokes(rank: number): number {
    const { buckets, total } = this;

    rank /= 100;

    if (rank === 0) return this.min;

    let cnt = 0;
    for (let i = 0; i < buckets.length; i++) {
      const b = buckets[i];
      cnt += b.count;
      if (cnt / total >= rank) {
        let strokes = b.strokes;
        if (i + 1 < buckets.length) {
          strokes +=
            ((buckets[i + 1].strokes - buckets[i].strokes) /
              buckets[i + 1].count) *
            (cnt / total - rank);
        }
        return strokes;
      }
    }

    return this.max;
  }

  strokesOfChar(ch: string): number | undefined {
    return this.itemByCharacter[ch] && this.itemByCharacter[ch].strokes;
  }

  charsOfStrokes(strokes: number): string[] {
    return this.itemsByStrokes[strokes].map(item => item.character);
  }
}
