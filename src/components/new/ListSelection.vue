<script>
import Container from "@/components/new/Container01";

export default {
    name: "ListSelection",
    components: {
        Container
    },

    props: {
        group: String,
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
    <Container role="radiogroup">
        <span
            v-for="option in options"
            :key="option"
            :class="['span', { active: selected === option }]"
            @click="select(option)"
        >
            <input type="radio" :id="option" :name="group" :value="option">
            <label :for="option">{{ option }}</label>
        </span>
    </Container>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

input[type=radio] {
    opacity: 0;
    width: 0;
    border: 0;
    height: 0;
    margin: 0;
}

span {
    width: 168px;

    margin-top: 8px;
    padding: 8px;

    color: #959796;
    background-color: #383D3B;
    border: none;
    text-align: start;
    font-family: LeagueMonoCondensed, sans-serif;
    font-size: 13px;
}

span:hover:not(.active) {
    background-color: #49514e;
}

span.active {
  color: #353937;
  background-color: #59b1b6;
}

span.disabled {
  color: #959796;
  background-color: #383D3B;
}
</style>
