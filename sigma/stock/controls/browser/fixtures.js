steal(
	'can/util/fixture'
,	'sigma/hal/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /browser'
		,	function()
			{
				var genOpenIds = function()
				{
				return can
					.map(
						[
							{	name:'facebook'
							,	title:'Facebook'
							}
						,	{	name:'google_plus'
							,	title:'Google+'
							}
						,	{	name:'linkedin'
							,	title:'LinkedIn'
							}
						,	{	name:'twitter'
							,	title:'Twitter'
							}
						]
					,	function(open_id)
						{
						return	{
								title: open_id.title
							,	icon: Sigma.fixtures.getIcon(open_id.name)
							,	href: '/browser/login/'+open_id.name
							}
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
							{
							}
						,	'/browser'
						).link(
							{
								login: 
								{
									href:'/browser/login'
								,	title:'Entrar'
								}
							,	open_ids:
									genOpenIds()
							}
						).get_document()
			}
		)

		can.fixture("GET /browser/login/{service}"
		,	function(orig,settings,headers)
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								greeting:'Juan Perez'
							,	username:'jperez'
							,	name:'session'
							,	title: 'Home'
							}
						,	orig.url
						).link(
							{	
								applications:
								[
									{href: '/browser/jperez/application/dashboards', title: 'Dashboard', name: 'dashboard', icon: 'dashboard'}
								,	{href: '/browser/jperez/application/notices', title: 'Notices', name: 'notices', icon: 'exclamation-sign'}
								,	{href: '/browser/jperez/application/profiles', title: 'Profile', name: 'profile', icon: 'user'}
								]
							,	dropdown: 
								[
									{href: '/browser/jperez/profile', title: 'Profile', name: 'profile'}
								,	{href: '/browser/jperez/config', title: 'Configuracion', name: 'config'}
								,	{href: '/browser/jperez/logout', title: 'Salir', name: 'logout'}
								]
							}
						).get_document()
			}
		)

		can.fixture("GET /browser/jperez/application/dashboards"
		,	function(orig)
			{
				return new Sigma.fixtures
						.hal_builder(
							{}
						,	'/browser/jperez/dashboard/sidebar'
						).link(	
							{
								menu:
								[	
									{href:'/browser/jperez/applications/dashboard/dashboard1', title: 'Dashboard 1', name: 'dashboard1'}
								,	{href:'/browser/jperez/applications/dashboard/dashboard2', title: 'Dashboard 2', name: 'dashboard2'}
								,	{href:'/browser/jperez/applications/dashboard/dashboard3', title: 'Dashboard 3', name: 'dashboard3'}
								,	{href:'/browser/jperez/applications/dashboard/dashboard4', title: 'Dashboard 4', name: 'dashboard4'}
								]
							}
						).get_document()
			}
		)

		can.fixture("GET /browser/jperez/application/notices"
		,	function(orig)
			{
				return new Sigma.fixtures
						.hal_builder(
							{}
						,	'/browser/jperez/application/notices'
						).link(
							{
								menu: 
								[	
									{href:'/browser/jperez/applications/notice/notices1', title: 'Notices 1', name: 'notices1'}
								,	{href:'/browser/jperez/applications/notice/notices2', title: 'Notices 2', name: 'notices2'}
								,	{href:'/browser/jperez/applications/notice/notices3', title: 'Notices 3', name: 'notices3'}
								]
							}
						).get_document()
			}
		)

		can.fixture("GET /browser/jperez/application/profiles"
		,	function(orig)
			{
				return new Sigma.fixtures
						.hal_builder(
							{}
						,	 '/browser/jperez/application/profiles'
						).link(
							{
								menu: 
								[	
									{href:'/browser/jperez/stream', title: 'Stream', name: 'stream'}
								,	{href:'/browser/jperez/config', title: 'Config', name: 'config'}
								]
							}
						).get_document()
			}
		)

		can.fixture("GET /browser/jperez/applications/dashboard/{dashboard}"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'dashboard '+orig.url.substr(orig.url.length - 1, 1)
					,	title: 'Dashboard '+orig.url.substr(orig.url.length - 1, 1)
					,	desc: 'Dash yalalalala'
					,	url: orig.url
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/applications/notice/{notices}"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'notices '+orig.url.substr(orig.url.length - 1, 1)
					,	title: 'Notices '+orig.url.substr(orig.url.length - 1, 1)
					,	desc: 'Notices yalalalala'
					,	url: orig.url
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/applications/profile/{profile}"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'profile '+orig.url.substr(orig.url.length - 1, 1)
					,	title: 'Profile '+orig.url.substr(orig.url.length - 1, 1)
					,	desc: 'Profile yalalalala'
					,	url: orig.url
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/profile"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'profile'
					,	title: 'Profile'
					,	desc: 'Profile yalalalala'
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/stream"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'stream'
					,	title: 'Stream'
					,	desc: 'Stream yalalalala'
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/config"
		,	function(orig)
			{
			return	new Sigma.fixtures
				.hal_builder(
					{
						id: 'config'
					,	title: 'Config'
					,	desc: 'Config yalalalala'
					}
				,	orig.url
				).get_document()
			}
		)

		can.fixture("GET /browser/jperez/logout"
		,	function(orig)
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