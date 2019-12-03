<template>
  <div>
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
      <div id="share">
        <a v-bind:href="$data.shareURL" target="_blank">ツイートする</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
import { Histogram } from "@/Histogram";
import qs from "qs";

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
      originalText: null,

      inputRanks: null,

      disabled: false,

      histogram: null,

      shareURL: null
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

    this.$data.originalText = this.$data.text =
      qs.parse(location.search, { ignoreQueryPrefix: true }).t || "餃子の王将";
  },
  watch: {
    text(text) {
      this.$data.originalText = this.$data.displayText = text;

      const strokes = text
        .split(/(?:)/)
        .map((ch: string) => this.$data.histogram.strokesOfChar(ch));

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

      this.$data.value = Math.floor(avg(this.$data.inputRanks));

      this.$data.shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${this.$data.originalText} 👉 ${this.$data.displayText}`
      )}&url=${encodeURIComponent(location.href)}`;

      history.replaceState(null, "", `?t=${encodeURIComponent(text)}`);
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

          const newS = Math.floor(this.$data.histogram.strokes(newV));
          const chars = this.$data.histogram.charsOfStrokes(newS);
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      this.$data.displayText = text;

      this.$data.shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${this.$data.originalText} 👉 ${this.$data.displayText}`
      )}&url=${encodeURIComponent(location.href)}`;
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

#share {
  margin-top: 3em;
  text-align: center;

  a {
    font-size: 200%;
    text-decoration: none;
    border-bottom: 1px solid;
  }
}

@media (max-width: 768px) {
  #input {
    font-size: 250%;
  }
}
</style>
