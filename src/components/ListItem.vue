<template>
	<li :class="{checked: listItem.checked}">
		<input type="checkbox" @click="checkOffListItem({listItemIndex: index, listID: $route.params.id})">
		<span>{{listItem.quantity}}</span>
		<span  >{{listItem.name}}</span> 
		<span class="pull-right" @click="deleteListItem({listItemIndex: index, listID: $route.params.id})">Delete</span>
		<span class="pull-right item-increase"
		@click="increaseListItem({listItemIndex: index, listID: $route.params.id})"
		>+</span>
		<span class="pull-right item-decrease"
		@click="decreaseListItem({listItemIndex: index, listID: $route.params.id})"
		>-</span>
		
		
	</li>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		props: ['listItem', 'index'],
		methods: {
			...mapActions([
				'deleteListItem',
				'checkOffListItem',
				'increaseListItem',
				'decreaseListItem'
			])
		}
	}
</script>

<style>
	li.checked span {
		color: lightgrey;
	}
</style>