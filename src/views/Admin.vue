<template>
  <div class="tester bg-white shadow-lg flex flex-col">
    <div class="flex justify-between items-center p-4">
      <h1 class="text-2xl">Test Runner - Admin</h1>
      <router-link
        to="/"
        class="bg-green-300 rounded hover:bg-green-400 py-1 px-4"
        >Tester</router-link
      >
    </div>
    <hr />
    <div class="">
      <div class="p-4">
        <h2 class="text-xl">Tests</h2>
        <ul>
          <li
            v-for="test in getTests"
            :key="test.id"
            class="flex items-center py-1"
          >
            {{ test.description }}
          </li>
        </ul>
        <hr />
        <label>
          <h2 class="py-2 text-xl">Add Test:</h2>
          <div class="flex items-center">
            <input
              v-model="description"
              class="shadow-md p-2 flex-grow mr-4"
              placeholder="Test description"
            />
            <button
              @click="addTestHandler"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
};
</script>

<style lang="postcss" scoped>
.tester {
  width: 900px;
  min-height: 800px;
}
</style>
