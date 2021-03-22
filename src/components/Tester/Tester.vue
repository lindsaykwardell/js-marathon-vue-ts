<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <div class="flex justify-between items-center p-4">
      <h1 class="text-2xl">Test Runner</h1>
      <router-link
        to="/admin"
        class="bg-gray-200 rounded hover:bg-gray-300 py-1 px-4"
        >Admin Panel</router-link
      >
    </div>
    <hr />
    <div class="flex flex-grow">
      <div class="w-3/5 p-4">
        <div>
          <h2 class="text-xl">Tests</h2>
          <ul>
            <li
              class="test flex items-center py-1"
              :class="testClass(test)"
              v-for="test in displayTests"
              :key="test.id"
            >
              <Spinner v-if="test.status === TestStatus.RUNNING" />
              {{ test.description }}
            </li>
          </ul>
        </div>
      </div>
      <div class="w-2/5 border-l p-4 flex flex-col items-center">
        <button
          class="start-test-button w-full transition duration-150 text-white py-2 text-xl font-bold shadow hover:shadow-lg flex justify-center items-center"
          :class="testButtonClass"
          :disabled="testRunnerStatus === TestRunnerStatus.RUNNING"
          @click="initTests"
        >
          <template v-if="testRunnerStatus !== TestRunnerStatus.RUNNING">
            Start Tests
          </template>
          <template v-else> <Spinner /> Performing Tests... </template>
        </button>
        <div v-if="getTests.length > 0" class="py-3 italic text-center">
          <div class="text-green-600 tests-passed">
            {{ totalPassedTests }}/{{ getTests.length }} tests passed
          </div>
          <div
            class="text-red-700 tests-failed"
            :class="{ 'font-bold': totalFailedTests > 0 }"
          >
            {{ totalFailedTests }}/{{ getTests.length }} tests failed
          </div>
          <div v-if="totalRunningTests" class="py-2 remaining-tests">
            Waiting on {{ totalRunningTests }} tests...
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="testRunnerStatus === TestRunnerStatus.FINISHED"
      class="bg-yellow-500 h-16 text-white flex justify-center items-center font-bold tests-complete"
    >
      <h2 class="text-2xl">All tests have completed!</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/Spinner";

export default {
  computed: {
    ...mapGetters(["getTests", "testRunnerStatus"]),
    TestStatus() {
      return {
        IDLE: "IDLE",
        RUNNING: "RUNNING",
        SUCCESS: "SUCCESS",
        FAILURE: "FAILURE",
      };
    },
    TestRunnerStatus() {
      return {
        IDLE: "IDLE",
        RUNNING: "RUNNING",
        FINISHED: "FINISHED",
      };
    },
    testButtonClass() {
      if (this.testRunnerStatus === this.TestRunnerStatus.RUNNING)
        return "bg-green-300 cursor-not-allowed";
      else return "bg-green-500 hover:bg-green-400";
    },
    displayTests() {
      return [...this.getTests].sort((a, b) => {
        if (a.status === b.status) return 0;

        if (a.status === this.TestStatus.RUNNING) return -1;
        if (b.status === this.TestStatus.RUNNING) return 1;

        if (a.status === this.TestStatus.SUCCESS) return -1;
        if (b.status === this.TestStatus.SUCCESS) return 1;

        if (a.status === this.TestStatus.FAILURE) return -1;
        if (b.status === this.TestStatus.FAILURE) return 1;

        return 0;
      });
    },
    totalRunningTests() {
      return this.getTests.filter(
        (test) => test.status === this.TestStatus.RUNNING
      ).length;
    },
    totalPassedTests() {
      return this.getTests.filter(
        (test) => test.status === this.TestStatus.SUCCESS
      ).length;
    },
    totalFailedTests() {
      return this.getTests.filter(
        (test) => test.status === this.TestStatus.FAILURE
      ).length;
    },
  },
  methods: {
    ...mapActions(["initializeTests", "runTests"]),
    testClass(test) {
      if (test.status === this.TestStatus.SUCCESS) {
        return "text-green-600 italic test-passed";
      } else if (test.status === this.TestStatus.FAILURE) {
        return "text-red-700 font-bold test-failed";
      } else if (test.status === this.TestStatus.IDLE) {
        return "test-idle";
      }
    },
    async initTests() {
      if (this.testRunnerStatus === this.TestRunnerStatus.RUNNING) return;

      this.runTests();
    },
  },
  mounted() {
    this.initializeTests();
  },
  components: {
    Spinner,
  },
};
</script>

<style lang="postcss" scoped>
.tester {
  width: 900px;
  min-height: 400px;
}

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
