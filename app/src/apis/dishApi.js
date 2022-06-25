import axios from 'axios';

const apiBaseAddress = 'http://localhost:9000';

async function fetchAllDishes() {
    try {
        const response = await axios.get(`${apiBaseAddress}/dishes`);

        return {
            successful: true,
            data: response.data
        };
    } catch (error) {
        return {
            successful: false,
            data: []
        };
    }
}

async function fetchDish(id) {
    try {
        const response = await axios.get(`${apiBaseAddress}/dishes/${id}`);

        return {
            successful: true,
            data: response.data
        };
    } catch (error) {
        return {
            successful: false,
            data: null
        };
    }
}

async function upsertDish(dish) {
    try {
        await axios.put(`${apiBaseAddress}/dishes`, dish);

        return {
            successful: true,
            message: 'Dish successfully added/updated.'
        };
    } catch (error) {
        return {
            successful: false,
            message: error.response.data
        }
    }
}

async function deleteDish(id) {
    try {
        await axios.delete(`${apiBaseAddress}/dishes/${id}`);

        return {
            successful: true,
            message: 'Dish successfully deleted.'
        };
    } catch (error) {
        return {
            successful: false,
            message: error.response.data
        }
    }
}

async function clearAllDishes() {
    try {
        await axios.get(`${apiBaseAddress}/dishes/clear`);

        return {
            successful: true,
            data: 'All dishes cleared successfully'
        };
    } catch (error) {
        return {
            successful: false,
            data: error.response.data
        };
    }
}

export default {
    fetchAllDishes,
    fetchDish,
    upsertDish,
    deleteDish,
    clearAllDishes
};