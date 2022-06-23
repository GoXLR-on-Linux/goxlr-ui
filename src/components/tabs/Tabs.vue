<template>
  <div>
    <div class="tab">
      <button v-for="tab in tabs" :key="tab.name" :class="{ 'active': tab.isActive }" @click="selectTab(tab)">{{tab.name}}</button>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabList",

  data() {
    return {tabs: []};
  },

  created() {

  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name)
      });
    }
  }
}
</script>

<style>
.tab {
  border-bottom: 1px solid #59b1b6;
  text-align: left;
}

.tab button {
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  margin-bottom: -1px;
  width: 150px;

  /*font-family: LeagueMonoVariable, sans-serif;*/
  border-radius: 5px 5px 0 0;
  color: #fff;
}

.tab button:hover:not(.active) {
  background-color: #2d3230;
}

.tab button.active {
  border: 1px solid #59b1b6;
  border-bottom: 1px solid #252927;


  text-shadow:
      0 0 3px #59b1b6,
      0 0 5px #59b1b6;
}

.tab .filler {
  border: 1px solid #fff;
  width: 100%;
}

.tabs-details {
  border: 1px solid #59b1b6;
  border-top: 0;

  overflow-x: scroll;
}

.tabs-details::-webkit-scrollbar {
  height: 6px;
}

.tabs-details::-webkit-scrollbar-track {
  background-color: transparent;
}

.tabs-details::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}

</style>