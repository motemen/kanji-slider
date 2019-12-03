<template>
  <div id="app">
    <h1>漢字スライダー</h1>
    <input
      id="input"
      type="text"
      v-bind:value="$data.displayText"
      v-on:input="text = $event.target.value"
      x-model="text"
    />
    <vue-slider
      v-model="value"
      :disabled="disabled"
      _tooltip="none"
      @change="updateText"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
import { Histogram, HistogramEntry } from "@/Histogram";

const sum = (xs: number[]): number => {
  let sum = 0;
  for (const x of xs) {
    sum += x;
  }
  return sum;
};

const avg = (xs: number[]): number =>
  sum(xs) / xs.filter((x: number | null) => x !== null).length;

@Component({
  components: {
    VueSlider
  },
  data() {
    return {
      value: null,
      text: null,

      inputRanks: null,

      disabled: false,

      histogram: null,

      charToStorke: {},
      strokeToChars: {}
    };
  },
  async mounted() {
    const data = await fetch("data.tsv").then(f => f.text());
    const entries: HistogramEntry[] = [];
    for (const line of data.split(/\r?\n/)) {
      const [numString, ch] = line.split(/\t/);
      const n = parseInt(numString);
      if (isNaN(n)) continue;
      if (entries.length === 0 || entries[entries.length - 1].value != n) {
        entries.push({
          value: n,
          count: 1
        });
      } else {
        entries[entries.length - 1].count++;
      }
      this.$data.charToStorke[ch] = n;
      this.$data.strokeToChars[n] = Array.prototype.concat.call(
        this.$data.strokeToChars[n] || [],
        ch
      );
    }
    this.$data.histogram = new Histogram(entries);
    this.$data.text = "人月の神話";
  },
  watch: {
    text(val) {
      console.log("watch text", val);

      this.$data.displayText = val;

      const strokes = val
        .split(/(?:)/)
        .map((ch: string) => this.$data.charToStorke[ch]);

      let ok = false;
      this.$data.inputRanks = strokes.map((s: number | undefined) => {
        if (isNaN(s!)) {
          return null;
        } else {
          ok = true;
          return this.$data.histogram.rank(s);
        }
      });

      this.$data.disabled = !ok;

      console.log(this.$data.inputRanks);

      this.$data.value = Math.floor(avg(this.$data.inputRanks));
    }
  },
  methods: {
    updateText() {
      const text = this.$data.text
        .split(/(?:)/)
        .map((ch: string, i: number) => {
          const s = this.$data.charToStorke[ch];
          if (!s) {
            return ch;
          }

          const r0 = avg(this.$data.inputRanks);
          const v = this.$data.value;
          const newV =
            v +
            (this.$data.inputRanks[i] - v) *
              (v < r0 ? v / r0 : (100 - v) / (100 - r0));

          console.log(this.$data.inputRanks[i], r0, v, newV);

          const newS = Math.floor(this.$data.histogram.value(newV));
          const chars = this.$data.strokeToChars[newS];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      this.$data.displayText = text;
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Noto Sans JP", YuGothic, "Avenir Neue", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

#input {
  font-family: "Noto Sans JP", serif, YuGothic, sans-serif;
  font-size: 600%;
  text-align: center;
  border: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  padding: 0.75em;
}

@media (max-width: 768px) {
  #input {
    font-size: 300%;
  }
}
</style>
