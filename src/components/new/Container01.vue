<script>
export default {
    name: "Container-1",
    props: {
        title: String
    }
}
</script>

<template>
    <div class="container">
        <p class="title">
            {{ title }}
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
    width: 200px;

    background-color: #353937;
}

.title {
    width: 100%;
    padding: 10px 0;

    color: #ffffff;
    background-color: #3b413f;
    text-transform: uppercase;
}
</style>
