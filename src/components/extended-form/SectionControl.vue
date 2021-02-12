<template>
  <b-form-group
      v-if="verified"
      id="section_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Раздел (выбрать из списка):
    </template>
    <b-form-select
        id="section"
        v-model="section_"
        :options="sections"
        :state="success"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  import {store} from '../../store';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "SectionControl",
    store,
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'verified',
        'sending',
        'success',
        'sections',
        'section'
      ]),
      section_: {
        get() {
          return this.section;
        },
        set(v) {
          this.setSection(v);
        },
      }
    },
    methods: {
      ...mapMutations([
        'setSection'
      ])
    },
  }
</script>

<style scoped>

</style>
