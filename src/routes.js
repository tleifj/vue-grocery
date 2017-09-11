import Home from './components/Home.vue'

import Lists from './components/Lists.vue'
import ListsStart from './components/ListsStart.vue'
import List from './components/List.vue'
import NewList from './components/NewList.vue'
import NewListItem from './components/NewListItem.vue'

import MealPlansStart from './components/MealPlansStart.vue'
import MealPlans from './components/MealPlans.vue'
import MealPlan from './components/MealPlan.vue'
import NewMeal from './components/NewMeal.vue'
import NewMealPlan from './components/NewMealPlan.vue'

import RecipesStart from './components/RecipesStart.vue'
import Recipes from './components/Recipes.vue'
import Recipe from './components/Recipe.vue'
import NewRecipe from './components/NewRecipe.vue'
import EditRecipe from './components/EditRecipe.vue'

import NewGlobalListItem from './components/NewGlobalListItem.vue'
import Account from './components/Account.vue'

export const routes = [
	{path: '/', component: Home},
	{path: '/lists', component: Lists, children: [
		{path: '', component: ListsStart},
		{path: 'new', component: NewList},
		{path: ':id', component: List},
		{path: ':id/edit', component: NewListItem}

	]},
	{path: '/meal-plans', component: MealPlans
	, children: [
		{path: '', component: MealPlansStart},
		{path: 'new', component: NewMealPlan},
		{path: ':id', component: MealPlan},
		{path: ':id/edit', component: NewMeal}

	]
	},
	{path: '/recipes', component: Recipes,
	children: [
		{path: '', component: RecipesStart},
		{path: 'new', component: NewRecipe},
		{path: ':id', component: Recipe},
		{path: ':id/edit', component: EditRecipe}
	]
	
	},
	{path: '/global-list', component: NewGlobalListItem},
	{path: '/account', component: Account}
];