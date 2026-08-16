<template>
  <ul @keydown.stop="handleKeyDown" @keyup.stop="handleKeyUp" v-show="is_active" ref="menuList" role="menu"
      :id="menu_id"
 class="context-menu" v-click-outside="onClickOutside">
    <li role="presentation" v-for="(option, index) in options" :key="index" @click.stop="optionClicked(option)"
        class="item">
      <a role="menuitem">{{ option.name }}</a>
    </li>
  </ul>
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
    // TODO: These should be required!
    menu_id: {type: String, required: false},
  },

  data() {
    return {
      return_id: null,
      identifier: null,
      is_active: false,

      focus_id: 0,
    };
  },

  methods: {
    showMenu(event, identifier, return_id, scrollTop) {
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
      this.return_id = return_id;
      const menu = this.$refs.menuList;

      let menuWidth = menu.offsetWidth;
      let menuHeight = menu.offsetHeight;

      let leftPosition = left + "px";
      let topPosition = top + "px";

      // Check if the Menu will break the window boundaries, and flip side if so.
      if (menuWidth + left >= window.innerWidth) {
        leftPosition = (left - menuWidth) + 'px';
      }

      let windowPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (menuHeight + top >= window.innerHeight + windowPosition) {
        topPosition = (top - menuHeight) + 'px';
      }

      // Set the Position..
      menu.style.left = leftPosition;
      menu.style.top = topPosition;

      // Activate the Menu..
      this.is_active = true;

      // aria-expanded goes on the button, not the menu, and we only know the button here..
      this.setReturnExpanded(true);

      // Wait for the menu to render
      let self = this;
      this.$nextTick(() => {
        self.setFocus(0);
      });
    },

    hideContextMenu() {
      // There are odd cases when this can trigger twice, don't do it if we're not here anymore.
      if (this.is_active) {
        this.$refs.menuList.children[this.focus_id].firstElementChild.tabIndex = -1;
        this.is_active = false;
        this.setReturnExpanded(false);

        // Return focus to the opening button...
        document.getElementById(this.return_id).focus();
        this.$emit('menu-closed');
      }
    },

    setReturnExpanded(expanded) {
      let button = document.getElementById(this.return_id);
      if (button !== null) {
        button.setAttribute('aria-expanded', expanded);
      }
    },

    onClickOutside() {
      this.hideContextMenu();
    },

    optionClicked(option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.identifier,
        option: option,
        return_id: this.return_id
      });
    },

    setFocus(id) {
      // Remove the TabIndex from the Old item..
      this.$refs.menuList.children[this.focus_id].firstElementChild.tabIndex = -1;

      // Set the focus on the new item and select..
      this.$refs.menuList.children[id].firstElementChild.tabIndex = 0;
      this.$refs.menuList.children[id].firstElementChild.focus();
      this.focus_id = id;
    },

    // The browser scrolls on key down, so that's the only place we can stop it. Only prevent the keys we
    // actually use, otherwise Tab gets trapped in here..
    handleKeyDown(e) {
      let children = this.$refs.menuList.childElementCount;

      switch (e.key) {
        case 'Esc':
        case 'Escape':
          e.preventDefault();
          this.hideContextMenu();
          break;

        case 'Up':
        case 'ArrowUp': {
          e.preventDefault();
          if (this.focus_id === 0 && children > 1) {
            this.setFocus(children - 1);
          } else if (children > 1) {
            this.setFocus(this.focus_id - 1);
          }
          break;
        }

        case 'Down':
        case 'ArrowDown': {
          e.preventDefault();
          if ((this.focus_id === children - 1) && children > 1) {
            this.setFocus(0);
          } else if (children > 1) {
            this.setFocus(this.focus_id + 1);
          }
          break;
        }

        case ' ':
        case 'Enter':
          // Handled on key up, but Space would scroll the page without this..
          e.preventDefault();
          break;
      }
    },

    // This stays on key up. Closing puts focus back on the button, and a key up landing there is how Space
    // activates a button, so the menu would just pop straight back open..
    handleKeyUp(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.optionClicked(this.options[this.focus_id]);
      }
    }
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
  background-color: #59b1b6 !important;
  color: white;
}

.context-menu .item:focus-within {
  background-color: #2d3230;
  color: white;
}

.context-menu .item a:focus {
  outline: none;
}

ul:first-child {
  margin-top: 4px;
}

ul:last-child {
  margin-bottom: 4px;
}
</style>
