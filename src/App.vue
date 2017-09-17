<template>
  <div id="app-container" :class="$route.path.substr(1) + ' container'">
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
      <app-navigation></app-navigation>
    </div>
  </div>  
</template>

<script>
  import Navigation from './components/Navigation.vue';
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
        appNavigation: Navigation,
        appLists: Lists,
        // appNewList: NewList,
        // appList: List,
        // appNewListItem: NewListItem
    }
  }
</script>

<style lang="scss">
  // Variables
  
  $light-grey: #000;
  $dark-blue: #2e475b;
  $light-blue: #5a8397;
  $red: #b77370;
  $orange: #e7a16f;
  $yellow: #e6c157;
  $primary: $dark-blue;

  #app-container {
    padding-bottom: 80px;
    padding-top: 60px;
    

    .header {
      background: $light-blue;
      color: #FFF;

      h1, .back-link, .add-link {
        color: #FFF;
      }
    }

    // &.meal-plans {
    //   .header {
    //     background: $red;
    //   }  

    //   .meal-icon a {
    //     color: $red;
    //   }
    // }

    // &.recipes {
    //   .header {
    //     background: $orange;
    //   }

    //   .recipe-icon a {
    //     color: $orange;
    //   }
    // }
  }

  body {
    color: $dark-blue;
    background: #f6f6f6;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #FFF;
    color: $dark-blue;
    padding-top: 12px;
    padding-bottom: 12px;
    // border-bottom: 1px solid #eae9e9;

    h1, .add-link, .back-link {
      color: $dark-blue;
      margin: 0;
    }
  }

  h1 {
    font-size: 16px;
    color: #FFF;
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
    overflow: hidden;
    width: 24px;
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

  .add-link, .back-link {
    color: #FFF;
  }

  input[type="text"] {
    display: block;
    width: 100%;
  }

  input.mdl-textfield__input {
    margin-bottom: 15px;
  }
</style>
