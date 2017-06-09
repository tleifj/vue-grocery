<template>
	<div class="col-sm-12 list">
			<h1>{{$store.state.mealPlans[($route.params.id - 1)].title}}</h1> 
			<ul class="list">
				<li class="list-item" v-for="(meal, index) in meals"
				>
					{{meal.title}}
				</li>
			</ul>
			<router-link tag="button" :to="'/meal-plans/' + $route.params.id + '/edit'" class="mdl-button mdl-button--raised">Add meal</router-link>
	</div>
	
</template>

<script>


	export default {
		computed: {
			meals() {
				return this.$store.state.mealPlans[(this.$route.params.id - 1)].meals;
			}
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