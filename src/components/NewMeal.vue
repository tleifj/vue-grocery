<template>
	<div>
		<p>Add items</p>
		<ul class="list-group">
			<li 
			class="list-group-item" 
			v-for="recipe in recipes"
			@click="addMeal(recipe)"
			>{{recipe.title}}</li>
		</ul>
		<router-link tag="button" :to="'/meal-plans/' + $route.params.id">Done</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	import {db} from '../firebase';
	export default {
		methods: {
			addMeal(recipe) {
				delete recipe['.key'];
				this.$http.post('data/mealPlans/' + this.$route.params.id + '/meals.json', recipe)

			},
			resetListItem() {
				this.listItem = {};
			}
		},
		firebase: {
		    recipes: db.ref('data/recipes')
	  	}
	}
</script>