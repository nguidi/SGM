steal(	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		can.Control(
			'Sigma.HypermediaContainer'
		,	{
				defaults:{
						resource: undefined
					,	slot: false
					,	render:{
							loading:
								function(message)
								{
									this.element.html(can.EJS({text:'cargando...'})(message))
								}
						,	empty:
								function()
								{
									this.element.html(can.EJS({text:'vacio...'})())
								}
						,	fail:
								function()
								{
									this.element.html(can.EJS({text:'fail...'})())
								}
						}
					,	media_types:{}
					,	default_media_type:{
									Handler:Sigma.HypermediaControl
								}
					}
			,	containers:{}
			,	findContainer:
					function(container_id)
					{
					return	this.containers[container_id]
					}
			,	registerContainer:
					function(container)
					{
						if(this.containers[container.options.id])
							throw can.sub('Container "{id}" already registered',container)
						this.containers[container.options.id]=container
					}
			}
		,	{
				init:	function(el,options)
					{
						if(!options.id)
							throw 'Container must have an "id" property'
						this.constructor.registerContainer(this)
						this.update()

					}
			,	update:	function(options)
					{
						this._super(options)
					var	resource=this.options.slot
						if(resource && resource.isComputed)
							resource=resource()
						this._update(resource)
					}
			,	_update:
					function(resource)
					{
						if(can.isDeferred(resource))
						{
							this.proxy(this.options.render.loading,'')
							resource.done(this.proxy(this._update))
							resource.fail(this.proxy(this.options.render.fail,''))
						}
						else	if(resource)
							{
								this.current_control=false
								this.set_resource(resource)
								this.on()
								//this.proxy(this.options.render.content,'')
								this.render_resource(this.options.resource)
							}
							else
							{
								this.current_control=false
								this.set_resource(resource)
								this.on()
								//this.proxy(this.options.render.content,'')
								this.proxy(this.options.render.empty,'')
							}

					}
			,	set_resource:
					function(resource)
					{
					var	self=this
						if(
							(resource instanceof Sigma.Model.HAL.Resource.List)
						)	throw	'Resource.List not suported in containers'
						if(
							(resource instanceof Sigma.Model.HAL.Resource.List)
						||	(resource instanceof Sigma.Model.HAL.Resource)
						)
							this.options.resource=resource
						else
						{
							//this.options.resource=resource
							throw	'Wrong resource type!!!'
						}
					}
			,	getRelationHandler:
					function(resource)
					{
						//relation/profile -> semantic/meaning mapping logic here, please
					return	this.options.media_types[resource.rel]
					||(
						resource.links._profile
							?this.options.media_types[resource.links._profile.href]
							:this.options.default_media_type
					)||	{
							Handler:Sigma.HypermediaControl
						,	options:{
								resource: can.compute({})
							,	target: this.options.target
							}
						}
					}
			,	getRelationTarget:
					function(target_name)
					{
					return	target_name
					||	this.options.target
					}
			,	render_resource:
					function(resource_to_render)
					{
					var	self=this
					var	self_rel=this.getRelationHandler(resource_to_render)
						if(this.container_element)
							this.container_element.remove()
						this.container_element=	$('<div>').appendTo(this.element)
						new	self_rel.Handler(
								this.container_element
							,	can.extend(
									self_rel.options||{}
								,	{
										container: this
									,	target: self_rel.options.target
									,	slot: resource_to_render//this.options.resource
									}
								)
							)
					}
			,	browse:
					function(link)
					{
						this.slot(
							link.fetch()
							.pipe(
								function(raw)
								{
									raw.rel=link.rel
								return	raw
								}
							)

						)
					}
			,	slot:
					function(value)
					{
						if(!value)
						return	this.options.resource
						this.update(
							{
								slot: value
							}
						)
					}
			,	'{slot} change':
					function(target, ev, newVal)
					{
						if( target.isComputed )
							this._update(newVal)
					}
			,	' browse':
					function(el,ev,data)
					{
						this.constructor
						.findContainer(this.getRelationTarget(data.target))
						.browse(
							Sigma.Model.HAL.lookup(
								data.links
							,	data.rel
							,	data.name
							)
						)
					}

			}
		)
	}
)
