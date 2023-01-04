<script>
export default {
    name: "Container-1",
    props: {
        title: String,
        leftMargin: {type: Boolean, required: false, default: true}
    }
}
</script>

<template>
    <div class="container" :class="{'left-margin': leftMargin}">
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

.left-margin {
    margin-left: 24px;
}

.title {
    width: 100%;
    padding: 10px 0;

    color: #ffffff;
    background-color: #3b413f;
    text-transform: uppercase;
}
</style>
