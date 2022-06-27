<template>
	<div id="app" class="container">
		<div class="row">
			<div class="col-md-8">
				<dish-list></dish-list>
			</div>
			<div class="col-md-4">
				<dish-upsert></dish-upsert>
			</div>
		</div>
	</div>
</template>

<script>
import DishList from './components/dish/DishList.vue';
import DishUpsert from './components/dish/DishUpsert.vue';

export default {
	name: 'App',
	components: {
		DishList,
		DishUpsert
	}
}
</script>

<style scoped>
	.container {
		margin-top: 50px;
	}
</style>