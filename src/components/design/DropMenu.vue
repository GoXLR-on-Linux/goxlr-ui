<template>
  <div v-show="is_active">
    <ul ref="menuList" class="context-menu" v-click-outside="onClickOutside">
      <li v-for="(option, index) in options" :key="index" @click.stop="optionClicked(option)" class="item">
        <span v-html="option.name"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropMenu",
  emits: ['menu-closed', 'option-clicked'],

  props: {
    options: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      identifier: null,
      is_active: false,
    };
  },

  methods: {
    showMenu(event, identifier, scrollTop) {
      if (scrollTop === undefined) {
        scrollTop = 0;
      }

      let positionElement = event.target;

      // If it's an SVG or Path, we need to locate the containing div..
      let found = false;
      while (!found) {
        if (positionElement.nodeName === "svg" || positionElement.nodeName === "path") {
          positionElement = positionElement.parentNode;
          continue;
        }
        found = true;
      }

      // We want to pop out from the right of whatever element was pressed, note that scrollTop has
      // to be considered, otherwise it'll pop low on scrollers.
      let left = positionElement.offsetLeft;
      let top = positionElement.offsetTop - scrollTop;

      // Now we need to position it to the bottom right of the element clicked..
      left += (positionElement.clientWidth);
      top += (positionElement.clientHeight / 2);


      this.identifier = identifier;
      const menu = this.$refs.menuList;

      let menuWidth = menu.offsetWidth;
      let menuHeight = menu.offsetHeight;

      let leftPosition = left + "px";
      let topPosition = top + "px";

      // Check if the Menu will break the window boundaries, and flip side if so.
      if (menuWidth + left >= window.innerWidth) {
        leftPosition = (left - menuWidth) + 'px';
      }

      if (menuHeight + top >= window.innerHeight) {
        topPosition = (top - menuHeight) + 'px';
      }

      // Set the Position..
      menu.style.left = leftPosition;
      menu.style.top = topPosition;

      // Activate the Menu..
      this.is_active = true;
    },

    hideContextMenu() {
      this.is_active = false;
      this.$emit('menu-closed');
    },

    onClickOutside() {
      this.hideContextMenu();
    },

    optionClicked(option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.identifier,
        option: option,
      });
    },
  },
}
</script>

<style scoped>
.context-menu {
  background-color: #252927;
  color: #fff;
  border: 1px solid #6e7676;
  list-style: none;
  position: absolute;
  left: 0;
  margin: 0;
  padding: 0;
  top: 0;
  z-index: 1000000;
}

.context-menu .item {
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  padding: 5px 15px;
}

.context-menu .item:hover {
  background-color: #59b1b6;
  color: white;
}

ul:first-child {
  margin-top: 4px;
}

ul:last-child {
  margin-bottom: 4px;
}
</style>