<template>
	<div>
		<label for="item-name">Item Name</label>
		<input type="text" name="item-name" v-model="globalItem.name" >
		<label for="item-category">Category</label>
		<input type="text" name="item-category" v-model="globalItem.category">
		<button @click.prevent="saveGlobalListItem()">Add Item</button>
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
			},
			saveGlobalListItem: function() {
				this.$http.post('data/globalItems.json', {name: this.globalItem.name, category: this.globalItem.category})
				// .then(function() {
				// 	this.$router.push('/lists');
				// })
			}
		},
	}
</script>

<style>
	
</style>