<template>
	<div class="col-sm-12">
		<h1>Home</h1>
		<p>Plan Meal!</p>
		<button @click="saveData()" class="mdl-button mdl-button--raised">Save info</button>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		methods: {
			saveData() {
				const data = {
					lists: this.$store.state.lists,
					globalItems: this.$store.state.globalItems,
					globalCategories: this.$store.state.globalCategories,
					recipes: this.$store.state.recipes,
					mealPlans: this.$store.state.mealPlans
				};
				this.$http.put('data.json', data);
			},
			...mapActions([
				'loadData'
			])
		}
	}
</script>