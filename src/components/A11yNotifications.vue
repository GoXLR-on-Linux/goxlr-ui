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