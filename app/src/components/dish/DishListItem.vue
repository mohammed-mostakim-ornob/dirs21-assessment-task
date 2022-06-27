<template>
    <div class="dish-item">
        <div class="item-content" :class="dish.status === 'Active' ? 'active' : 'inactive'">
            <div>
                <span class="name">{{ dish.name }}</span>
                <button
                    class="action-button"
                    @click="onClickEdit(dish._id)">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button
                    class="action-button"
                    @click="onClickDelete(dish._id)"> 
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
            <p class="price">€{{ Number(dish.price).toLocaleString("de-DE", {minimumFractionDigits: 2}) }}</p>
            <p class="type">{{ dish.type }} / {{ dish.meal }}</p>
            <p class="type">{{ dish.availability }} / {{ dish.waitingTime }} Min.</p>
            <p class="description">{{ dish.description }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { eventHub } from '../../eventHub';
import storeNamespaces from '../../store/namespaces';
import * as dishStoreTypes from '../../store/modules/dish/types';

export default {
    name: 'DishListItem',
    props: {
        dish: Object
    },
    methods: {
        ...mapActions(storeNamespaces.dish, {
            deleteDish: dishStoreTypes.actions.deleteDish
        }),
        onClickEdit: function(id) {
            eventHub.$emit('edit-dish', id);
        },
        onClickDelete: async function(id) {
            const isSuccessful =  await this.deleteDish(id);

            if (isSuccessful) {
                eventHub.$emit('delete-dish', id);
                this.$alertify.success('Dish successfully deleted')
            } else
                this.$alertify.error('Dish could not be deleted')
        }
    }
}
</script>

<style scoped>
    p,
    .name {
        margin-bottom: 5px;
    }

    .dish-item {
        margin: 10px;
        border-radius: 5px;
        display: inline-block;
        border: 1px solid black;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .item-content {
        width: 260px;
        padding: 10px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .item-content.active {
        border-bottom: 5px solid green;
    }

    .item-content.inactive {
        border-bottom: 5px solid red;
    }

    .name {
        font-size: 20px;
    }

    .price {
        font-size: 15px;
    }

    .type,
    .description {
        font-size: 13px;        
    }

    .description {
        height: 40px ;
        overflow-y: auto;
    }

    .action-button {
        float: right;
        margin-left: 8px;
        border-radius: 7px;
    }
</style>