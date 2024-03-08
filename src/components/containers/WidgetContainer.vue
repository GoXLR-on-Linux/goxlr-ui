<script>
export default {
    name: "WidgetContainer",
    props: {
        title: String,
        maxWidth: { type: String, default: "fit-content"}
    }
}
</script>

<template>
    <div class="container">
        <p class="title" role="heading" aria-level="3">
            <slot name="title">{{ title }}</slot>
        </p>
        <slot></slot>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 220px;
    min-width: 200px;
    max-width: v-bind(maxWidth);

    background-color: #353937;
}

.title {
    width: 100%;
    padding: 10px 0;

    color: #ffffff;
    background-color: #3b413f;
    text-transform: uppercase;
    text-align: center;
}
</style>
