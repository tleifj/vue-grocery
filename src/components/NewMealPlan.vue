<template>
	<form>
		<input type="text" placeholder="Add Meal Plan" v-model="mealPlan.title">
		<button @click.prevent="addMealPlan(mealPlan, resetMealPlan())" class="mdl-button mdl-button--raised">Add Meal Plan</button>
	</form>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		data: function() {
			return {
				mealPlan: {
					title: '',
					meals: []
				}
			}
		},
		methods: {
			...mapActions([
				'addMealPlan'
			]),
			resetMealPlan() {
				this.mealPlan = {}
			},
			addMealPlan: function(mealPlan) {
				this.$http.post('data/mealPlans.json', mealPlan)
				.then(function() {
					this.$router.push('/meal-plans');
				})
			}
		},
	}
</script>