<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="back-link material-icons" to="/recipes">chevron_left</router-link>
			<h1>{{recipe.title}}</h1>
		</div>
		<input type="text" placeholder="Add Recipe" v-model="recipe.title">
		<button @click.prevent="saveRecipe()" class="mdl-button mdl-button--raised">Add Recipe</button>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		data: function() {
			return {
				recipe: {
					title: '',
					ingredients: []
				}
			}
		},
		methods: {
			...mapActions([
				'addRecipe'
			]),
			resetRecipe() {
				this.recipe = {}
			},
			saveRecipe: function() {
				console.log(this.recipe);
				this.$http.post('data/recipes.json', {title: this.recipe.title, ingredients: []})
				.then(function() {
					this.$router.push('/recipes');
				})
			}
		},
	}
</script>