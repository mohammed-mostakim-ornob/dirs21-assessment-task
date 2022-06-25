import dishApi from '../../apis/dishApi'

const state = {
    dishes: []
};

const getters = {
    allDishes: (state) => state.dishes
};

const actions = {
    async fetchAllDishes({ commit }) {
        const result = await dishApi.fetchAllDishes();

        if (result.successful)
            commit('setDishes', result.data);
    },
    async fetchDishForEdit(_, id) {
        const result = await dishApi.fetchDish(id);

        if (result.successful)
            return result.data;
    },
    async clearAllDishes({ commit }) {
        const result = await dishApi.clearAllDishes();

        if (result.successful)
            commit('clearDishes');
    },
    async upsertDish({ commit }, dish) {
        const result = await dishApi.upsertDish(dish);

        if (result.successful)
            commit('upsertDish', result.data);
    },
    async deleteDish({ commit }, id) {
        const result = await dishApi.deleteDish(id);

        if (result.successful)
            commit('removeDish', id);
    }
};

const mutations = {
    setDishes: (state, dishes) => (state.dishes = dishes),
    clearDishes: (state) => (state.dishes = []),
    upsertDish: (state, dish) => {
        let existingDishIndex = state.dishes.findIndex(d => d._id === dish._id);

        if (existingDishIndex > -1)
            state.dishes[existingDishIndex] = dish;
        else
            state.dishes.push(dish);
    },
    removeDish: (state, id) => {
        let dishIndex = state.dishes.findIndex(d => d._id === id);

        state.dishes.splice(dishIndex, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};