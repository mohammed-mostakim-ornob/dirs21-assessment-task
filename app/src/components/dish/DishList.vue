<template>
    <div>
        <h1 class="text-center">Dish Console</h1>
        <dish-list-item v-for="dish in allDishes" :key="dish._id" :dish="dish"></dish-list-item>
    </div>
</template>

<script>
import DishListItem from './DishListItem.vue';
import { mapGetters, mapActions } from 'vuex';
import storeNamespaces from '../../store/namespaces';
import * as dishStoreTypes from '../../store/modules/dish/types';

export default {
	name: 'DishList',
	components: {
		DishListItem
	},
    async created() {
        const isSuccessful = await this.fetchAllDishes();

        if (!isSuccessful)
            this.$alertify.error('Dishes could not be loaded');
    },
    methods: {
        ...mapActions(storeNamespaces.dish, {
            fetchAllDishes: dishStoreTypes.actions.fetchAllDishes,
            clearAllDishes: dishStoreTypes.actions.clearAllDishes
        })
    },
    computed: {
        ...mapGetters(storeNamespaces.dish, {
            allDishes: dishStoreTypes.getters.allDishes
        })
    }
}
</script>