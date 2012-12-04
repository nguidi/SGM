steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Hovercard'
		,	{
				defaults:{
					view: false
				}
			}
		,	{
				init: function(element,options)
				{
					can.append(
						this.element
					,	can.$('<div class="content">')
					)

					can.append(
						this.element
					,	can.$('<div class="links">')
					)					

					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	this.options.slot
						)
					)

					can.append(
						this.element
							.find('div.links')
					,	can.view(
							this.options.view_links
						,	this.options.slot
						)
					)
				}
			}
		)
	}
)