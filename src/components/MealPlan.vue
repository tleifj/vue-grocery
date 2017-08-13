<template>
	<div class="col-sm-12 list">
			<h1>{{mealPlan.title}}</h1> 
			<ul class="list">
				<li class="list-item" 
				>
				</li>
				<router-link class="list-item" tag="li" :to="'/recipes/' + meal.recipeReference" v-for="(meal, index) in mealPlan.meals">
					{{meal.title}}
					<span class="pull-right" @click="deleteMeal(index)">Delete</span>
				</router-link>
			</ul>
			<router-link tag="button" :to="'/meal-plans/' + $route.params.id + '/edit'" class="mdl-button mdl-button--raised">Add meal</router-link>
	</div>
	
</template>

<script>

	import {db} from '../firebase'
	export default {
		computed: {
			mealPlan() {
				return this.mealPlans.find(element => element['.key'] === this.$route.params.id);
			}
		},
		methods: {
			deleteMeal: function(index) {
				this.$http.delete('data/mealPlans/' + this.$route.params.id + '/meals/' + index + '.json')
			}
		},
		firebase: {
		    mealPlans: db.ref('data/mealPlans')
	    	
	  	}
		
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