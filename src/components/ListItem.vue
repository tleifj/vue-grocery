<template>
	<li :class="{checked: listItem.checked}">
		<input type="checkbox" @click="checkOffListItem(index)">
		<span>{{listItem.quantity}}</span>
		<span  >{{listItem.name}}</span> 
		<span class="pull-right" @click="deleteListItem(index)">Delete</span>
		<span class="pull-right item-increase"
		@click="increaseListItem(index)"
		>+</span>
		<span class="pull-right item-decrease"
		@click="decreaseListItem(index)"
		>-</span>
		
		
	</li>
</template>

<script>
	import {mapActions} from 'vuex'
	import {db} from '../firebase'
	export default {
		props: [ 'index'],
		computed: {
			listItem() {
				let list =  this.lists.find(element => element['.key'] === this.$route.params.id);
				return list.listItems[this.index];
			}
		},
		methods: {
			checkOffListItem: function(index) {
				this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/checked.json', !this.listItem.checked)
			},
			increaseListItem: function(index) {
				this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/quantity.json', this.listItem.quantity + 1)
				console.log(this.listItem.quantity)
			},
			decreaseListItem: function(index) {
				if (this.listItem.quantity > 1 ) {
					this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/quantity.json', this.listItem.quantity - 1)
				}	
				console.log(this.listItem.quantity)
			},
			deleteListItem: function(index) {
				this.$http.delete('data/lists/' + this.$route.params.id + '/listItems/' + index + '.json')
			}
		},
		firebase: {
			lists: db.ref('data/lists')
		},
	}
</script>

<style>
	li.checked span {
		color: lightgrey;
	}
</style>