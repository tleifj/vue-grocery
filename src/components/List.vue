<template>
	<div class="col-sm-12 list">
		<router-link class="back-link material-icons" to="/lists">chevron_left</router-link>
		<i class="material-icons add-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
		<i class="material-icons add-link" v-if="editMode"  @click="changeEditMode()">done</i>
		
		<h1>{{list.title}}</h1>

			<ul class="" v-if="list.listItems">
				<app-list-item class="list-item" v-for="(listItem, index) in list.listItems"
				:listItem="listItem" :index="index" :editMode="editMode"
				>
					
				</app-list-item>
			</ul>

			<p v-else>No Items yet! Add some.</p>
			<router-link class="mdl-button mdl-button--raised" tag="button" :to="'/lists/' + $route.params.id + '/edit'" v-if="editMode || !list.listItems">Add Items</router-link>
			<!-- For testing list -->
			<span @click="checkList()">clikc</span>
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
				return this.lists.find(element => element['.key'] === this.$route.params.id);
			},
			// Function that turns object properties into array for sorting. Doesn't work though because it doesn't maintain the list item key (needed for firebase)
			sortedListItems() {
				let sortedListItems = Object.keys(this.list.listItems).map(key => this.list.listItems[key]);
				sortedListItems = sortedListItems.slice(0);
				sortedListItems.sort(function(a,b) {
				    let x = a.name.toLowerCase();
				    let y = b.name.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
				})
				return sortedListItems;
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
			box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
		}
		.list-item {
			padding: 10px 15px;
			margin-bottom: 8px;
			border-bottom: 1px solid #eae9e9;
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

	.back-link {
		float: left;
	}

	.add-link {
		float: right;
	}
</style>