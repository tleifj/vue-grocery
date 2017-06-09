<template>
	<header>
		<nav>
			<ul>
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/lists">Lists</router-link></li>
				<li><router-link to="/meal-plans">Meal Plans</router-link></li>
				<li><router-link to="/recipes">Recipes</router-link></li>
				<li>Log out</li>
			</ul>
		</nav>
	</header>		
</template>

<style lang="scss">

	header {
		padding: 20px 0;
		border-bottom: 1px solid grey;
	}
	nav {
		
		ul {
			text-align: right;
			li {
				list-style-type: none;
				display: inline-block;
				margin: 0 15px;
			}
		}
	}
</style>