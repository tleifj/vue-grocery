<template>
	<div >
		<div class="col-sm-12 header">
			<i class="material-icons back-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
			<i class="material-icons back-link" v-if="editMode"  @click="changeEditMode()">done</i>
			<router-link tag="i" to="/meal-plans/new" class="material-icons add-link">add</router-link>
			<h1>Meal Plans</h1>
		</div>
		
		<router-view></router-view>
		<ul class="list">			
			<li class="list-item" v-for="(mealPlan, index) in sortedMealPlans">				
				<router-link  tag="span" :to="'/meal-plans/' + mealPlan['.key']">
				{{mealPlan.title}}
				</router-link>
				<i class="material-icons pull-right"  v-if="editMode" @click="deleteMealPlan(index)">close</i>
			</li>	
		</ul>
	</div>
</template>

<script>
	import NewMealPlan from './NewMealPlan.vue'
	import {db} from '../firebase';

	export default {
		data: function() {
			return {
				editMode: false
			}
		},
		computed: {
			sortedMealPlans() {
				return this.mealPlans.reverse();
			}
		},
		methods: {
			changeEditMode() {
				this.editMode = !this.editMode;
			},
			deleteMealPlan(index) {
				this.$http.delete('data/mealPlans/' + this.mealPlans[index]['.key'] + '.json')
			}
		},
		components: {
			appNewMealPlan: NewMealPlan
		},
		firebase: {
		    mealPlans: db.ref('data/mealPlans')
	    	
	  	}
	}
</script>

<style lang="scss">
	.meal-plans {
		.list {
			.list-item {
				span {
					display: inline-block;
					width: calc(100% - 30px);
				}
			}
		}
	}
</style>