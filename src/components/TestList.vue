<template>
  <ul>
    <li
      class="test flex items-center py-1"
      :class="testClass(test)"
      v-for="test in tests"
      :key="test.id"
    >
      <Spinner v-if="test.status === 'RUNNING'" />
      {{ test.description }}
    </li>
  </ul>
</template>

<script>
import Spinner from "./Spinner";

export default {
  props: {
    tests: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    testClass(test) {
      if (test.status === "SUCCESS") {
        return "text-green-600 italic test-passed";
      } else if (test.status === "FAILURE") {
        return "text-red-700 font-bold test-failed";
      } else if (test.status === "IDLE") {
        return "test-idle";
      }
    },
  },
  components: {
    Spinner,
  },
};
</script>

<style lang="postcss" scoped>
.test-idle:before {
  @apply pr-4;
  content: "?" !important;
}

.test-failed:before {
  @apply pr-1;
  content: "\2716\0020" !important;
}

.test-passed:before {
  @apply pr-1;
  content: "\2714\0020" !important;
}
</style>
