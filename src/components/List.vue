<template>
	<div class="col-sm-12 list">
		<router-link class="back-link material-icons" to="/lists">chevron_left</router-link>
		<i class="material-icons add-link" v-if="!editMode" @click="changeEditMode()">edit_mode</i>
		<i class="material-icons add-link" v-if="editMode"  @click="changeEditMode()">done</i>
		
		<h1>{{list.title}}</h1>

			<ul class="" v-if="list.listItems">
				<app-list-item class="list-item" v-for="(listItem, index) in list.listItems"
				:listItem="listItem" :index="index" :editMode="editMode"
				>
					
				</app-list-item>
			</ul>

			<p v-else>No Items yet! Add some.</p>
			<router-link class="mdl-button mdl-button--raised" tag="button" :to="'/lists/' + $route.params.id + '/edit'" v-if="editMode || !list.listItems">Add Items</router-link>
	</div>
</template>

<script>
	import ListItem from "./ListItem.vue";
	import NewListItem from "./NewListItem.vue";
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import {db} from '../firebase'

	export default {
		data: function() {
			return {
				editMode: false
			}	
		},
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
			changeEditMode: function() {
				this.editMode = !this.editMode
			},
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
		ul { 
			background: #FFF;
			box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
		}
		.list-item {
			padding: 10px 15px;
			margin-bottom: 8px;
			border-bottom: 1px solid #eae9e9;
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

	.back-link {
		float: left;
	}

	.add-link {
		float: right;
	}
</style>