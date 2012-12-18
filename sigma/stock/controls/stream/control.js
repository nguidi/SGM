Sigma.HypermediaControl(
	'Sigma.Hypermedia.Stream'
,	{
		defaults: {
			view_object: false
		,	view_body: false
		,	view_action: false
		}
	}
,	{
		_render_content: function(data)
		{
			var	existing=
					this.element.hasClass('media')
				||	this.element.hasClass('medias')
			,	is_list=
					(data.length > 0)
			,	tag=
					is_list
						?'<ul>'
						:'<div>'
			,	klass=
					is_list
						?'media-list'
						:'media'
				this.$media=
					existing
						?this.element
						:can.$(tag)
							.addClass(klass)
							.appendTo(this.element)
				this[
					is_list
						?'_render_medias'
						:'_render_media'
				](this.$media,data)
		}

	,	_render_medias:	function(element,slots)
		{	
			var self = this

			can.each(
				slots
			,	function(media)
				{
					this.options.container.constructor(
						can.$('<li>')
							.addClass('media')
							.addClass(media.identity())
							.appendTo(element)
					,	{
							id: self.generateMediaID(media)
						,	parent: this.options.container.options.id
						,	target: self.generateMediaID(media)
						,	slot: media
						}
					)
				}
			)
			
			return element
		}

	,	generateContainerID: function(media)
		{
			return this.options.container.options.id+'.'+can.capitalize(media.id).replace(' ','')
		}

	,	_render_media:	function(element,data)
		{
			can.each(
				[
					{
						control: Sigma.Hypermedia.Object
					,	class:'media-object'
					,	container: this.options.container
					,	view: this.options.view_object
					}
				,	{
						control: Sigma.Hypermedia.Body
					,	class:'media-body'
					,	container: this.options.container
					,	view: this.options.view_body
					}
				,	{
						control: Sigma.Hypermedia.Actions
					,	class:'media-actions'
					,	container: this.options.container
					,	view: this.options.view_action
					}
				]
			,	function(media)
				{
					new media.control(
						$('<div>')
							.addClass(media.class)
							.appendTo(element)
					,	{
							slot : data
						,	view : media.view
						,	container: media.container
						}
					)
				}
			)

			return	element
		}
	}
)