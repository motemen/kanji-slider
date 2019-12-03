export interface HistogramEntry {
  value: number;
  count: number;
}

export interface Item {
  name: string;
  value: number;
}

export class Histogram {
  /**
   * entries: Sorted by value, ascending order
   */
  constructor(private readonly entries: HistogramEntry[]) {}

  readonly min = this.entries[0].value;
  readonly max = this.entries[this.entries.length - 1].value;
  readonly total = this.entries.reduce((sum, e) => sum + e.count, 0);

  rank(value: number): number {
    const { entries, min, max, total } = this;

    // expand value in range [M, N] to [M-0.5, N+0.5]
    const center = (min + max) / 2;
    const radius = max - center;
    value = center + ((value - center) * (radius + 0.5)) / radius;

    let acc = 0;
    for (const e of entries) {
      if (e.value < value) {
        acc += e.count;
      }
    }

    return (acc / total) * 100;
  }

  value(rank: number): number {
    const { entries, total } = this;

    rank /= 100;

    // if (rank === 0) {
    //   return entries[0].value;
    // }

    let cnt = 0;
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      cnt += e.count;
      if (cnt / total >= rank) {
        let value = e.value;
        if (i + 1 < entries.length) {
          value +=
            ((entries[i + 1].value - entries[i].value) / entries[i + 1].count) *
            (cnt / total - rank);
        }
        return value;
      }
    }

    return entries[entries.length - 1].value;
  }
}
