<template>
	<div>
		<div class="col-sm-12 header">
			<router-link tag="i" to="/lists/new" class="material-icons add-link">add</router-link>
			<h1 >Grocery Lists</h1>
		</div>
		<div class="col-sm-12">	
			<ul class="list">				
					<router-link class="list-item" tag="li" :to="'/lists/' + list['.key']" v-for="(list, index) in sortedLists">{{list.title}}</router-link>
				</ul>	
			</div>
		</div>
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
	.list  {

		.list-item {
			background: #FFF;
			margin-bottom: 10px;
			display: block;
			min-height: 50px;
			border-radius: 2px;
		}
	}

</style>