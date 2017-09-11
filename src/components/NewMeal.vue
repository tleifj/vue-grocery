<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="material-icons back-link" :to="'/meal-plans/' + $route.params.id">chevron_left</router-link>			
			<h1>Add Meals</h1>
		</div>
		<ul class="list">
			<li 
			class="list-item" 
			v-for="recipe in recipes"
			@click="addMeal(recipe)"
			>{{recipe.title}}</li>
		</ul>
		<router-link tag="button" class="mdl-button mdl-button--raised" :to="'/meal-plans/' + $route.params.id">Done</router-link>
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