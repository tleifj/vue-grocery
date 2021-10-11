<template>
	<div>
		<div class="col-sm-12 header">
			<i class="material-icons back-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
			<i class="material-icons back-link" v-if="editMode"  @click="changeEditMode()">done</i>
			<router-link tag="i" to="/lists/new" class="material-icons add-link">add</router-link>
			<h1 >Grocery Lists</h1>
		</div>
		<div class="col-sm-12">	
			<ul class="list">
				<li class="list-item" v-for="(list, index) in sortedLists">				
					<router-link  tag="span" :to="'/lists/' + list['.key']">
					{{list.title}}
					</router-link>
					<i class="material-icons pull-right"  v-if="editMode" @click="deleteList(index)">close</i>
				</li>	
			</ul>	
		</div>
	</div>			
</template>

<script>
	import NewList from './NewList.vue';
	import {db} from '../firebase';
	export default {
		data: function() {
			return {
				editMode: false,
			}
		},
		computed: {
			sortedLists() {
				return this.lists.reverse();
			}
		},
		methods: {
			changeEditMode: function() {
				this.editMode = !this.editMode;
			},
			deleteList: function(index) {
				console.log(this.lists[index]['.key']);
				this.$http.delete('data/lists/' + this.lists[index]['.key'] + '.json')
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
			margin-bottom: 0;
			display: block;
			padding-top: 15px;
			padding-bottom: 15px;
			border-radius: 2px;

			i, span {
				margin-right: 6px;
			}
		}
	}

	.lists {
		.list {
			.list-item {
				span {
					display: inline-block;
					width: calc(100% - 30px);
				}
			}
		}
	}

</style>