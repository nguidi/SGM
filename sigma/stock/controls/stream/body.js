Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults: {
			view : '//sigma/stock/controls/stream/views/body.mustache'
		}
	}
,	{
		init: function(element,options)
		{
			element.addClass('media-box')

			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)

			if (options.data.attr('subitems') && options.data.attr('subitems').length > 0 ) {
				new Sigma.Hypermedia.Stream(
					element
				,	{ 
						slot: options.data.attr('subitems')
					}
				)
			}

		}
	}
)