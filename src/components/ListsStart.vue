<template>
	<div class="col-sm-12">
		<router-link tag="i" to="/lists/new" class="material-icons add-link">add</router-link>
		<h1 >Grocery Lists</h1>
		<ul class="list">			
			<router-link class="list-item" tag="li" :to="'/lists/' + list['.key']" v-for="(list, index) in sortedLists">{{list.title}}</router-link>
		</ul>
	</div>		
</template>

<script>
	import NewList from './NewList.vue';
	import {db} from '../firebase';
	export default {
		computed: {
			sortedLists() {
				return this.lists.reverse();
			}
		},
		components: {
			appNewList: NewList
		},
		firebase: {
		    lists: db.ref('data/lists')
	    	
	  	}
	}
</script>

<style lang="scss">
	ul.list  {
		li {
			background: #FFF;
			box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
			margin-bottom: 10px;

		}
	}

</style>