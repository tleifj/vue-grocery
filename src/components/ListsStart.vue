<template>
	<div class="col-sm-12">
		<h1 >Grocery Lists</h1>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/lists/' + (index + 1)" v-for="(list, index) in $store.state.lists">{{list.title}}</router-link>
		</ul>
		<router-link tag="button" to="/lists/new" class="mdl-button mdl-button--raised">New List</router-link>
	</div>		
</template>

<script>
	import NewList from './NewList.vue';
	export default {
		// computed: {
		// 	getLists() {
		// 		return this.$store.getters.getLists;
		// 	}
		// },
		components: {
			appNewList: NewList
		}
	}
</script>