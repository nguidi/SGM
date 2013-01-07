steal('sigma/fixtures'
,	'sigma/hal/hal_builder.js'
).then(
	function()
	{
		can.fixture("GET /api/jperez"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						brand: 'Topbar'
					}
				,	'/api/jperez'
				).link(
					{
						nav1: {href: '/api/jperez/profile', title: 'Profile', name: 'profile'}
					,	nav2: {href: '/api/jperez/config', title: 'Configuracion', name: 'config'}
					,	nav3: {href: '/api/jperez/logout', title: 'Salir', name: 'logout'}
					,	dropdown1: 
						[
							{href: '/api/jperez/profile', title: 'Profile', name: 'profile'}
						,	{href: '/api/jperez/config', title: 'Configuracion', name: 'config'}
						,	{href: '/api/jperez/logout', title: 'Salir', name: 'logout'}
						]
					,	dropdown2: 
						[
							{href: '/api/jperez/profile', title: 'Profile', name: 'profile'}
						,	{href: '/api/jperez/config', title: 'Configuracion', name: 'config'}
						,	{href: '/api/jperez/logout', title: 'Salir', name: 'logout'}
						]
					}
				).get_document()
			}
		)

		can.fixture("GET /api/jperez/dashboard"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'dashboard'
					,	title: 'Dashboard'
					,	desc: 'Dash yalalalala'
					}
				,	'/api/jperez/dashboard'
				).get_document()
			}
		)

		can.fixture("GET /api/jperez/notices"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'notices'
					,	title: 'Notices'
					,	desc: 'Notices yalalalala'
					}
				,	'/api/jperez/notcies'
				).get_document()
			}
		)

		can.fixture("GET /api/jperez/profile"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'profile'
					,	title: 'Profile'
					,	desc: 'Profile yalalalala'
					}
				,	'/api/jperez/profile'
				).get_document()
			}
		)

		can.fixture("GET /api/jperez/config"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'config'
					,	title: 'Config'
					,	desc: 'Config yalalalala'
					}
				,	'/api/jperez/config'
				).get_document()
			}
		)

		can.fixture("GET /api/jperez/logout"
		,	function(original)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'logout'
					,	title: 'Logout'
					,	desc: 'Logout yalalalala'
					}
				,	'/api/jperez/logout'
				).get_document()
			}
		)
	}
)
