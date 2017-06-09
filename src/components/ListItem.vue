<template>
	<li>
		<input type="checkbox">
		<span>{{listItem.quantity}}</span>
		<span @click="checkOffListItem({listItemIndex: index, listID: ($route.params.id - 1)})" :class="{checked: listItem.checked}">{{listItem.name}}</span> 
		<span class="pull-right" @click="deleteListItem({listItemIndex: index, listID: ($route.params.id - 1)})">Delete</span>
		<span class="pull-right item-increase"
		@click="increaseListItem({listItemIndex: index, listID: ($route.params.id - 1)})"
		>+</span>
		<span class="pull-right item-decrease"
		@click="decreaseListItem({listItemIndex: index, listID: ($route.params.id - 1)})"
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