<template>
	<div>
		<div class="col-sm-12 header">
			<router-link class="back-link material-icons" to="/lists">chevron_left</router-link>
			<h1>{{list.title}}</h1>
		</div>
		<div class="col-sm-12">
			<input type="text" placeholder="Add List" v-model="list.title">
			<router-link tag="button" to="/lists" class="mdl-button mdl-button--raised" @click.native="saveList()">Save List</router-link>
		</div>
	</div>
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