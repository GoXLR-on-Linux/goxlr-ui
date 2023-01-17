<script>
export default {
    name: "Container-4",
}
</script>

<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    /* display: flex;
    flex-direction: column;
    align-items: center;

    width: fit-content;
    padding: 20px;

    background-color: #2D3230; */
}
</style>
