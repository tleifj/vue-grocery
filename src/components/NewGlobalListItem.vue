<template>
	<div>
		<label for="item-name">Item Name</label>
		<input type="text" name="item-name" v-model="globalItem.name" >
		<label for="item-category">Category</label>
		<input type="text" name="item-category" v-model="globalItem.category">
		<button @click.prevent="addGlobalItem(globalItem, resetGlobalItemForm())">Add Item</button>
		<span onclick="window.history.back()">Go Back</span>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		data: function() {
			return {
				globalItem: {
					name: '',
					category: ''
				}
			}
		},
		methods: {
			...mapActions([
				'addGlobalItem'
			]),
			resetGlobalItemForm() {
				this.globalItem = {}
			}
		},
	}
</script>

<style>
	
</style>