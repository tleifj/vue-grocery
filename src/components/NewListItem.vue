<template>
	<div class="col-sm-12 list">
		<router-link class="material-icons back-link" :to="'/lists/' + $route.params.id">chevron_left</router-link>
		<h1>Add items</h1>
		<ul>
			<li 
			class="list-item global-item" 
			v-for="globalItem in sortedItems" 
			@click="addListItem(globalItem)"
			
			>{{globalItem.name}}</li>
		</ul>
		<!-- <button @click.prevent="addListItem({id: $route.params.id, item: listItem}, resetListItem())">Add Item</button> -->
		
		<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
		<span @click="sortedItems()">click</span>
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
			}

		},
		methods: {
			// ...mapActions([
			// 	'addListItem'
			// ]),
			addListItem: function(globalItem) {
				globalItem.quantity = 1;
				globalItem.checked = false;
				delete globalItem['.key'];
				// console.log(this.list.listItems);
				this.$http.post('data/lists/' + this.$route.params.id + '/listItems.json', globalItem)
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