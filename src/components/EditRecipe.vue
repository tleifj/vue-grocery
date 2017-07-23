<template>
	<div class="col-sm-12">
		<h1>Add ingredients</h1>
		<ul class="list-group">
			<li 
			class="list-group-item" 
			v-for="globalItem in globalItems" 
			@click="addIngredient(globalItem)"
			>{{globalItem.name}} - {{globalItem['.key']}}</li>
		</ul>
		<router-link tag="button" :to="'/recipes/' + $route.params.id">Done</router-link>
		<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	import {db} from '../firebase'
	export default {
		// props: ['globalCategories', 'globalItems'],
		methods: {
			...mapActions([
				'addIngredient'
			]),
			addIngredient: function(globalItem) {
				delete globalItem['.key'];
				this.$http.post('data/recipes/' + this.$route.params.id + '/ingredients.json', globalItem)
				// console.log(globalItem)
				// .then(function() {
				// 	this.$router.push('/lists');
				// })
			},
			saveIngredient: function() {
				this.$http.post('data/recipes.json', {name: this.globalItem.name, category: this.globalItem.category})

			}
		},
		firebase: {
			recipes: db.ref('data/recipes'),
			globalItems: db.ref('data/globalItems')
		}
	}
</script>