<template>
  <v-container fluid> </v-container>
</template>

<script>
export default {
  name: "UserFilter",
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },
  },
  mounted() {},
  methods: {},
};
</script>
