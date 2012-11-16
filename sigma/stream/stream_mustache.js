Sigma.HypermediaControl(
	'Sigma.Hypermedia.Stream.Mustache'
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
					(this.options.slot.length > 0)
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
						:can.$(tag)
							.addClass(klass)
							.appendTo(this.element)
				this[
					is_list
						?'_render_medias'
						:'_render_media'
				](this.$media,this.options.slot)
		}

	,	_render_medias:	function(element,slot)
		{	
			console.log('_render_medias',element,data)
			return element.list(
					{
						loading:function() { return 'Cargando'; }
					,	empty: 	function() { return 'Nada!' }
					,	view: 	function(data)
							{
								return 	can.$('<li>')
										.addClass(data.identity())
										.addClass('media')
										.append(
											can.view('//sigma/stream/views/all.mustache', data)
										)
							}
					,	list:slot
					}
				)
		}

	,	_render_media:	function(element,data)
		{
			return	element.append(can.view('//sigma/stream/views/all.mustache', data))
		}
	}
)