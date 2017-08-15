<template>
	<header>
		<nav>
			<ul>
				<li class="list-icon">
					<router-link to="/lists"><i class="material-icons">list</i>Lists</router-link>
				</li>
				<li class="meal-icon">
					<router-link to="/meal-plans"><i class="material-icons">shopping_basket</i>Meal Plans</router-link>
				</li class="add-icon">
				<li><i class="material-icons">add_circle_outline</i></li>
				<li class="recipe-icon">
					<router-link to="/recipes"><i class="material-icons">collections_bookmark</i>Recipes</router-link>
				</li>
				<li class="account-icon">
					<router-link to="/account"><i class="material-icons">account_circle</i>Account</router-link>
				</li>
			</ul>
		</nav>
	</header>		
</template>

<style lang="scss">
	$dark-blue: #2e475b;

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
				margin: 0 12px;
				a {
					color: $dark-blue;
				}

				i.material-icons {
					display: block;
				}
			}
		}
	}
</style>