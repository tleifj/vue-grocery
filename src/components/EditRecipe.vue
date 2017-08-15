<template>
	<div class="col-sm-12 list">
		<router-link tag="i" class="back-link material-icons" :to="'/recipes/' + $route.params.id">chevron_left</router-link>
		<h1>Add ingredients</h1>
		<ul class="list-group">
			<li 
			class="list-item" 
			v-for="globalItem in sortedItems" 
			@click="addIngredient(globalItem)"
			>{{globalItem.name}}</li>
		</ul>
		
		<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	import {db} from '../firebase'
	export default {
		// props: ['globalCategories', 'globalItems'],
		computed: {
			sortedItems() {
				var sortedGlobalItems = this.globalItems.slice(0);
				sortedGlobalItems.sort(function(a,b) {
				    var x = a.name.toLowerCase();
				    var y = b.name.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
				})
				return sortedGlobalItems;
			}
		},
		methods: {
			...mapActions([
				'addIngredient'
			]),
			addIngredient: function(globalItem) {
				delete globalItem['.key'];
				globalItem.quantity = 1;
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