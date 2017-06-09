<template>
	<div class="col-sm-12">
		<h1>Recipes</h1>
		<router-view></router-view>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/recipes/' + (index + 1)" v-for="(recipe, index) in $store.state.recipes">{{recipe.title}}</router-link>
		</ul>
		<app-new-recipe></app-new-recipe>
	</div>
</template>

<script>
	import NewRecipe from './NewRecipe.vue'
	export default {

		components: {
			appNewRecipe: NewRecipe
		}
	}
</script>