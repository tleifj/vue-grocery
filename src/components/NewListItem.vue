<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="material-icons back-link" :to="'/lists/' + $route.params.id">chevron_left</router-link>
			<h1>Add items</h1>
		</div>
		<div class="col-sm-12 list">
			<input type="text" v-model="query" class="mdl-textfield__input" placeholder="Search...">
			
			<ul>
				<li 
				class="list-item global-item" 
				v-for="globalItem in filteredItems" 
				@click="addListItem(globalItem)"
				
				>{{globalItem.name}}</li>
			</ul>
			<!-- <button @click.prevent="addListItem({id: $route.params.id, item: listItem}, resetListItem())">Add Item</button> -->
			
			<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
		</div>
	</div>	
</template>

<script>
	import {db} from '../firebase';
	import {mapActions} from 'vuex';
	export default {
		data: function() {
			return {
				listItem: {
					name: '',
					category: ''
				},
				query: '',
			}
		},
		// Gets data from firebase
		firebase: {
			globalItems: {
				source: db.ref('data/globalItems')
			},
			lists: {
				source: db.ref('data/lists')
			} 
		},
		computed: {
			list() {
				return this.lists.find(element => element['.key'] === this.$route.params.id);
			},
			sortedItems() {
				var sortedGlobalItems = this.globalItems.slice(0);
				sortedGlobalItems.sort(function(a,b) {
				    var x = a.name.toLowerCase();
				    var y = b.name.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
				})
				return sortedGlobalItems;
			},
			filteredItems() {
		      return this.sortedItems.filter(item => {
		         return item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
		      })
		    }

		},
		methods: {
			// ...mapActions([
			// 	'addListItem'
			// ]),
			// Adds a new list item to the current list
			addListItem: function(globalItem) {
				console.log(globalItem);
				// TODO: This needs to be updated to be the list we are in, not the most recent
				let currentIndex = Object.keys(this.lists)[Object.keys(this.lists).length - 1];
				// console.log(currentIndex);
				let currentList = this.lists[currentIndex];
				// Set default properties for a newly added item
				globalItem.quantity = 1;
				globalItem.checked = false;
				// Remove the key since we don't need that on the list item
				delete globalItem['.key'];
				// Set a flag for the logic below
				let itemAlreadyExists = false;
				
				console.log(currentList);
				// If we don't have a list (Firebase doesn't allow for empty arrays or objects)
				if (currentList.listItems === undefined) {
					currentList.listItems = [];
					currentList.listItems.push(globalItem);
					// Add a new item in Firebase
					this.$http.post('data/lists/' + this.$route.params.id + '/listItems.json', globalItem);				} else {
					console.log(currentList.listItems);
					// Loop through each list item (each list item is an object property)
					for (var prop in currentList.listItems) {
						if (currentList.listItems.hasOwnProperty(prop)) {
							// This is the current list item
							let val = currentList.listItems[prop];
							
							// If the names match, then the newly added item is already on the list
							if ( globalItem.name === val.name ) {
								// Set this to true so it doesn't get added as a new item. 
								// Instead we will just update the quantity of the item that already exists
								itemAlreadyExists = true;
								console.log('item already in there');
								// Update item quantity in Firebase
								this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + prop + '/quantity.json', val.quantity + 1);
								break;
							} 	
						}	
					}
					// If it doesn't exist on the list, add a new item
					if (!itemAlreadyExists) {
						console.log('new item!');
						this.$http.post('data/lists/' + this.$route.params.id + '/listItems.json', globalItem);
					}
				}	
				// console.log(this.list.listItems);
			},
			resetListItem() {
				this.listItem = {};
			},
			
			// itemCheck(item) {
			// 	// console.log(this.list.listItems);
			// 	var loopItems = this.list['listItems'];
			// 	console.log(loopItems);
			// 	for (var listItem in loopItems) {
			// 		if ( listItem.name === item.name ) {
			// 			return false;
			// 		}
			// 	}
			// }
		}
	}
</script>

<style>
	.global-item {
		cursor: pointer;
	}
</style>