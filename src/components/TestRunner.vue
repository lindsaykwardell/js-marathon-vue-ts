<template>
  <button
    class="start-test-button w-full transition duration-150 text-white py-2 text-xl font-bold shadow hover:shadow-lg flex justify-center items-center"
    :class="testButtonClass"
    :disabled="testRunnerStatus === 'RUNNING'"
    @click="$emit('initTests')"
  >
    <template v-if="testRunnerStatus !== 'RUNNING'"> Start Tests </template>
    <template v-else> <Spinner /> Performing Tests... </template>
  </button>
  <div v-if="tests.length > 0" class="py-3 italic text-center">
    <div class="text-green-600 tests-passed">
      {{ totalPassedTests }}/{{ tests.length }} tests passed
    </div>
    <div
      class="text-red-700 tests-failed"
      :class="{ 'font-bold': totalFailedTests > 0 }"
    >
      {{ totalFailedTests }}/{{ tests.length }} tests failed
    </div>
    <div v-if="totalRunningTests" class="py-2 remaining-tests">
      Waiting on {{ totalRunningTests }} tests...
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner";

export default {
  emits: ["initTests"],
  props: {
    testRunnerStatus: {
      type: String,
      default: "IDLE",
    },
    tests: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    testButtonClass() {
      if (this.testRunnerStatus === "RUNNING")
        return "bg-green-300 cursor-not-allowed";
      else return "bg-green-500 hover:bg-green-400";
    },
    totalRunningTests() {
      return this.tests.filter((test) => test.status === "RUNNING").length;
    },
    totalPassedTests() {
      return this.tests.filter((test) => test.status === "SUCCESS").length;
    },
    totalFailedTests() {
      return this.tests.filter((test) => test.status === "FAILURE").length;
    },
  },
  components: {
    Spinner,
  },
};
</script>
