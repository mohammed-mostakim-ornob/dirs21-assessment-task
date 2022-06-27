import * as types from './types';
import dishApi from '../../../apis/dishApi';

const state = {
    dishes: []
};

const getters = {
    [types.getters.allDishes](state) {
        return state.dishes;
    }
};

const actions = {
    async [types.actions.fetchAllDishes]({ commit }) {
        const result = await dishApi.fetchAllDishes();

        if (result.successful)
            commit(types.mutations.setDishes, result.data);

        return result.successful;
    },
    async [types.actions.fetchDishForEdit](_, id) {
        const result = await dishApi.fetchDish(id);

        return result;
    },
    async [types.actions.clearAllDishes]({ commit }) {
        const result = await dishApi.clearAllDishes();

        if (result.successful)
            commit(types.mutations.clearDishes);
    },
    async [types.actions.upsertDish]({ commit }, dish) {
        const result = await dishApi.upsertDish(dish);

        if (result.successful)
            commit(types.mutations.upsertDish, result.data);

        return result.successful;
    },
    async [types.actions.deleteDish]({ commit }, id) {
        const result = await dishApi.deleteDish(id);

        if (result.successful)
            commit(types.mutations.removeDish, id);

        return result.successful;
    }
};

const mutations = {
    [types.mutations.setDishes](state, dishes) {
        state.dishes = dishes;
    },
    [types.mutations.clearDishes](state) {
        state.dishes = []
    },
    [types.mutations.upsertDish](state, dish) {
        let existingDishIndex = state.dishes.findIndex(d => d._id === dish._id);

        if (existingDishIndex > -1)
            state.dishes[existingDishIndex] = dish;
        else
            state.dishes.push(dish);

        state.dishes = [...state.dishes];
    },
    [types.mutations.removeDish](state, id) {
        let dishIndex = state.dishes.findIndex(d => d._id === id);

        state.dishes.splice(dishIndex, 1);
    }
};

export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};