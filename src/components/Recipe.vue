<template>
	<div class="col-sm-12 list">
		<h1>{{$store.state.recipes[($route.params.id - 1)].title}}</h1> 
		<ul class="list">
			<li class="list-item" v-for="(ingredient, index) in recipe.ingredients"
			
			>
				{{ingredient.quantity}} {{ingredient.name}}
			</li>
		</ul>
		<!-- <router-link tag="button" :to="'/lists/' + $route.params.id + '/edit'">Add Items</router-link> -->
		<button @click="addMeal({recipe})" class="mdl-button mdl-button--raised">Add to Meal Plan</button>
		<router-link tag="a" :to="$route.params.id + '/edit'">
		Edit recipe</router-link>
	</div>
	
</template>

<script>
	import ListItem from "./ListItem.vue";
	import NewListItem from "./NewListItem.vue";
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'


	export default {
		computed: {
			recipe() {
				return this.$store.state.recipes[(this.$route.params.id - 1)];
			}
		},
		methods: mapActions([
			'addMeal'
			]),
		components: {
			appListItem: ListItem,
			appNewListItem: NewListItem
		},
		
	}
</script>

<style lang="scss">
	.list {
		.list-group-item {

			span {
				cursor: pointer;
				&.checked {
					text-decoration: line-through;
					font-style: italic;
					color: #d0d0d0;
				}
			}

			button {
				display: inline-block;
				width: initial;
				margin: 0;
			}
		}
	}
</style>