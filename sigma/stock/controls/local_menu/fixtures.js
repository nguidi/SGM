steal(
	'can/util/fixture'
,	'sigma/hal/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/localmenu'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
							}
						,	'/api/localmenu'
						).link(
							{
							menu: [	
									{href:'/api/localmenu/opt1', title: 'Opcion 1', name: 'opt1'}
								,	{href:'/api/localmenu/opt2', title: 'Opcion 2', name: 'opt2'}
								,	{href:'/api/localmenu/opt3', title: 'Opcion 3', name: 'opt3'}
								,	{href:'/api/localmenu/opt4', title: 'Opcion 4', name: 'opt4'}
								,	{href:'/api/localmenu/opt5', title: 'Opcion 5', name: 'opt5'}
								,	{href:'/api/localmenu/opt6', title: 'Opcion 6', name: 'opt6'}
								,	{href:'/api/localmenu/opt7', title: 'Opcion 7', name: 'opt7'}
							]
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt1'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 1'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt1'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt2'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 2'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt2'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt3'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 3'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt3'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt4'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 4'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt4'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt5'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 5'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt5'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt6'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 6'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt6'
						).get_document()
			}
		)

		can.fixture(
			'GET /api/localmenu/opt7'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'Opcion 7'
							,	desc: 'Yalalalala'
							}
						,	'/api/localmenu/opt7'
						).get_document()
			}
		)

	}
)