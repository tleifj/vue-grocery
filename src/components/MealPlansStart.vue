<template>
	<div class="col-sm-12">
		<h1>Meals</h1>
		<router-view></router-view>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/meal-plans/' + mealPlan['.key']" v-for="(mealPlan, index) in mealPlans">{{mealPlan.title}}</router-link>
		</ul>
		<app-new-meal-plan></app-new-meal-plan>
	</div>
</template>

<script>
	import NewMealPlan from './NewMealPlan.vue'
	import {db} from '../firebase';

	export default {
		computed: {
			
		},
		components: {
			appNewMealPlan: NewMealPlan
		},
		firebase: {
		    mealPlans: db.ref('data/mealPlans')
	    	
	  	}
	}
</script>