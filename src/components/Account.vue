<template>
	<div>
		

		<div class="col-sm-12">
			<h2>Account</h2>
			<h4>Most Used Ingredients</h4>	
			<ul class="list">
				<li class="list-item" v-for="(item, index) in ingredientsUsed">			
					{{item.total}} {{item.name}}
				</li>	
			</ul>	
		</div>
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
					        if ( property === 'meals' ) {
					        	
					        }
					    }
					}
				}
				return mealsArray;
			},
			ingredientsUsed() {
				let ingredientsArray = [];
				let ingredientsTally = [];
				for ( let i = 0; i < this.lists.length; i++) {
					for (let property in this.lists[i]) {
						if (property === 'listItems') {
							let listItems = this.lists[i]['listItems'];
							for (let item in listItems) {
								// console.log(listItems[item].name);
								ingredientsArray.push(listItems[item].name);
							}
							
						}
					}
				}
				for (let i = 0; i < ingredientsArray.length; i++) {
					
					if (ingredientsTally.filter(e => e.name === ingredientsArray[i]).length > 0) {
						ingredientsTally.find(e => e.name == ingredientsArray[i]).total += 1;
					} else {
						ingredientsTally.push({name: ingredientsArray[i], total: 1 });
					}
				}
				ingredientsTally.sort(function(a, b) {
					return b.total - a.total;
				});
				return ingredientsTally;
			}
		},
		methods: {
			check: function() {
				this.ingredientsUsed.forEach(element => {
					console.log(element);
				});
				console.log(this.ingredientsUsed)
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