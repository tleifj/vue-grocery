<template>
	<div class="col-sm-12 list">
			<h1>{{$store.state.lists[($route.params.id - 1)].title}}</h1> 
			<ul class="">
				<app-list-item class="list-item" v-for="(listItem, index) in listItems"
				:listItem="listItem" :index="index"
				>
					
				</app-list-item>
			</ul>
			<router-link tag="button" :to="'/lists/' + $route.params.id + '/edit'" class="mdl-button mdl-button--raised">Add Items</router-link>
			<router-link tag="button" to="/lists" class="mdl-button mdl-button--raised" @click.native="saveList()">Save List</router-link>
	</div>
	
</template>

<script>
	import ListItem from "./ListItem.vue";
	import NewListItem from "./NewListItem.vue";
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'

	export default {
		computed: {
			listItems() {
				return this.$store.state.lists[(this.$route.params.id - 1)].listItems;
			}
		},
		methods: {
			...mapActions[
				'saveList'
			]
		},
		components: {
			appListItem: ListItem,
			appNewListItem: NewListItem
		},

		
	}
</script>

<style lang="scss">
	.list {
		ul { padding: 0;}
		.list-item {
			background: #FFF;
			padding: 10px 15px;
			box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
			margin-bottom: 8px;
			span {
				cursor: pointer;
				&.checked {
					text-decoration: line-through;
					font-style: italic;
					color: #d0d0d0;
				}
			}

			button {
				display: inline-block;
				width: initial;
				margin: 0;
			}
		}
	}
</style>