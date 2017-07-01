<template>
	<div class="col-sm-12 list">
		<h1>{{list.title}}</h1>

			<ul class="">
				<app-list-item class="list-item" v-for="(listItem, index) in list.listItems"
				:listItem="listItem" :index="index"
				>
					
				</app-list-item>
				<!-- <li class="list-item" v-for="(listItem, index) in listItems">
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
					
					
				</li> -->
			</ul>
			<router-link tag="button" :to="'/lists/' + $route.params.id + '/edit'" class="mdl-button mdl-button--raised">Add Items</router-link>
		<!-- 	<router-link tag="button" to="/lists" class="mdl-button mdl-button--raised" @click.native="saveList()">Save List</router-link> -->
			<button class="mdl-button mdl-button--raised" @click="saveList()">Save</button>
	</div>
</template>

<script>
	import ListItem from "./ListItem.vue";
	import NewListItem from "./NewListItem.vue";
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import {db} from '../firebase'

	export default {
		computed: {
			list() {
				return this.lists.find(element => element['.key'] === this.$route.params.id);
			}
		},
		methods: {
			...mapActions([
				// 'saveList',
				'deleteListItem',
				'checkOffListItem',
				'increaseListItem',
				'decreaseListItem',
			]),
			saveList: function() {
				let test = this.$route;
				console.log(test);
				this.$http.post('data/lists.json', this.$store.state.lists[(this.$route.params.id - 1)])
				.then(function() {
					this.$router.push('/lists');
				})
			}
		},
		firebase: {
			lists: db.ref('data/lists')
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