<template>
  <!-- Name -->
  <b-form-group
      id="name_group"
      label="Имя:"
      :disabled="disabled"
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
        <b-dropdown ref="dropdown" :variant="dropDownVariant">
          <b-dropdown-item
              v-for="(item, i) in names"
              :key="`${item}-${i}`"
              :data-value="item"
              @click="$emit('onChangeName', $event.target.innerText)"
          >
            {{item}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <b-form-input
          id="name"
          :state="controlState"
          v-model.trim="name_"
          :maxlength="max"
          :class="validateClasses"
          autocomplete="off"
      />
    </b-input-group>
  </b-form-group>
</template>

<script>
  export default {
    name: "NameControl",
    props: {
      disabled: Boolean,
      name: String,
      names: Array,
      controlState: {
        type: [Boolean, Object],
        default: null
      },
      validateClasses: {
        type: Object,
        default: () => ({})
      },
      dropDownVariant: {
        type: String,
        default: 'outline-success'
      }
    },
    data() {
      return {
        max: 60
      }
    },
    computed: {
      name_: {
        get() {
          return this.name;
        },
        set(v) {
          this.$emit('onChangeName', v);
        }
      }
    }
  }
</script>

<style scoped>

</style>
