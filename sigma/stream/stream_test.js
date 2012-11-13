steal(
	'sigma/media'
,	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/hal/hal_builder.js'
).then(
	function()
	{
		test(
			"Stream Hypermedia"
		,	function()
			{
				var actions = [{id: 'me-gusta', value:'Me Gusta', icon: 'thumbs-up'},{id:'plusone', value:'+1', icon: 'plus'}]

				var comments = 
					[
						{owner: 'TED', value: 'Hola Mi Nombre es Ted'}
					,	{owner: 'NERD', value: 'Hola Mi Nombre es Nerd'}
					,	{owner: 'Friky', value: 'Hola Mi Nombre es Friky'}
					]

				can.fixture(
					'GET /comments'
				,	function()
					{
						var genActions = function(url) 
						{
							return can.map(
								actions
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

						return	
							can.map(
								comments
							,	function() 
								{
									return 
										new Sigma.fixtures
											.hal_builder(
												{
													title: coment.owner
												,	icon:'sitemap'
												,	description: coment.owner+':'+coment.value
												}
											,	'/comments'
											).link(
												{
													'actions': genActions('/comments'+coment.owner)
												}
											).get_document()
								}
							)					
					}
				)

				var StreamAdapter = Sigma.Model.HAL.Resource(
					{
						align:'left'
					,	actions_rel: false
					}
				,	{
						getActions:function()
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
						getRoot: function()
						{
							return this.model({_links:{self:{href:'/comments'}}}).Fetch()
						}
					}
				,	{}
				)

				$('body').append('<div id="streamContainer"></div>')

				Sigma.HypermediaControl(
					'Sigma.Hypermedia.Stream'
				,	{
						defaults: {}
					}
				,	{
						init: function(element,options)
						{
							var	existing=
									element.hasClass('media')
								||	element.hasClass('medias')
							,	is_list=
									(this.options.data.length > 0)
									//can.isArray(this.options.data)
									//(this.options.data() instanceof can.Observe.List)
							,	tag=
									is_list
										?'<ul>'
										:'<div>'
							,	klass=
									is_list
										?'medias'
										:'media'
								this.$media=
									existing
										?element
										:$(tag)
											.addClass(klass)
											.appendTo(this.element)
								this[
									is_list
										?'_render_medias'
										:'_render_media'
								](this.$media,this.options.data)
						}
					,	_render_medias:	function(element,data)
						{	
							var	self=this
							return	element
								.list(
									{
										loading : function() { return 'Cargando'; }
									,	empty : function() { return 'Nada!' }
									,	view:function(data)
											{
											var	element
													=$('<li>')
													.addClass(data.identity())
													.addClass('media')
													//.css({border:'1px dashed green'})
											//return	self._render_media(element,data)
													new	Sigma.Media.Control(element,{data:data})
											return	element
											}
									,	list:data
									}
								)
								//.css({border:'1px dashed red'})
						}
					,	_render_media:	function(element,data)
						{
							element.addClass(data.identity())
							this.media_controls = can.map(
								[
									{
										control:Sigma.Media.Object
									,	class:'media-object'
									}
								,	{
										control:Sigma.Media.Body
									,	class:'media-body'
									}
								,	{
										control:Sigma.Media.Action
									,	class:'media-actions'
									}
								]
							,	function(opt)
								{
									return	new
										opt.control(
											$('<div>')
												.addClass(opt.class)
												.appendTo(element)
										,	{data:data}
										)
								}
							)
							return	element
						}
					}
				)

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Stream.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'stream':{
										Handler: Sigma.Hypermedia.Stream
									,	options:{
											target: 'Stream'
										}
									}
							}
						}
					,	setup: function()
						{
							this._instance=false
							return	this._super.apply(this,arguments)
						}
					}
				,	{
						setup: function(el,options)
						{
							this.constructor._instance=this
							return	this._super(el,options)
						}
					}
				)

				var stream_container = new Sigma.Hypermedia.Stream.Container(
					$('#streamContainer')
				,	{
						id:'Stream'
					,	target: 'Stream'
					,	slot: Sigma.Model.HAL.Resource.Stream.getRoot()
					}
				)

				ok(true)
			}
		)
	}
)