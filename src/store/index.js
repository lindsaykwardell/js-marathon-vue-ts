import { createStore } from "vuex";
import { getInitialTests } from "../assets/tests";

const state = {
  tests: [],
};

const getters = {
  getTests: (state) => {
    return [...state.tests].sort((a, b) => {
      if (a.status === b.status) return 0;

      if (a.status === "RUNNING") return -1;
      if (b.status === "RUNNING") return 1;

      if (a.status === "SUCCESS") return -1;
      if (b.status === "SUCCESS") return 1;

      if (a.status === "FAILURE") return -1;
      if (b.status === "FAILURE") return 1;

      return 0;
    });
  },
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
};

const mutations = {
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
};

const actions = {
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
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});

const waitfor = async (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
