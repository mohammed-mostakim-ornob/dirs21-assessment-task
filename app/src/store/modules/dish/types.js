import storeNamespaces from '../../../store/namespaces';

export const getters = {
    allDishes: `${storeNamespaces.dish}/allDishes`
};

export const actions = {
    fetchAllDishes: `${storeNamespaces.dish}/fetchAllDishes`,
    fetchDishForEdit: `${storeNamespaces.dish}/fetchDishForEdit`,
    clearAllDishes: `${storeNamespaces.dish}/clearAllDishes`,
    upsertDish: `${storeNamespaces.dish}/upsertDish`,
    deleteDish: `${storeNamespaces.dish}/deleteDish`
};

export const mutations = {
    setDishes: `${storeNamespaces.dish}/setDishes`,
    clearDishes: `${storeNamespaces.dish}/clearDishes`,
    upsertDish: `${storeNamespaces.dish}/upsertDish`,
    removeDish: `${storeNamespaces.dish}/removeDish`
};