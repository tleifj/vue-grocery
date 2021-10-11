import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    lists: [
      {
        id: 1,
        title: "List 1",
        listItems: [
          {
            name: "Item 1",
            quantity: 1,
            category: "Produce",
            checked: false,
          },
        ],
      },
    ],
    globalItems: [
      { name: "Kale", category: "Produce" },
      { name: "Lettuce", category: "Produce" },
      { name: "Cabbage", category: "Produce" },
      { name: "Tomatoes", category: "Produce" },
      { name: "Carrots", category: "Produce" },
      { name: "Garlic", category: "Produce" },
      { name: "Ginger", category: "Produce" },
      { name: "Pasta Sauce", category: "Dry Goods" },
      { name: "Milk", category: "Refridgerated" },
      { name: "Creamer", category: "Refridgerated" },
      { name: "Tempeh Bacon", category: "Refridgerated" },
      { name: "Tofu", category: "Refridgerated" },
      { name: "Bread", category: "Bread" },
      { name: "Baguette", category: "Bread" },
      { name: "Beer", category: "Alcohol" },
    ],
    globalCategories: ["Produce", "Dry Goods", "Dairy", "Bread", "Alcohol"],
    recipes: [
      {
        id: 1,
        title: "Spaghetti",
        ingredients: [
          {
            name: "Spaghetti",
            category: "Dry Goods",
            quantity: 1,
          },
          {
            name: "Pasta Sauce",
            category: "Dry Goods",
            quantity: 1,
          },
        ],
      },
      {
        id: 2,
        title: "BLTs",
        ingredients: [
          {
            name: "Tempeh Bacon",
            category: "Refridgerated",
            quantity: 1,
          },
          {
            name: "Tomatoes",
            category: "Produce",
            quantity: 2,
          },
          {
            name: "Lettuce",
            category: "Produce",
            quantity: 1,
          },
          {
            name: "Bread",
            category: "Bread",
            quantity: 1,
          },
          {
            name: "Mayonaise",
            category: "Refridgerated",
            quantity: 1,
          },
        ],
      },
    ],
    mealPlans: [
      {
        id: 1,
        title: "Meal Plan 1",
        meals: [
          {
            id: 1,
            title: "Spaghetti",
            ingredients: [
              {
                name: "Spaghetti",
                category: "Dry Goods",
              },
              {
                name: "Pasta Sauce",
                category: "Dry Goods",
              },
            ],
          },
        ],
      },
    ],
    currentList: "",
  },
  getters: {
    meals: (state) => {
      return state.meals;
    },
  },
  mutations: {
    addList: (state, payload) => {
      console.log("list added");
      state.lists.push(payload);
    },
    saveList: (state, payload) => {
      console.log("list saved");
    },
    addListItem: (state, payload) => {
      console.log("list item added");
      payload.item.quantity = 1;
      state.lists[payload.id].listItems.splice(
        state.lists[payload.id].listItems.length,
        1,
        payload.item
      );
    },
    increaseListItem: (state, payload) => {
      console.log("list item increased");
      if (
        !state.lists[payload.listID].listItems[payload.listItemIndex].checked
      ) {
        state.lists[payload.listID].listItems[payload.listItemIndex].quantity++;
      }
    },
    decreaseListItem: (state, payload) => {
      console.log("list item decreased");
      if (
        state.lists[payload.listID].listItems[payload.listItemIndex].quantity >
          0 &&
        !state.lists[payload.listID].listItems[payload.listItemIndex].checked
      ) {
        state.lists[payload.listID].listItems[payload.listItemIndex].quantity--;
      }
    },
    deleteListItem: (state, payload) => {
      console.log("list item deleted");
      if (
        !state.lists[payload.listID].listItems[payload.listItemIndex].checked
      ) {
        state.lists[payload.listID].listItems.splice(payload.listItemIndex, 1);
      }
    },
    checkOffListItem: (state, payload) => {
      console.log("list item checked");
      state.lists[payload.listID].listItems[
        payload.listItemIndex
      ].checked = !state.lists[payload.listID].listItems[payload.listItemIndex]
        .checked;
    },
    addGlobalItem: (state, payload) => {
      console.log("global item added");
      console.log(payload);
      state.globalItems.push(payload);
    },
    addMealPlan: (state, payload) => {
      state.mealPlans.push(payload);
    },
    addMeal: (state, payload) => {
      console.log("meal added");
      console.log(payload);
      state.mealPlans[state.mealPlans.length - 1].meals.push(payload.recipe);
      // Go through each recipe ingredient and add to grocery list
      payload.recipe.ingredients.forEach((ingredient) => {
        // Check if ingredient item is already in list
        if (
          state.lists[state.lists.length - 1].listItems.some(function (
            element,
            index,
            array
          ) {
            return element.name === ingredient.name;
          })
        ) {
          console.log("item already in there!");
          // If it is already in list, add to the quantity
          var item = state.lists[state.lists.length - 1].listItems.find(
            (element) => element.name === ingredient.name
          );
          item.quantity += ingredient.quantity;
        } else {
          // Set checked status to false
          ingredient.checked = false;
          state.lists[state.lists.length - 1].listItems.push(ingredient);
        }
      });
    },
    addRecipe: (state, payload) => {
      console.log("recipe added");
      state.recipes.push(payload);
    },
    addIngredient: (state, payload) => {
      console.log("ingredient added");
      payload.item.quantity = 1;
      state.recipes[payload.id].ingredients.push(payload.item);
    },
    loadData: (state, payload) => {
      state.lists = payload.lists;
      state.globalItems = payload.globalItems;
      state.globalCategories = payload.globalCategories;
      state.recipes = payload.recipes;
      state.mealPlans = payload.mealPlans;
    },
  },
  actions: {
    addList: ({ commit }, payload) => {
      payload.listItems = [];
      commit("addList", payload);
    },
    saveList: ({ commit }, payload) => {
      commit("saveList", payload);
    },
    addListItem: ({ commit }, payload) => {
      commit("addListItem", payload);
    },
    increaseListItem: ({ commit }, payload) => {
      commit("increaseListItem", payload);
    },
    decreaseListItem: ({ commit }, payload) => {
      commit("decreaseListItem", payload);
    },
    deleteListItem: ({ commit }, payload) => {
      commit("deleteListItem", payload);
    },
    checkOffListItem: ({ commit }, payload) => {
      commit("checkOffListItem", payload);
    },
    addGlobalItem: ({ commit }, payload) => {
      commit("addGlobalItem", payload);
    },
    addMealPlan: ({ commit }, payload) => {
      commit("addMealPlan", payload);
    },
    addMeal: ({ commit }, payload) => {
      commit("addMeal", payload);
    },
    addRecipe: ({ commit }, payload) => {
      commit("addRecipe", payload);
    },
    addIngredient: ({ commit }, payload) => {
      commit("addIngredient", payload);
    },
    loadData: ({ commit }) => {
      Vue.http
        .get("data.json")
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const newState = data;
            commit("loadData", newState);
          }
        });
    },
    testAddItem: ({ commit }, payload) => {
      commit("testAddItem", payload);
    },
  },
  getters: {},
});
