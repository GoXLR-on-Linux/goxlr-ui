<template>
    <div style="margin-left: 8px; margin-right: 8px">
        <div class="tab" role="TabList" :aria-label="this.label">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                :class="{ active: tab.isActive }"
                v-show="!tab.hidden"
                @click="selectTab(tab)"
                role="tab"
                :aria-selected="tab.isActive"
                :tabindex="tab.isActive ? 0 : -1"
                :ref="tab.name"
            >
                {{ tab.name }}
            </button>
        </div>
        <div
            class="tabs-details"
            role="tabpanel"
            :aria-label="getActiveTab().name"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabList",

    data() {
        return { tabs: [] };
    },
    props: {
        label: {
            type: String,
            required: false,
            default: "Tab list",
        },
    },

    created() {window.addEventListener("keydown",this.onTabKeydown)},
    unmounted(){window.removeEventListener("keydown",this.onTabKeydown)},
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach((tab) => {
                tab.isActive = tab.name === selectedTab.name;
            });
        },
        getActiveTab() {
            //return the active tab
            const activeTab = this.tabs.find((tab) => tab.isActive);
            if (activeTab) {
                return activeTab;
            } else {
                return "";
            }
        },
        //keyboard navigation
        onTabKeydown(event) {
            const tabs = this.tabs;
            const activeTab = this.getActiveTab();
            const activeTabIndex = tabs.indexOf(activeTab);
            let nextTab;

            if(event.shiftKey){
                // Shift(Number) have different symbol between US keyboard and Other language. 
                switch(event.code){
                    case "Digit1":
                    case "Digit2":
                    case "Digit3":
                    case "Digit4":
                    case "Digit5":
                    case "Digit6":
                    case "Digit7":
                    case "Digit8":
                        nextTab = tabs[Number(event.code[5])-1];
                        break;
                    default:
                        break;
                }
                switch(event.key){
                    case "S":
                    case "D":
                        nextTab = tabs[(activeTabIndex + 1) % tabs.length];
                        break;
                    case "W":
                    case "A":
                        nextTab = tabs[(activeTabIndex - 1 + tabs.length) % tabs.length];
                        break;
                    case "Q":
                        nextTab = tabs[0];
                        break;
                    case "E":
                        nextTab = tabs[tabs.length-1];
                        break;
                    default:
                        break;
                }
            } else {  
                switch(event.key){
                    case "ArrowRight":
                    case "ArrowDown":
                    case "PageDown":
                        nextTab = tabs[(activeTabIndex + 1) % tabs.length];
                        break;
                    case "ArrowLeft":
                    case "ArrowUp":
                    case "PageUp":
                        nextTab = tabs[(activeTabIndex - 1 + tabs.length) % tabs.length];
                        break;
                    case "Home":
                        nextTab = tabs[0];
                        break;
                    case "End":
                        nextTab = tabs[tabs.length-1];
                        break;
                    default:
                        break;
                }
            }

            if (nextTab) {
                this.selectTab(nextTab);
                //nextTab.$el is the button element
                //we need a ref on the button element to focus it
                this.$refs[nextTab.name][0].focus();
            }
        },
    },
};
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

    text-shadow: 0 0 3px #59b1b6, 0 0 5px #59b1b6;
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
