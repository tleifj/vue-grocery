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
				let currentMealPlan = this.mealPlans[Object.keys(this.mealPlans)[Object.keys(this.mealPlans).length - 1]];
				let currentList = this.lists[Object.keys(this.lists)[Object.keys(this.lists).length - 1]];
				console.log(currentList.listItems);
				recipe.ingredients.forEach(ingredient => {
					// Check if list exists
					if ( currentList.listItems ) {
						// Get list items as an array
						var listValues = Object.values(currentList.listItems)
						var itemIndex;
						console.log(currentList.listItems);
						function checkObjProp(obj, element) {
							for (var item in obj) {
								// If it's a unique property
							    if (obj.hasOwnProperty(item)) {
							        // Get value of property (list item)
							        var val = obj[item];
							        if (val.name === element.name) {
							        	itemIndex = item;
							        	return true;
							        }
							    } 
							}
						}
						// Check if ingredient is in current list
						if ( checkObjProp(currentList.listItems, ingredient) ) {
							console.log('item already in there!');
							// If it is already in list, add to the quantity
							let item = listValues.find(element => element.name === ingredient.name)
							// let itemIndex = listValues.findIndex(element => element.name === ingredient.name)
							// item.quantity += ingredient.quantity;
							this.$http.put('data/lists/' + currentList['.key'] + '/listItems/' + itemIndex + '/quantity.json', item.quantity + item.quantity)
							console.log(itemIndex);
						}
						// console.log(listValues);
						// if (Object.values(currentList.listItems).indexOf(ingredient.name) > -1) {
						//    console.log('has ingredient');
						// } else {
						// 	console.log('does not have ingredient')
						// }

						// Loop through each list item in current list
						// for (var item in currentList.listItems) {
						// 	// If it's a unique property
						//     if (currentList.listItems.hasOwnProperty(item)) {
						//         // Get value of property (list item)
						//         var listItem = currentList.listItems[item];
						//         console.log(currentList['.key']);
						//         if (listItem.name === ingredient.name) {
						//         	this.$http.put('data/lists/' + currentList['.key'] + '/listItems/' + item + '/quantity.json', listItem.quantity + 1)
						//         	console.log("in there!")
						//         } else {
						// 			// Set checked status to false
						// 			ingredient.checked = false;
						// 			this.$http.post('data/lists/' + currentList['.key'] + '/listItems.json', ingredient)
						// 			console.log('new item')
						// 		}
						//     } 
						// }	
					} else {
						// Set checked status to false
						console.log('no list, created item');
						ingredient.checked = false;
						this.$http.post('data/lists/' + currentList['.key'] + '/listItems.json', ingredient)
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