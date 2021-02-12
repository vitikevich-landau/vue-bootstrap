<template>
  <!-- Name -->
  <b-form-group
      id="name_group"
      label="Имя:"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Имя:
      <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
    </template>
    <b-input-group>
      <!-- Show if items more > 1 -->
      <template #append v-if="names.length > 1">
        <b-dropdown ref="dropdown" variant="outline-success">
          <b-dropdown-item
              v-for="(item, i) in names"
              :key="`${item}-${i}`"
              :data-value="item"
              @click="name_ = $event.target.innerText"
          >
            {{item}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <b-form-input id="name" :state="success" v-model.trim="name_" :maxlength="max"
                    autocomplete="off"></b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script>
  import {store} from '../../store/simple-form';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "NameControl",
    store,
    data() {
      return {
        max: 60
      }
    },
    computed: {
      ...mapGetters([
        'sending',
        'names',
        'name',
        'success'
      ]),
      name_: {
        get() {
          return this.name;
        },
        set(v) {
          this.setName(v);
        }
      }
    },
    methods: {
      ...mapMutations([
        'setName'
      ])
    }
  }
</script>

<style scoped>

</style>
