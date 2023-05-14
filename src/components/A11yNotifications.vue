//this component is to show the notifications
<template>
    <div class="screenreader-only">
        <div aria-live="assertive">
            {{ assertiveNotification }}
        </div>
        <div aria-live="polite">
            {{ politeNotification }}
        </div>
    </div>
</template>
<script>
import { store } from "@/store";
export default {
    name: "A11yNotifications",
    computed: {
        assertiveNotification() {
            return store.getAccessibilityNotification("assertive");
        },
        politeNotification() {
            return store.getAccessibilityNotification("polite");
        },
    },
};
</script>
<style scoped>
.screenreader-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;

    /**
    position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
   */
}
</style>
