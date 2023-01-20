<script>
export default {
    name: "GroupContainer",
    props: {
        title: String,
    }
}
</script>

<template>
    <div class="container">
        <p v-if="title !== ''" class="title">
            {{ title }}
        </p>
        <div class="content">
            <slot></slot>
        </div>
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

    width: fit-content;
    margin: auto;
    padding: 24px;

    background-color: #2D3230;
}

.title {
    padding: 0 0 10px 0;

    color: #ffffff;
    text-transform: uppercase;
}

.content {
    display: flex;
    flex-direction: row;
    gap: 6px;

    height: fit-content;
    width: fit-content;
}
</style>
