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
        <div class="scroll">
            <span
                v-for="option in options"
                :key="option.id"
                :class="['span', { active: selected === option.id }]"
                @click="select(option.id)"
            >
                <input type="radio" :id="option.id" :name="group" :value="option.label">
                <label :for="option.id">{{ option.label }}</label>
            </span>
        </div>
    </Container>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.scroll {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 8px;

    padding: 8px ;
    box-sizing: border-box;
    width: 100%;

    overflow-x: hidden;
    overflow-y: scroll;
}

.scroll::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}

.scroll::-webkit-scrollbar-track {
    background-color: transparent;
}

.scroll::-webkit-scrollbar-thumb {
    background-color: #dfdfdf;
    border-radius: 3px;
}

input[type=radio] {
    opacity: 0;
    width: 0;
    border: 0;
    height: 0;
    margin: 0;
}

span {
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
