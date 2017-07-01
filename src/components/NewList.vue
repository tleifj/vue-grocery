<template>
	<form>
		<input type="text" placeholder="Add List" v-model="list.title">
		<router-link tag="button" to="/lists" @click.native="saveList()">Save List</router-link>
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
			},
			saveList: function() {
				this.$http.post('data/lists.json', {title: this.list.title, listItems: []})
				.then(function() {
					this.$router.push('/lists');
				})
			}
		},
	}
</script>