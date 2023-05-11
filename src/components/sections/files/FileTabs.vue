<template>
    <Tabs style="width: 480px" label="Profiles and Files">
        <Tab name="Profiles" :selected="true">
            <ProfileHandler />
        </Tab>
        <Tab v-if="!isDeviceMini()" name="Samples">
            <SampleHandler />
        </Tab>
        <Tab v-if="!isDeviceMini()" name="Presets">
            <PresetHandler />
        </Tab>
    </Tabs>
</template>

<script>
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import ProfileHandler from "@/components/profiles/handlers/ProfileHandler";
import PresetHandler from "@/components/sections/files/PresetHandler";
import SampleHandler from "@/components/sections/files/SampleHandler";
import { isDeviceMini } from "@/util/util";

export default {
    name: "FileTabs",
    methods: {
        isDeviceMini,
    },
    components: { SampleHandler, PresetHandler, ProfileHandler, Tabs, Tab },
};
</script>

<style scoped></style>
