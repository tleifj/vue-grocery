<template>
	<section class="main-nav">
		<nav>
			<ul>
				<li class="list-icon">
					<router-link to="/lists"><i class="material-icons">list</i>Lists</router-link>
				</li>
				<li class="meal-icon">
					<router-link to="/meal-plans"><i class="material-icons">shopping_basket</i>Meal Plans</router-link>
				</li class="add-icon">
				<li><i class="material-icons" @click="openModal">add_circle_outline</i></li>
				<li class="recipe-icon">
					<router-link to="/recipes"><i class="material-icons">collections_bookmark</i>Recipes</router-link>
				</li>
				<li class="account-icon">
					<router-link to="/account"><i class="material-icons">account_circle</i>Account</router-link>
				</li>
			</ul>
		</nav>
			<transition name="modal">
		    	<div class="modal-mask"  v-if="modalOpen">
		      		<div class="modal-wrapper">
		        		<div class="modal-container">
							<ul >
								<li v-for="recipe in randomRecipes">
									{{recipe.title}}
								</li>
							</ul>
							<button class="mdl-button mdl-button--raised" @click="newRandomRecipes">Random</button>
							<button class="mdl-button mdl-button--raised" @click="addMeals">Add Meals</button>
		        		</div>
		      		</div>
		    	</div>
		  	</transition>
			<div id="modal">
			
		</div>
	</section>		
</template>

<script>
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	import {db} from '../firebase';
	export default {

		firebase: {
		    recipes: db.ref('data/recipes'),
		    mealPlans: db.ref('data/mealPlans'),
			lists: db.ref('data/lists')
	  	},
	  	data: function() {
	  		return {
	  			modalOpen: false,
	  			// randomRecipes: []
	  		}
	  	},
	  	computed: {
	  		randomRecipes() {
	  			let randomRecipes = shuffle(this.recipes);
	  			return randomRecipes.slice(0,5);
	  		} 
	  	},
	  	methods: {
	  		openModal() {
	  			this.modalOpen = true;
	  		},
	  		newRandomRecipes() {
	  			this.recipes.push(); // this creates a mutation to the array without modifying it. It gets shuffled each time with the computed function.
	  		},
	  		addMeals() {
	  			// Get current meal plan
				let currentMealPlan = this.mealPlans[Object.keys(this.mealPlans)[Object.keys(this.mealPlans).length - 1]];
				console.log(currentMealPlan);
				// If there is a meal plan to check
				if ( currentMealPlan ) {
					console.log(currentMealPlan);
					for (var randomRecipe of this.randomRecipes) {
						console.log(randomRecipe);
						// Go through each meal in meal plan
						if ( currentMealPlan.meals ) {
							for (var prop in currentMealPlan.meals) {
								// If it has any meals
								if (currentMealPlan.meals.hasOwnProperty(prop)) {
									console.log(prop);
									let val = currentMealPlan.meals[prop];
									console.log(val);
									// If the current recipe matches currently checked meal
									if ( val.title === randomRecipe.title ) {
										console.log('in meal plan already');
										alert('Recipe is already in current meal plan.');
										break;
									// If not in meal plan, add it 
									} else {
										console.log('not in meal plan already');
										console.log(randomRecipe);
										randomRecipe.recipeReference = randomRecipe['.key'];
										delete randomRecipe['.key'];

										this.$http.post('data/mealPlans/' + currentMealPlan['.key'] + '/meals/.json', randomRecipe);
									}
								} 
							}
						} else {
							randomRecipe.recipeReference = randomRecipe['.key'];
							delete randomRecipe['.key'];
							console.log(randomRecipe);
							this.$http.post('data/mealPlans/' + currentMealPlan['.key'] + '/meals/.json', randomRecipe);
						}	
					}	
				}


				// Get current list
				// let currentList = this.lists[Object.keys(this.lists)[Object.keys(this.lists).length - 1]];
				// console.log(currentList.listItems);
				// console.log(recipe.ingredients);
				// let ingredients = recipe.ingredients;
				// // Go through each ingredient in recipe to see if it exists on current list
				// Object.keys(ingredients).forEach(ingredient => {
				// 	let item = ingredients[ingredient];
				// 	// Check if list exists
				// 	if ( currentList.listItems ) {
				// 		console.log('has list');
				// 		// Go through each list item
				// 		for (var prop in currentList.listItems) {
				// 			console.log('gettinglist item...');
				// 			// If it's a unique property
				// 		    if (currentList.listItems.hasOwnProperty(prop)) {
				// 		    	console.log('has on props');
				// 		    	console.log(prop);
				// 		        // Get value of property (list prop)
				// 		        var val = currentList.listItems[prop];
				// 		        console.log(val);
				// 		        console.log(item);
				// 		        // If an item has the same name as the currently checked ingredient
				// 		        if (val.name == item.name) {
				// 		        	console.log('in list already');
				// 		        	// Update the quantity 
				// 		        	this.$http.put('data/lists/' + currentList['.key'] + '/listItems/' + prop + '/quantity.json', item.quantity + item.quantity);
				// 		        	break;
				// 		        } else {
				// 		        	// Add the new item to the list
				// 		        	console.log('not in list');
				// 		        	this.$http.post('data/lists/' + currentList['.key'] + '/listItems/.json', item)
				// 		        	break;

				// 		        }
				// 		    } 
				// 		} 
				// 	} else {
				// 		// Set checked status to false
				// 		console.log('no list, created item');
				// 		// ingredient.checked = false;
				// 		this.$http.post('data/lists/' + currentList['.key'] + '/listItems.json', item)
				// 	}	
					
				// })
	  		}
	  	}
	}
</script>

<style lang="scss">
	$dark-blue: #2e475b;

	.main-nav {
		padding: 5px 0;
		background: #FFF;
		border-top: 1px solid #eae9e9;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	nav {
		
		ul {
			text-align: center;
			margin: 0;
			li {
				list-style-type: none;
				display: inline-block;
				margin: 0 12px;
				a {
					color: $dark-blue;
				}

				i.material-icons {
					display: block;
				}
			}
		}
	}

	.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 300px;
	  margin: 0px auto;
	  padding: 20px 30px;
	  background-color: #fff;
	  border-radius: 2px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: all .3s ease;
	}

	/*
	 * The following styles are auto-applied to elements with
	 * transition="modal" when their visibility is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */

	.modal-enter {
	  opacity: 0;
	}

	.modal-leave-active {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
</style>