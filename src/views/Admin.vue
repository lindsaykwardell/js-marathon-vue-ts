<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <Header>Admin</Header>
    <div class="flex-grow overflow-y-scroll">
      <div class="p-4">
        <h2 class="text-xl">Tests</h2>
        <TestList :tests="getTests" />
      </div>
    </div>
    <hr />
    <div class="p-4">
      <form @submit.prevent="addTestHandler">
        <label>
          <h2 class="py-2 text-xl">Add Test:</h2>
          <div class="flex items-center">
            <input
              v-model="description"
              class="shadow-md p-2 flex-grow mr-4"
              placeholder="Test description"
            />
            <button
              class="py-1 px-4 rounded"
              :class="{
                'text-green-700 bg-green-200': !description.length,
                'bg-green-300 hover:bg-green-400': description.length,
              }"
              :disabled="!description.length"
            >
              Add Test
            </button>
          </div>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header";
import TestList from "@/components/TestList";

export default {
  data() {
    return {
      description: "",
    };
  },
  computed: {
    ...mapGetters(["getTests"]),
  },
  methods: {
    ...mapActions(["addTest"]),
    addTestHandler() {
      this.addTest({
        description: this.description,
        results: [],
        status: "IDLE",
      });

      this.description = "";
    },
  },
  components: {
    Header,
    TestList,
  },
};
</script>

<style lang="postcss" scoped>
.tester {
  width: 900px;
  min-height: 600px;
}
</style>
