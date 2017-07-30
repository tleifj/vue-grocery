<template>
	<li :class="{checked: listItem.checked}">
		<i class="material-icons" @click="checkOffListItem(index)">{{icon}}</i>
		<span>{{listItem.quantity}}</span>
		<span  >{{listItem.name}}</span> 
		<i class="material-icons pull-right"  v-if="editMode && !listItem.checked" @click="deleteListItem(index)">close</i>
		<i class="material-icons pull-right item-increase"
		@click="increaseListItem(index)"
		 v-if="editMode && !listItem.checked" >add</i>
		<i class="material-icons pull-right item-decrease"
		@click="decreaseListItem(index)"
		 v-if="editMode && !listItem.checked" >remove</i>
		
		
	</li>
</template>

<script>
	import {mapActions} from 'vuex'
	import {db} from '../firebase'
	export default {
		props: [ 'index', 'editMode'],
		data: function() {
			return {
				icon: 'panorama_fish_eye',
			}
		},
		computed: {
			listItem() {
				let list =  this.lists.find(element => element['.key'] === this.$route.params.id);
				return list.listItems[this.index];
			}
		},
		methods: {
			checkOffListItem: function(index) {
				this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/checked.json', !this.listItem.checked);
				if (this.icon === 'panorama_fish_eye') {
					this.icon = 'check_circle';
				} else {
					this.icon = 'panorama_fish_eye';
				}
				

			},
			increaseListItem: function(index) {
				this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/quantity.json', this.listItem.quantity + 1)
				console.log(this.listItem.quantity)
			},
			decreaseListItem: function(index) {
				if (this.listItem.quantity > 1 ) {
					this.$http.put('data/lists/' + this.$route.params.id + '/listItems/' + index + '/quantity.json', this.listItem.quantity - 1)
				}	
				console.log(this.listItem.quantity)
			},
			deleteListItem: function(index) {
				this.$http.delete('data/lists/' + this.$route.params.id + '/listItems/' + index + '.json')
			}
		},
		firebase: {
			lists: db.ref('data/lists')
		},
	}
</script>

<style>
	li.checked span {
		color: lightgrey;
	}
</style>