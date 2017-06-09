<template>
	<div class="col-sm-12">
		<h1>Add items</h1>
		<ul class="list">
			<li 
			class="list-item global-item" 
			v-for="globalItem in $store.state.globalItems" 
			@click="addListItem({id: $route.params.id, item: globalItem})"
			v-if="$store.state.lists[($route.params.id - 1)].listItems.indexOf(globalItem) == -1"
			>{{globalItem.name}}</li>
		</ul>
		<!-- <button @click.prevent="addListItem({id: $route.params.id, item: listItem}, resetListItem())">Add Item</button> -->
		<router-link tag="button" :to="'/lists/' + $route.params.id" class="mdl-button mdl-button--raised">Done</router-link>
		<router-link tag="a" to="/global-list">Don't see your item? Add a new one.</router-link>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		props: ['globalCategories', 'globalItems'],
		data: function() {
			return {
				listItem: {
					name: '',
					category: ''
				},
				query: ''
			}
		},
		methods: {
			...mapActions([
				'addListItem'
			]),
			resetListItem() {
				this.listItem = {};
			}
		}
	}
</script>

<style>
	.global-item {
		cursor: pointer;
	}
</style>