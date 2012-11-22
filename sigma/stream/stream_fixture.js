steal(
	'sigma/hal/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /comments'
		,	function()
			{
			var	genActions
			=	function(url)
				{
				return can
					.map(
						[
							{id: 'me-gusta', value:'Me Gusta', icon: 'thumbs-up'}
						,	{id:'plusone', value:'1', icon: 'plus'}
						]
					,	function(action)
						{
						return	{
								title: action.value
							,	icon: action.icon
							,	align: 'right'
							,	href: url+'/actions/'+action.id
							}
						}
					)
				}
			var	genComments
			=	function()
				{
				return	can
					.map(
						[
							{owner: 'TED', value: 'Hola Mi Nombre es Ted'}
						,	{owner: 'NERD', value: 'Hola Mi Nombre es Nerd'}
						,	{owner: 'Friky', value: 'Hola Mi Nombre es Friky'}
						]
					,	function(comment)
						{
						return  new Sigma.fixtures
							.hal_builder(
								{
									title: comment.owner
								,	icon:'sitemap'
								,	description: comment.owner+':'+comment.value
								}
							,	'/comments'+'/'+comment.owner
							).link(
								{
									'actions': genActions('/comments'+'/'+comment.owner)
								}
							)
						}
					)
				}
			return	new Sigma.fixtures
				.hal_builder(
					{ }
				,	'/stream'
				).link(
					{
					'comments':
						{
						href:'/comments'
						}
					}
				).embedded(
					{
					'comments': genComments()
					}
				).get_document()
			}
		)
	}
)
