<template>
	<div class="col-sm-12">
		<h1 >Grocery Lists</h1>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/lists/' + list['.key']" v-for="(list, index) in lists">{{list.title}}</router-link>
		</ul>
		<router-link tag="button" to="/lists/new" class="mdl-button mdl-button--raised">New List</router-link>
	</div>		
</template>

<script>
	import NewList from './NewList.vue';
	import {db} from '../firebase';
	export default {
		// computed: {
		// 	getLists() {
		// 		return this.$store.getters.getLists;
		// 	}
		// },
		components: {
			appNewList: NewList
		},
		firebase: {
		    lists: db.ref('data/lists')
	    	
	  	}
	}
</script>