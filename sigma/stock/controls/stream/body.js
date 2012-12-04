Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults: {
			view : false
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