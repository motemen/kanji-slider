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
    <vue-slider v-model="value" :disabled="disabled" @change="updateText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
import { Histogram } from "@/Histogram";

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

      histogram: null
    };
  },
  async mounted() {
    const data = await fetch("data.tsv").then(f => f.text());

    this.$data.histogram = new Histogram(
      data
        .split(/\r?\n/)
        .splice(1)
        .filter(line => line.length > 0)
        .map(line => {
          const [n, character] = line.split(/\t/);
          return {
            character,
            strokes: parseInt(n)
          };
        })
    );

    this.$data.text = "餃子の王将";
  },
  watch: {
    text(val) {
      this.$data.displayText = val;

      const strokes = val
        .split(/(?:)/)
        .map((ch: string) => this.$data.histogram.strokesOfChar(ch));

      console.log(strokes);

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
          const s = this.$data.histogram.strokesOfChar(ch);
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

          const newS = Math.floor(this.$data.histogram.strokes(newV));
          const chars = this.$data.histogram.charsOfStrokes(newS);
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
