<template>
  <div id="app-container" class='container'>
    <div class="row">
      
      <router-view></router-view>
<!--       <app-lists :lists='lists' ></app-lists>
 -->      <!-- <app-new-list @listAdded="newList"></app-new-list>
      <app-list :listItems="lists[0].listItems"></app-list> 
      <app-new-list-item 
      :globalCategories='globalCategories' 
      :globalItems='globalItems'
      @listItemAdded="newListItem"
      ></app-new-list-item> -->
      <app-header></app-header>
    </div>
  </div>  
</template>

<script>
  import Header from './components/Header.vue';
  import Home from './components/Home.vue';
  import Lists from './components/Lists.vue';
  import MealPlans from './components/MealPlans.vue';
  import Account from './components/Account.vue';
  // import NewList from './components/NewList.vue';
  // import List from './components/List.vue';
  // import NewListItem from './components/NewListItem.vue';
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        
      }
    },
    methods: {
        newListItem(listItem) {
            this.lists[0].listItems.push(listItem);
        },
        newList(list) {
            this.lists.push(list);
        },
    },
    components: {
        appHeader: Header,
        appLists: Lists,
        // appNewList: NewList,
        // appList: List,
        // appNewListItem: NewListItem
    }
  }
</script>

<style lang="scss">
  // Variables
  $primary: #3c5cd2;
  $light-grey: #000;

  #app-container {
    padding-bottom: 80px;
  }

  h1 {
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
  }

  button {
    // padding: 10px 15px;
    margin: 15px 0;
    background: $primary;
    // border-radius: 5px;
    color: #FFF;
    // border: 0;
    display: block;
    width: 100%;
    transition: all .3s;

    &.mdl-button {
      background: $primary;
      color: #FFF;

      &:hover {
        background: darken($primary, 5%);
      }
    }

    &:hover {
      background: darken($primary, 5%);
    }
  }

  i.material-icons {
    &:hover {
      cursor: pointer;
    }
  }
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;

    &.list-item {
      font-size: 16px;

      span.item-increase, span.item-decrease {
        margin: 0 10px;
      }
    }

  }

  input[type="text"] {
    display: block;
    width: 100%;
  }
</style>
