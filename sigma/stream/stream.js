steal(
	'sigma/media'
,   'sigma/lib/style.js'
,	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/hal/hal_builder.js'
).then(	function()
	{

	var	lorem
	=	function()
		{
		return	can.fixture.rand(
					[
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					,	'Aenean in lacus enim, id bibendum lorem.'
					,	'Aenean sit amet eros vel tellus pellentesque sagittis non scelerisque elit.'
					,	'Proin a sapien nec eros pulvinar vestibulum.'
					,	'Sed viverra mollis ipsum, non auctor magna pharetra eget.'
					,	'Donec tempor faucibus sapien, sed pharetra mauris suscipit sit amet.'
					]
				,	1
				,	1
				)[0]
		}
		can.fixture(
				'GET /institutions'
			,	function()
				{
				var	gen_actions
				=	function(url)
					{
					return	can.map(
								[
									{
										id: 'me-gusta'
									,	text: 'Me Gusta'
									, 	icon: 'thumbs-up'
									}
								,	{
										id: 'comentar'
									,	text: 'Comentar'
									, 	icon: 'plus'
									}
								]
							,	function(raw)
								{
									return 	{
											title: raw.text
										,	icon: raw.icon
										,	align: 'right'
										,	href: url+'/actions/'+raw.id
										}
								}
							)
					}
				var	gen_societies
				=	function()
					{
					return	can.map(
								can.fixture.rand(
									['TS','SIDE','TPC','TSO','TSC']
								,	2
								,	5
								)
							,	function(raw)
								{
								return	new Sigma.fixtures
										.hal_builder(
											{
												title:
													can.sub(
														'{sigla}'
													,	{
															sigla:raw
														}
													)
											,	icon:'globe'
											,	description:
													can.sub(
														'{sigla}: {lorem}'
													,	{
															sigla:	raw
														,	lorem: lorem()
														}
													)
											}
										,	'/societies/'+raw
										).link(
											{
												'institutions':{href:'/institutions'}
											}
										).embedded(
											{'institutions':gen_institutions()}
										)
								}
							)
					}
				var	gen_institutions
				=	function()
					{
					return	can.map(
								can.fixture.rand(
									['FINMA','SITU','APU','APRE','EXOM']
								,	3
								,	5
								)
							,	function(raw)
								{
								return	new Sigma.fixtures
										.hal_builder(
											{
												title:
													can.sub(
														'{sigla}'
													,	{
															sigla:raw
														}
													)
											,	icon:'sitemap'
											,	description:
													can.sub(
														'{sigla}: {lorem}'
													,	{
															sigla:	raw
														,	lorem: lorem()
														}
													)
											}
										,	'/institutions/'+raw
										).link(
											{
												'actions': gen_actions('/institutions/'+raw)
											}
										)
								}
							)
					}
				return	new Sigma.fixtures
						.hal_builder(
							{
							}
						,	'/institutions'
						).link(
							{
								'societies':{href:'/societies'}
							}
						).embedded(
							{'societies':gen_societies()}
						).get_document()
				}
			)
	var	StreamAdapter
	=	Sigma.Model.HAL.Resource(
			{
				align:'left'
			,	subitems_rel:false
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
				/*
			,	getTitle:function()
					{
					return	this.attr('title')
					}
				*/
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
			'Sigma.Model.HAL.Societies'
		,	{
				align:'left'
			,	subitems_rel:'institutions'
			,	actions_rel: 'actions'
			}
		,	{ }
		)
		StreamAdapter(
			'Sigma.Model.HAL.Institutions'
		,	{
				align:'right'
			,	actions_rel: 'actions'
			}
		,	{ }
		)
		StreamAdapter(
			'Sigma.Model.HAL.Root'
		,	{
				align:'left'
			,	subitems_rel:'societies'
			,	getRoot: function(url)
					{
					return	this.model({_links:{self:{href:url}}}).Fetch()
							/*
							.pipe(
								function(raw)
								{//solo para el caso de root hay que explicitar el rel (buscar algo mas consistente/elegante)
									raw.rel='root'
								return	raw
								}
							)
							*/
					}
			}
		,	{
			}
		)
		var the_root = Sigma.Model.HAL.Root.getRoot('/institutions')
		the_root
		.done(
			function(data)
			{
				console.dir(data)
				new Sigma.Media.Control(
						$('#stream')
					,	{data:data}
				)
			}
		)
	}
)

