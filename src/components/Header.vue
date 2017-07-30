<template>
	<header>
		<nav>
			<ul>
				<li>
					<router-link to="/lists"><i class="material-icons">list</i>Lists</router-link>
				</li>
				<li>
					<router-link to="/meal-plans"><i class="material-icons">shopping_basket</i>Meal Plans</router-link>
				</li>
				<li><i class="material-icons">add_circle_outline</i></li>
				<li>
					<router-link to="/recipes"><i class="material-icons">collections_bookmark</i>Recipes</router-link>
				</li>
				<li>
					<router-link to="/account"><i class="material-icons">account_circle</i>Account</router-link>
				</li>
			</ul>
		</nav>
	</header>		
</template>

<style lang="scss">

	header {
		padding: 5px 0;
		background: #FFF;
		border-top: 1px solid #eae9e9;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	nav {
		
		ul {
			text-align: center;
			margin: 0;
			li {
				list-style-type: none;
				display: inline-block;
				margin: 0 15px;

				i.material-icons {
					display: block;
				}
			}
		}
	}
</style>