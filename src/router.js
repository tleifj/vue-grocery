import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";

import Login from "./components/Login.vue";

import Lists from "./components/Lists.vue";
import ListsStart from "./components/ListsStart.vue";
import List from "./components/List.vue";
import NewList from "./components/NewList.vue";
import NewListItem from "./components/NewListItem.vue";

import MealPlansStart from "./components/MealPlansStart.vue";
import MealPlans from "./components/MealPlans.vue";
import MealPlan from "./components/MealPlan.vue";
import NewMeal from "./components/NewMeal.vue";
import NewMealPlan from "./components/NewMealPlan.vue";

import RecipesStart from "./components/RecipesStart.vue";
import Recipes from "./components/Recipes.vue";
import Recipe from "./components/Recipe.vue";
import NewRecipe from "./components/NewRecipe.vue";
import EditRecipe from "./components/EditRecipe.vue";

import NewGlobalListItem from "./components/NewGlobalListItem.vue";
import Account from "./components/Account.vue";

import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  //   {
  //     path: "*",
  //     redirect: "/login",
  //   },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "/", component: Home },
  {
    path: "/lists",
    component: Lists,
    children: [
      { path: "", component: ListsStart },
      { path: "new", component: NewList },
      { path: ":id", component: List },
      { path: ":id/edit", component: NewListItem },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/meal-plans",
    component: MealPlans,
    children: [
      { path: "", component: MealPlansStart },
      { path: "new", component: NewMealPlan },
      { path: ":id", component: MealPlan },
      { path: ":id/edit", component: NewMeal },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipes",
    component: Recipes,
    children: [
      { path: "", component: RecipesStart },
      { path: "new", component: NewRecipe },
      { path: ":id", component: Recipe },
      { path: ":id/edit", component: EditRecipe },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/global-list",
    component: NewGlobalListItem,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(currentUser);
  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;
