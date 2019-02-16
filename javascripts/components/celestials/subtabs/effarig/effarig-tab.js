Vue.component('effarig-tab', {
  data: function() {
    return {
      relicShards: 0,
      shardsGained: 0,
      unlocks: [],
      weights: player.celestials.effarig.glyphWeights,
      typePriorities: ["Power", "Time", "Infinity", "Dilation", "Replication"],
      quote: "",
      quoteIdx: 0,
    };
  },
  methods: {
    update() {
      this.relicShards = player.celestials.effarig.relicShards
      this.shardsGained = Effarig.shardsGained
      this.unlocks = Object.values(EFFARIG_UNLOCKS).map(id => Effarig.has(id))
      this.typePriorities = player.celestials.effarig.typePriorityOrder
      this.quote = Effarig.quote
      this.quoteIdx = player.celestials.effarig.quoteIdx
    },
    startRun() {
      Effarig.startRun()
    },
    adjustWeights(name) {
      let tempTotalWeight = 0
      for (i in this.weights) {
        tempTotalWeight += this.weights[i]
      }
      let tempExtra = tempTotalWeight - 100
      if (this.weights[name] === 100) {
        for (i in this.weights) {
          this.weights[i] = 0;
        }
        this.weights[name] = 100;
      } else {
        while (tempExtra > 0) {
          for (i in this.weights) {
            if (tempExtra > 0 && this.weights[i] > 0 && i != name) {
              this.weights[i]--;
              tempExtra--;
            }
          }
        }
      }
    },
    buyUnlock(id, cost) {
      Effarig.buyUnlock(id, cost)
    },
    move() {
      player.celestials.effarig.typePriorityOrder = this.typePriorities
    },
    nextQuote() {
      Effarig.nextQuote()
    },
    hasNextQuote() {
      return this.quoteIdx < Effarig.maxQuoteIdx
    }
  },
  computed: {
    effarigUnlocks() {
      return EFFARIG_UNLOCKS
    },
    effarigCosts() {
      return EFFARIG_COSTS
    },
  },
  components: {
    "glyph-weight-sliders": {
      props: {
        value: {
          type: Number,
          default: 50
        },
        name: {
          type: String
        }
      },
      template:
        `<div class="o-effarig-slider"> 
          <b>{{ name }} weight: {{ value/100 }}</b>
          <input
            style="margin-left:0rem;"
            :value="value"
            class="o-primary-btn--update-rate__slider"
            type="range"
            min="0"
            max="100"
            @input="emitInput(parseInt($event.target.value))"
          />
         </div>`
    }
  },
  template:
    `<div class="l-effarig-celestial-tab">
      <div class="o-teresa-quotes"> {{ quote }}</div><button class="o-quote-button" @click="nextQuote()" v-if="hasNextQuote()">→</button>
      <div class="c-effarig-relics">You have {{ shortenRateOfChange(relicShards) }} Relic Shards.</div>
      <div class="c-effarig-relic-description">You gain {{ shortenRateOfChange(shardsGained) }} Shards next reality, based on different kinds of glyph effects you have equipped and EP.</div>
      <div class="l-effarig-shop">
        <effarig-unlock-button unlock="ADJUSTER"></effarig-unlock-button>
        <effarig-unlock-button unlock="AUTOSACRIFICE"></effarig-unlock-button>
        <effarig-unlock-button unlock="AUTOPICKER"></effarig-unlock-button>
      </div>
        <effarig-unlock-button unlock="RUN"></effarig-unlock-button>
      <div class="l-effarig-glyph-settings">
        <div v-if="unlocks[effarigUnlocks.AUTOSACRIFICE]">
          Highest type will be picked, lowest sacrificed.
          <draggable :list="typePriorities" @end="move()">
            <div v-for="element in typePriorities" class="o-effarig-glyph-type">{{element}}</div>
          </draggable>
        </div>
        <div v-if="unlocks[effarigUnlocks.ADJUSTER]">
          <div>
            <glyph-weight-sliders v-model="weights.ep" name="EP" @input="adjustWeights('ep')"/>
            <glyph-weight-sliders v-model="weights.repl" name="Replicanti" @input="adjustWeights('repl')"/>
          </div>
          <div>
            <glyph-weight-sliders v-model="weights.dt" name="DT" @input="adjustWeights('dt')"/>
            <glyph-weight-sliders v-model="weights.eternities" name="Eternities" @input="adjustWeights('eternities')"/>
          </div>
        </div>
        <div v-if="unlocks[effarigUnlocks.AUTOPICKER]">Glyph effect weight settings here</div>
      </div>
      <div v-if="unlocks[effarigUnlocks.RUN]"><button class="o-effarig-shop-button effarig-run-button" @click="startRun()">Start a new reality, all production and gamespeed is severely lowered, infinity and time dimensions reduce the production penalty. Glyph levels are temporarily capped. You will gain unlocks at Infinity, Eternity and Reality.</button>
        <div v-if="unlocks[effarigUnlocks.INFINITY_COMPLETE]">Infinity: IP mults are capped at 1e50 in Effarig Reality; infinitied stat raises the replicanti cap and increases your max RG.</div>
        <div v-if="unlocks[effarigUnlocks.ETERNITY_COMPLETE]">Eternity: IP mults are no longer limited in Effarig Reality; eternitied stat generates infinitied stat, unlocks The Enslaved Ones.</div>
        <div v-if="unlocks[effarigUnlocks.REALITY_COMPLETE]">Reality: Unlocks Effarig Glyphs</div>
      </div>
    </div>`
});