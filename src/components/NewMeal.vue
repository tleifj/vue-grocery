<template>
	<div>
		<p>Add items</p>
		<ul class="list-group">
			<li 
			class="list-group-item" 
			v-for="recipe in recipes"
			@click="addMeal({recipe})"
			v-if="$store.state.mealPlans[($route.params.id - 1)].meals.indexOf(recipe) == -1" 
			>{{recipe.title}}</li>
		</ul>
		<router-link tag="button" :to="'/meal-plans/' + $route.params.id">Done</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
	
		computed: {
			recipes() {
				return this.$store.state.recipes;
			}
		},
		methods: {
			...mapActions([
				'addMeal'
			]),
			resetListItem() {
				this.listItem = {};
			}
		}
	}
</script>