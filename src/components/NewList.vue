<template>
	<form>
		<input type="text" placeholder="Add List" v-model="list.title">
		<router-link tag="button" to="/lists" @click.native="addList(list, resetList())">Save List</router-link>
	</form>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		data: function() {
			return {
				list: {
					title: '',
					listItems: []
				}
			}
		},
		methods: {
			...mapActions([
				'addList'
			]),
			resetList() {
				this.list = {}
			}
		},
	}
</script>