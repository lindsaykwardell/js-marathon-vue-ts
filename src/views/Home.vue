<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <Header>Test Runner</Header>
    <div class="flex flex-grow">
      <div class="w-3/5 p-4 overflow-y-scroll">
        <div>
          <h2 class="text-xl">Tests</h2>
          <TestList :tests="getTests" />
        </div>
      </div>
      <div class="w-2/5 border-l p-4 flex flex-col items-center">
        <TestRunner
          :testRunnerStatus="testRunnerStatus"
          :tests="getTests"
          @initTests="initTests"
        />
      </div>
    </div>
    <div
      v-if="testRunnerStatus === 'FINISHED'"
      class="bg-yellow-500 h-16 text-white flex justify-center items-center font-bold tests-complete"
    >
      <h2 class="text-2xl">All tests have completed!</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header";
import TestList from "@/components/TestList";
import TestRunner from "@/components/TestRunner";

export default {
  computed: {
    ...mapGetters(["getTests", "testRunnerStatus"]),
  },
  methods: {
    ...mapActions(["runTests"]),
    async initTests() {
      if (this.testRunnerStatus === "RUNNING") return;

      this.runTests();
    },
  },
  components: {
    TestList,
    Header,
    TestRunner,
  },
};
</script>

<style lang="postcss" scoped>
.tester {
  width: 900px;
  min-height: 600px;
}
</style>
