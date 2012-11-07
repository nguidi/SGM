steal(
	'sigma/media/object.js'
,	'sigma/media/body.js'
,	'sigma/media/actions.js'
).then(
	function()
	{
		Sigma.Media.Control
		=	can.Control(
				{
					init:
						function(element,options)
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
				,	_render_medias:
						function(element,data)
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
				,	_render_media:
						function(element,data)
						{
							element.addClass(data.identity())
							this
							.media_controls
							=	can.map(
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
	}
)
