<template>
	<div>
		<h1>Account</h1>
		<span @click="check()">check</span>
	</div>
</template>

<script>
	import {db} from '../firebase'
	export default {
		computed: {
			mostUsedMeals() {
				let mealsArray = [];
				for ( let i = 0; i < this.mealPlans.length; i++) {
					for (let property in this.mealPlans[i]) {
					    if (this.mealPlans[i].hasOwnProperty(property)) {
					        // do stuff
					        mealsArray.push(property);
					    }
					}
				}
				return mealsArray;
			}
		},
		methods: {
			check: function() {
				console.log(this.mostUsedMeals)
			}
		},
		firebase: {
			mealPlans: db.ref('data/mealPlans'),
			lists: db.ref('data/lists')
		}
	}
</script>

<style>
	
</style>