<template>
  <div style="margin-left: 8px; margin-right: 8px">
    <div class="tab">
      <button v-for="tab in tabs" :key="tab.name" :class="{ 'active': tab.isActive }" v-show="!tab.hidden" @click="selectTab(tab)">{{tab.name}}</button>
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
  padding: 10px 20px;
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

.tabs-details {
  border: 1px solid #59b1b6;
  border-top: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
  vertical-align: middle;
}

</style>