<template>
	<div class="col-sm-12 list">
		<router-link class="back-link material-icons" to="/recipes">chevron_left</router-link>
		<i class="material-icons add-link" v-if="!edit_mode" @click="changeEditMode()">edit_mode</i>
		<i class="material-icons add-link" v-if="edit_mode"  @click="changeEditMode()">done</i>
		<h1>{{recipe.title}}</h1> 
		<ul>
			<li class="list-item" v-for="(ingredient, index) in recipe.ingredients"
			
			>{{ingredient.quantity}} {{ingredient.name}}
			<i class="material-icons pull-right" v-if="edit_mode" @click="deleteIngredient(index)">close</i>
			</li>
		</ul>
		<!-- <router-link tag="button" :to="'/lists/' + $route.params.id + '/edit'">Add Items</router-link> -->
		<button @click="addMeal(recipe)" v-if="!edit_mode" class="mdl-button mdl-button--raised">Add to Meal Plan</button>
		<router-link tag="button" :to="$route.params.id + '/edit'" v-if="edit_mode" class="mdl-button mdl-button--raised">
		Add Ingredients</router-link>
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
				edit_mode: false
			}	
		},
		computed: {
			recipe() {
				return this.recipes.find(element => element['.key'] === this.$route.params.id);
			}
		},
		methods: {
			changeEditMode: function() {
				this.edit_mode = !this.edit_mode
			},
			deleteIngredient: function(index) {
				this.$http.delete('data/recipes/' + this.$route.params.id + '/ingredients/' + index + '.json')
			},
			addMeal: function(recipe) {
				// Get current meal plan
				let currentMealPlan = this.mealPlans[Object.keys(this.mealPlans)[Object.keys(this.mealPlans).length - 1]];
				console.log(currentMealPlan);
				// Get current list
				let currentList = this.lists[Object.keys(this.lists)[Object.keys(this.lists).length - 1]];
				console.log(currentList.listItems);
				console.log(recipe.ingredients);
				let ingredients = recipe.ingredients;
				Object.keys(ingredients).forEach(ingredient => {
					let item = ingredients[ingredient];
					// Check if list exists
					if ( currentList.listItems ) {
						console.log('has list');
						// Get list items as an array
						// var listValues = Object.values(currentList.listItems)
						// var propIndex;
						// function checkObjProp(obj, element) {
						// 	for (var prop in obj) {
						// 		// If it's a unique property
						// 	    if (obj.hasOwnProperty(prop)) {
						// 	        // Get value of property (list prop)
						// 	        var val = obj[prop];
						// 	        if (val.name === element.name) {
						// 	        	propIndex = prop;
						// 	        	return true;
						// 	        }
						// 	    } 
						// 	}
						// }


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
							        if (val.name == item.name) {
							        	console.log('in list already');
							        	this.$http.put('data/lists/' + currentList['.key'] + '/listItems/' + prop + '/quantity.json', item.quantity + item.quantity);
							        	break;
							        } else {
							        	console.log('not in list');
							        	this.$http.post('data/lists/' + currentList['.key'] + '/listItems/.json', item)
							        	break;

							        }
							    } 
							} 

						// Check if ingredient is in current list
						// if ( checkObjProp(currentList.listItems, ingredients[ingredient]) ) {
						// 	console.log('item already in there!');
						// 	console.log(propIndex);
						// 	// If it is already in list, add to the quantity
						// 	let item = listValues.find(element => element.name === ingredients[ingredient].name)
						// 	// let propIndex = listValues.findIndex(element => element.name === ingredient.name)
						// 	// item.quantity += ingredient.quantity;
							
						// 	console.log(item);
						// } else {
						// 	console.log(item);
						// 	this.$http.post('data/lists/' + currentList['.key'] + '/listItems/.json', item)
						// }
							
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