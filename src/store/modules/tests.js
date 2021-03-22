const getInitialTests = async () => [
  {
    id: 1,
    description: "Vue views are viewable",
    status: "IDLE",
    results: [],
  },
  {
    id: 2,
    description: "Reactive components react properly",
    status: "IDLE",
    results: [],
  },
  {
    id: 3,
    description: "Angular brackets are not round",
    status: "IDLE",
    results: [],
  },
  {
    id: 4,
    description: "Svelte file extensions are looking stylish",
    status: "IDLE",
    results: [],
  },
  {
    id: 5,
    description: "Web component elements are sufficiently lit",
    status: "IDLE",
    results: [],
  },
  {
    id: 6,
    description: "Elm trees function as expected",
    status: "IDLE",
    results: [],
  },
];

export default {
  state: {
    tests: [],
  },
  getters: {
    getTests: (state) => state.tests,
    nextTestId: (state) => state.tests.length + 1,
    testRunnerStatus: (state) => {
      if (!state.tests.find((test) => test.status !== "IDLE")) {
        return "IDLE";
      } else if (state.tests.find((test) => test.status === "RUNNING")) {
        return "RUNNING";
      } else {
        return "FINISHED";
      }
    },
  },
  mutations: {
    SET_TESTS(state, tests) {
      if (!state.tests.length) {
        state.tests = [...tests];
      }
    },
    ADD_TEST(state, test) {
      state.tests = [...state.tests, test];
    },
    UPDATE_TEST(state, updatedTest) {
      state.tests = state.tests.map((test) =>
        test.id === updatedTest.id ? updatedTest : test
      );
    },
    REMOVE_TEST(state, testId) {
      state.tests = state.tests.filter((test) => test.id !== testId);
    },
    STORE_RESULT(state, { testId, result }) {
      state.tests = state.tests.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: result ? "SUCCESS" : "FAILURE",
              results: [...test.results, result],
            }
          : test
      );
    },
  },
  actions: {
    async initializeTests({ commit }) {
      commit("SET_TESTS", await getInitialTests());
    },
    addTest({ commit, getters }, payload) {
      commit("ADD_TEST", { ...payload, id: getters.nextTestId });
    },
    runTests({ commit, getters }) {
      getters.getTests.forEach(async (test) => {
        commit("UPDATE_TEST", {
          ...test,
          status: "RUNNING",
        });

        const delay = 2000 + Math.random() * 2000;
        const testPassed = Math.random() > 0.5;

        await waitfor(delay);

        commit("STORE_RESULT", { testId: test.id, result: testPassed });
      });
    },
  },
};

const waitfor = async (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
