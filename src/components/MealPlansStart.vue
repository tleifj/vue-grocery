<template>
	<div >
		<div class="col-sm-12 header">
			<router-link tag="i" to="/meal-plans/new" class="material-icons add-link">add</router-link>
			<h1>Meals</h1>
		</div>
		
		<router-view></router-view>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/meal-plans/' + mealPlan['.key']" v-for="(mealPlan, index) in mealPlans">{{mealPlan.title}}</router-link>
		</ul>
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