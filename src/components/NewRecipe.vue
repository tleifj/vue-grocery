<template>
	<form>
		<input type="text" placeholder="Add Recipe" v-model="recipe.title">
		<button @click.prevent="addRecipe(recipe, resetRecipe())" class="mdl-button mdl-button--raised">Add Recipe</button>
	</form>
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
			}
		},
	}
</script>