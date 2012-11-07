Sigma.Media
.Body
=	can
	.Control(
		{
			defaults:
				{
					title:'3'
				,	view:'//sigma/stream/views/body.ejs'
				,	css:
						{
						}
				}
		}
	,	{
			init:
				function(element,options)
				{
				/*
					this.options.data
					=	this.options.data.isComputed
							?this.options.data
							:can.compute(this.options.data)
				*/
				var	SC=
						function(el,subitems)
						{
							el.data('subitems',subitems)
							new	Sigma.Media.Control(el,{data: subitems})
						}
				var	$body=
						element
						.html(
							can.view(
									this.options.view
								,	this.options.data
								,	{
										SubitemsControl : SC	
									}
							)
						)
						.find('.media-body')
						//.addClass('pull-'+this.options.align)
						.css(this.options.css )
				}
		}
	)

