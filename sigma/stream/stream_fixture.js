can.fixture(
	'GET /comments'
,	function()
	{
		var genActions = function(url) 
		{
			return can.map(
				[
					{id: 'me-gusta', value:'Me Gusta', icon: 'thumbs-up'}
				,	{id:'plusone', value:'1', icon: 'plus'}
				]
			,	function(action)
				{
					return 	{
							title: action.value
						,	icon: action.icon
						,	align: 'right'
						,	href: url+'/actions/'+action.id
						}
				}
			)
		}

		var genComments = function() 
		{
			return	can.map(
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

		return  new Sigma.fixtures
				.hal_builder(
					{
					}
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

var StreamAdapter = Sigma.Model.HAL.Resource(
	{
		align:'left'
	,	actions_rel: false
	}
	,	{
		getSubitems:function()
			{
			return	this.constructor.subitems_rel
				&&	this.embedded.attr(this.constructor.subitems_rel)
			}
	,	getActions:function()
			{
			return	this.constructor.actions_rel
				&&	this.links.attr(this.constructor.actions_rel)
			}
	,	getAlign:function()
			{
			return	this.constructor.align
			}
	,	getHref:function()
			{
			return	this.links.attr('self.href')
			}
	,	getIcon:function()
			{
			return	this.icon
			||	(
					(this._init!=1)
				&&	this.links.attr('self.icon')
				)
			||	'bolt'
			}
	,	getText:function()
			{
			return	this.attr('description')
			}
	}
)

StreamAdapter(
	'Sigma.Model.HAL.Resource.Stream'
	,	{
		subitems_rel:'comments'
	,	actions_rel: 'actions'
	,	getRoot: function()
		{
			return this.model({_links:{self:{href:'/comments'}}}).Fetch()
		}
	}
	,	{}
)

StreamAdapter(
	'Sigma.Model.HAL.Comments'
	,	{
		align:'right'
	,	actions_rel: 'actions'
	}
	,	{ }
)