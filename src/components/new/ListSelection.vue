<script>
import Container from "@/components/new/Container01";

export default {
    name: "ListSelection",
    components: {
        Container
    },

    props: {
        options: Array,
        selected: String
    },

    methods: {
        select(option) {
            this.$emit('selection-changed', option);
        }
    }
}
</script>

<template>
    <Container :leftMargin="false">
        <button
            v-for="option in options"
            :key="option"
            :class="['button', { active: selected === option }]"
            @click="select(option)"
        >
            {{ option }}
        </button>
    </Container>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

button {
    width: calc(100% - 16px);

    margin-top: 8px;
    padding: 8px;

    color: #959796;
    background-color: #383D3B;
    border: none;
    text-align: start;
    font-family: LeagueMonoCondensed, sans-serif;
    font-size: 13px;
}

button:hover:not(.active) {
    background-color: #49514e;
}

button.active {
  color: #353937;
  background-color: #59b1b6;
}

button.disabled {
  color: #959796;
  background-color: #383D3B;
}
</style>
