Sigma.HypermediaControl(
	'Sigma.Hypermedia.Object'
,	{
		defaults: {
			view : '//sigma/stock/controls/stream/views/object.mustache'
		}
	}
,	{
		init: function(element,options)
		{
			var icon_align = (options.data.attr('icon_align')) ? options.data.attr('icon_align') : 'left'

			element.addClass('pull-'+icon_align)

			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)
		}
	}
)