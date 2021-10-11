<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="back-link material-icons" to="/lists">chevron_left</router-link>
			<i class="material-icons add-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
			<i class="material-icons add-link" v-if="editMode"  @click="changeEditMode()">done</i>
			
			<h1>{{list.title}}</h1>
		</div>
		<div class="col-sm-12 list">
			<ul class="" v-if="sortedListItems">
				<app-list-item class="list-item" v-for="(listItem, index) in sortedListItems"
				:listItem="listItem" :index="index" :editMode="editMode"
				>
					
				</app-list-item>
			</ul>

			<p v-else>No Items yet! Add some.</p>
			<router-link class="mdl-button mdl-button--raised" tag="button" :to="'/lists/' + $route.params.id + '/edit'" v-if="editMode || !list.listItems">Add Items</router-link>
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
		// Creates an array of the list items using dynamic variable on created hook. Trying to sort list alphabetically (can't do it with object properties)
		// created () {
		// 	this.$bindAsArray('listItemsFBB', db.ref('data/lists/' + this.$route.params.id + '/listItems'))
		// },
		data: function() {
			return {
				editMode: false,
			}	
		},
		computed: {
			list() {

				let list = this.lists.find(element => element['.key'] === this.$route.params.id);
				console.log(list);
				return list;
			},
			// Function that turns object properties into array for sorting. 
			sortedListItems() {
				// Grab the list items from above function
				let listItems = this.list.listItems;
				// console.log(listItems);
				// We need to convert list items (which are object properties)
				// to an array so we can sort them based on the category
				let listItemsArray = [];
				// Define the category order
				let categoryOrder = ['Produce', 'Dry Goods', 'Refrigerated', 'Dairy', 'Bread', 'Alcohol'];
				// Loop through each category
				categoryOrder.forEach(element => {
					// Within each category loop, we loop through the list items
					for (var item in listItems) {
						// If the list item category matches current category, 
						// add it to our array
						if (listItems[item].category === element) {
							listItems[item].key = item;
							listItemsArray.push(listItems[item]);
						}
					}
				});
				// console.log(listItemsArray);
				// Let's convert our array back into an object
				// This is what the rest of the app and firebase is expecting (not an array)
				let objNewListItems = {};
				listItemsArray.forEach(element => {
					objNewListItems[element.key] = element
				});
				console.log(objNewListItems);
				
				return objNewListItems;
				
			}
		},
		methods: {
			changeEditMode: function() {
				this.editMode = !this.editMode
			},
			// For debugging
			checkList: function() {
				console.log(this.listItemsFBB);
			}
		},
		firebase: {
			lists: db.ref('data/lists'),
			// Attempting to pull in list items with variable from url  (this.$router.params.id)
			listItemsFB: db.ref('data/lists/-KplyCmq6yP9IXcJVsQd/listItems')
		},
		components: {
			appListItem: ListItem,
			appNewListItem: NewListItem
		},

		
	}
</script>

<style lang="scss">
	.list {
		ul { 
			background: #FFF;
		}
		.list-item {
			margin-bottom: 0;
			border-bottom: 1px solid #eae9e9;
			span {
				cursor: pointer;
				&.checked {
					text-decoration: line-through;
					font-style: italic;
					color: #d0d0d0;
				}
			}

			i {
				vertical-align: -5px;
			}

			button {
				display: inline-block;
				width: initial;
				margin: 0;
			}
		}
	}

	.back-link {
		float: left;
	}

	.add-link {
		float: right;
	}
</style>