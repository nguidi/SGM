steal('sigma/fixtures'
,	'sigma/hal/hal_builder.js'
).then(
	function()
	{
		can.fixture("GET /api/{username}"
		,	function(original)
			{
			var	profile
			=	Sigma.fixtures.getProfile(original)
			return	new Sigma.fixtures
				.hal_builder(
					{
						username:profile.username
					,	greeting:profile.greeting
					,	title: 'Home'
					}
				,	'/api/'+profile.username
				).link(
					{
						applications:
							Sigma.fixtures.genApplications(profile)
					,	dropdown: 
						[
							{href: '/api/'+profile.username+'/profile', title: 'Profile', name: 'profile'}
						,	{href: '/api/'+profile.username+'/config', title: 'Configuracion', name: 'config'}
						,	{href: '/api/'+profile.username+'/logout', title: 'Salir', name: 'logout'}
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
