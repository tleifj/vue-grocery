<template>
	<div>
		<div class="col-sm-12 header">
			<router-link tag="i" to="/recipes/new" class="material-icons add-link">add</router-link>
			<h1>Recipes</h1> 
		</div>
		<div class="recipes">
			
			<router-view></router-view>
			<div class="list">			
				<router-link class="recipe" tag="div" :to="'/recipes/' + recipe['.key']" v-for="(recipe, index) in recipes"><div class="list-item"><h3>{{recipe.title}}</h3></div></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import NewRecipe from './NewRecipe.vue'
	import {db} from '../firebase';
	export default {

		components: {
			appNewRecipe: NewRecipe
		},
		firebase: {
		    recipes: db.ref('data/recipes')
	  	}
	}
</script>

<style lang="scss">
	.recipes .list > div {
		& > .list-item {
			min-height: 80px;
		}
	}

	.recipe {
		.list-item {
			padding: 30px 0;
			height: 25vh;
			display: flex;
			align-items: flex-end;

			h3 {
				margin: 0;
			}
		}
	}
</style>