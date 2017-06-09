<template>
	<form>
		<input type="text" placeholder="Add Meal Plan" v-model="mealPlan.title">
		<button @click.prevent="addMealPlan(mealPlan, resetList())" class="mdl-button mdl-button--raised">Add Meal Plan</button>
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
			resetList() {
				this.mealPlan = {}
			}
		},
	}
</script>