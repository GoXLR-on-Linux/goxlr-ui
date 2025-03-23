<template>
  <div>
    <BigButton id="license_button" ref="license_button" :title="$t('message.system.licenses')" @button-clicked="$refs.licenseModal.openModal(undefined, $refs.license_button)">
      <font-awesome-icon icon="fa-solid fa-book-open"/>
    </BigButton>
    <AccessibleModal width="680px" ref="licenseModal" id="license_modal" :show_footer=false>
      <template v-slot:title>{{ $t('message.system.licenses') }}</template>
      <textarea
          style="width: 630px; height: 710px; background-color: #2B2F2D; color: #fff; border: 1px solid #000; resize: none"
          disabled>Copyright (c) 2022 Nathan Adams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-----------------------------------------------------------------------------------

Copyright 2022 Music Tribe Brands CA Ltd.

This code and documentation contain information and intellectual property that
is owned by MUSIC TRIBE. Permission is hereby granted to any person obtaining a
copy of this software and associated documentation files to use the information
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and to permit persons to whom the software
and documentation is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</textarea>
    </AccessibleModal>
  </div>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";

export default {
  name: "LicenseButton",
  components: {BigButton, AccessibleModal},

  data() {
    return {
      setupTitle: "Licenses"
    }
  }
}
</script>

<style scoped>

</style>