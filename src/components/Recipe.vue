<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="back-link material-icons" to="/recipes">chevron_left</router-link>
			<i class="material-icons add-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
			<i class="material-icons add-link" v-if="editMode"  @click="changeEditMode()">done</i>
			<h1>{{recipe.title}}</h1> 
		</div>
		<div class="col-sm-12 list">
			
			<ul>
				<li class="list-item" v-for="(ingredient, index) in recipe.ingredients"
				
				>{{ingredient.quantity}} {{ingredient.name}}
				<i class="material-icons pull-right" v-if="editMode" @click="deleteIngredient(index)">close</i>
				<i class="material-icons pull-right item-increase"
					@click="increaseIngredient(index)"
					 v-if="editMode" >add</i>
				<i class="material-icons pull-right item-decrease"
					@click="decreaseIngredient(index)"
					 v-if="editMode" >remove</i>
				</li>
			</ul>
			<!-- <router-link tag="button" :to="'/lists/' + $route.params.id + '/edit'">Add Items</router-link> -->
			<button @click="addMeal(recipe)" v-if="!editMode" class="mdl-button mdl-button--raised">Add to Meal Plan</button>
			<router-link tag="button" :to="$route.params.id + '/edit'" v-if="editMode" class="mdl-button mdl-button--raised">
			Add Ingredients</router-link>
		</div>
	</div>
</template>

<script>
	import ListItem from "./ListItem.vue";
	import NewListItem from "./NewListItem.vue";
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import {db} from '../firebase'

	export default {
		data: function() {
			return {
				editMode: false
			}	
		},
		computed: {
			recipe() {
				return this.recipes.find(element => element['.key'] === this.$route.params.id);
			}
		},
		methods: {
			changeEditMode: function() {
				this.editMode = !this.editMode
			},
			increaseIngredient: function(index) {
				this.$http.put('data/recipes/' + this.$route.params.id + '/ingredients/' + index + '/quantity.json', this.recipe.ingredients[index].quantity + 1)
				console.log(this.recipe.ingredients[index].quantity)
			},
			decreaseIngredient: function(index) {
				let currentIngredient = this.recipe.ingredients[index];
				if (currentIngredient.quantity > 1 ) {
					this.$http.put('data/recipes/' + this.$route.params.id + '/ingredients/' + index + '/quantity.json', currentIngredient.quantity - 1)
				}	
			},
			deleteIngredient: function(index) {
				this.$http.delete('data/recipes/' + this.$route.params.id + '/ingredients/' + index + '.json')
			},
			addMeal: function(recipe) {
				// Get current meal plan
				let currentMealPlan = this.mealPlans[Object.keys(this.mealPlans)[Object.keys(this.mealPlans).length - 1]];
				console.log(currentMealPlan);
				// If there is a meal plan to check
				if ( currentMealPlan ) {
					console.log(currentMealPlan);
					if ( currentMealPlan.meals ) {
						// Go through each meal in meal plan
						for (var prop in currentMealPlan.meals) {
							// If it has any meals
							if (currentMealPlan.meals.hasOwnProperty(prop)) {
								console.log(prop);
								let val = currentMealPlan.meals[prop];
								console.log(val);
								// If the current recipe matches currently checked meal
								if ( val.title === this.recipe.title ) {
									console.log('in meal plan already');
									alert('Recipe is already in current meal plan.');
									break;
								// If not in meal plan, add it 
								} else {
									console.log('not in meal plan already');
									console.log(this.recipe);
									console.log(recipe);
									recipe.recipeReference = recipe['.key'];
									delete recipe['.key'];

									this.$http.post('data/mealPlans/' + currentMealPlan['.key'] + '/meals/.json', recipe);
									break;
								}
							}
						}
					}	
				}


				// Get current list
				let currentList = this.lists[Object.keys(this.lists)[Object.keys(this.lists).length - 1]];
				console.log(currentList.listItems);
				console.log(recipe.ingredients);
				let ingredients = recipe.ingredients;
				// Go through each ingredient in recipe to see if it exists on current list
				Object.keys(ingredients).forEach(ingredient => {
					let item = ingredients[ingredient];
					// Check if list exists
					if ( currentList.listItems ) {
						console.log('has list');
						// Go through each list item
						for (var prop in currentList.listItems) {
							console.log('gettinglist item...');
							// If it's a unique property
						    if (currentList.listItems.hasOwnProperty(prop)) {
						    	console.log('has on props');
						    	console.log(prop);
						        // Get value of property (list prop)
						        var val = currentList.listItems[prop];
						        console.log(val);
						        console.log(item);
						        // If an item has the same name as the currently checked ingredient
						        if (val.name == item.name) {
						        	console.log('in list already');
						        	// Update the quantity 
						        	this.$http.put('data/lists/' + currentList['.key'] + '/listItems/' + prop + '/quantity.json', item.quantity + item.quantity);
						        	break;
						        } else {
						        	// Add the new item to the list
						        	console.log('not in list');
						        	this.$http.post('data/lists/' + currentList['.key'] + '/listItems/.json', item)
						        	break;

						        }
						    } 
						} 
					} else {
						// Set checked status to false
						console.log('no list, created item');
						// ingredient.checked = false;
						this.$http.post('data/lists/' + currentList['.key'] + '/listItems.json', item)
					}	
					
				})
			}	
		},
		components: {
			appListItem: ListItem,
			appNewListItem: NewListItem
		},
		firebase: {
			recipes: db.ref('data/recipes'),
			mealPlans: db.ref('data/mealPlans'),
			lists: db.ref('data/lists')
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

	.add-link {
		width: 24px;
	}
</style>