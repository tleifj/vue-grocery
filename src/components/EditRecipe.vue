<template>
	<div class="col-sm-12">
		<h1>Add ingredients</h1>
		<ul class="list-group">
			<li 
			class="list-group-item" 
			v-for="globalItem in $store.state.globalItems" 
			@click="addIngredient({id: $route.params.id, item: globalItem})"
			v-if="$store.state.recipes[($route.params.id - 1)].ingredients.indexOf(globalItem) == -1"
			>{{globalItem.name}}</li>
		</ul>
		<router-link tag="button" :to="'/recipes/' + $route.params.id">Done</router-link>
		<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		props: ['globalCategories', 'globalItems'],
		methods: {
			...mapActions([
				'addIngredient'
			]),
		}
	}
</script>