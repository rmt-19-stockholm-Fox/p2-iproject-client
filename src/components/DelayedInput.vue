<template>
  <input :value="value" @input="handleInput" 
    @blur="handleBlur('blur')" 
    @focus="$emit('focus')"
  />
</template>

<script>
export default {
  name: 'DelayedInput',
  props: {
    value: String,
    delay: {
      type: Number,
      default: 750
    }
  },
  data() {
    return {
      setter: null,
      blueEmiter: null
    }
  },
  methods: {
    handleInput(e) {
      if (this.setter != null) {
        clearTimeout(this.setter);
      }

      this.setter = setTimeout(() => {
        this.$emit('input', e.target.value);
        this.setter = null;
      }, this.delay);
    },
    handleBlur(state) {
      if (this.blueEmiter != null) {
        clearTimeout(this.blueEmiter);
      }

      this.blueEmiter = setTimeout(() => {
        this.$emit(state);
        this.blueEmiter = null;
      }, 200);
    }
  }
}
</script>
