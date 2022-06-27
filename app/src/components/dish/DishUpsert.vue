<template>
    <div>
        <h1>Add / Update Dish</h1>

        <form @submit="onSubmitAddEditForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name"
                    v-model.trim="dish.name"
                    :class="$v.dish.name.$error === true ? 'is-invalid' : '' ">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control" rows="5"
                    v-model.trim="dish.description"
                    :class="$v.dish.description.$error === true ? 'is-invalid' : '' "></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price (€)</label>
                <input type="number" class="form-control" id="price" step="0.01"
                    v-model="dish.price"
                    :class="$v.dish.price.$error === true ? 'is-invalid' : '' "
                    @keydown="checkDecimalFieldInput" />
            </div>
            <div class="form-group">
                <label for="waiting-time">Waiting Time (Min.)</label>
                <input type="number" class="form-control" id="waiting-time" pattern="[0-9]+"
                    v-model="dish.waitingTime"
                    :class="$v.dish.waitingTime.$error === true ? 'is-invalid' : '' "
                    @keydown="checkIntegerFieldInput" />
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <select class="form-control" id="type"
                    v-model="dish.type"
                    :class="$v.dish.type.$error === true ? 'is-invalid' : '' ">
                    <option v-for="item in dishTypes" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="meal">Meal</label>
                <select class="form-control" id="meal"
                    v-model="dish.meal"
                    :class="$v.dish.meal.$error === true ? 'is-invalid' : '' ">
                    <option v-for="item in dishMeals" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="availability">Availability</label>
                <select class="form-control" id="availability"
                    v-model="dish.availability"
                    :class="$v.dish.availability.$error === true ? 'is-invalid' : '' ">
                    <option v-for="item in dishAvailabilities" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status"
                    v-model="dish.status"
                    :class="$v.dish.status.$error === true ? 'is-invalid' : '' ">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button type="button" class="btn btn-primary w-50 form-button" @click="clearFormFields">Clear</button>
            <button type="submit" class="btn btn-primary w-50 form-button">Submit</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { eventHub } from '../../eventHub';
import { required } from 'vuelidate/lib/validators';
import storeNamespaces from '../../store/namespaces';
import numberHelper from '../../helpers/numberHelper';
import * as dishStoreTypes from '../../store/modules/dish/types';

export default {
    name: 'DishUpsert',
    data() {
        return {
            dishTypes: ['Starter', 'Main Course', 'Dessert', 'Beverage'],
            dishMeals: ['Breakfast', 'Lunch', 'Dinner', 'All Day'],
            dishAvailabilities: ['Weekdays', 'Weekends', 'Every Day'],
            isOnEdit: false,
            onEditDishId: null,
            dish: getEmptyDish(),
        };
    },
    created() {
        eventHub.$on('edit-dish', this.loadDishOnEndit);
        eventHub.$on('delete-dish', this.clearFormFieldIfDishDeleted);
    },
    methods: {
        ...mapActions(storeNamespaces.dish, {
            upsertDish: dishStoreTypes.actions.upsertDish,
            fetchDishForEdit: dishStoreTypes.actions.fetchDishForEdit
        }),
        loadDishOnEndit: async function(id) {
            this.isOnEdit = true;
            this.onEditDishId = id;

            const result = await this.fetchDishForEdit(id);
            
            if (result.successful)
                this.dish = {
                    _id: result.data._id,
                    name: result.data.name,
                    description: result.data.description,
                    price: result.data.price,
                    waitingTime: result.data.waitingTime,
                    type: result.data.type,
                    meal: result.data.meal,
                    availability: result.data.availability,
                    status: result.data.status
                };
            else
                this.$alertify.error('Dish could not be retrieved');
        },
        clearFormFieldIfDishDeleted: function(id) {
            if (id === this.onEditDishId)
                this.clearFormFields();
        },
        onSubmitAddEditForm: async function(event) {
            event.preventDefault();

            this.$v.$touch();

            if (this.$v.$invalid)
                return;

            const isSuccessful =  await this.upsertDish({
                _id: this.isOnEdit ? this.onEditDishId : undefined,
                name: this.dish.name,
                description: this.dish.description,
                price: this.dish.price,
                waitingTime: this.dish.waitingTime,
                type: this.dish.type,
                meal: this.dish.meal,
                availability: this.dish.availability,
                status: this.dish.status
            });

            if (isSuccessful) {
                this.clearFormFields();
                this.$alertify.success('Dish successfully updated');
            } else
                this.$alertify.error('Dish could not be updated');
        },
        clearFormFields: function() {
            this.isOnEdit = false;
            this.onEditDishId = null;

            this.$v.$reset();
            this.dish = getEmptyDish();
        },
        checkDecimalFieldInput: function(event) {
            if (!numberHelper.isValidDecimalChar(event.keyCode))
                event.preventDefault();
        },
        checkIntegerFieldInput: function(event) {
            if (!numberHelper.isValidIntegerChar(event.keyCode))
                event.preventDefault();
        }
    },
    validations () {
        return {
            dish: {
                name: { required },
                description: { required },
                price: { required },
                waitingTime: { required },
                type: { required },
                meal: { required },
                availability: { required },
                status: { required }
            }
        }
    }
}

function getEmptyDish() {
    return {
        _id: null,
        name: '',
        description: '',
        price: '',
        waitingTime: '',
        type: '',
        meal: '',
        availability: '',
        status: ''
    };
}
</script>

<style scoped>
    form {
        margin-top: 17px;
        padding: 20px;
        border-radius: 5px;
        border: 1px solid black;
    }

    .form-group {
        margin-bottom: 10px;
    }

    .form-button {
        margin-top: 10px;
        width: 48% !important;
    }

    .form-button:first-child {
        float: left;;
    }

    .form-button:last-child {
        float: right;
    }
</style>