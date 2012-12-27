steal(
	'sigma/stock/controls/hovercard'
,	'sigma/stock/controls/hovercard/adapters.js'
,	'sigma/stock/controls/hovercard/fixtures.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Hovercard"
		,	function()
			{
				var hovercardHTML = can.$('<div id="hovercard"><a class="hovercard">')
				
				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Hovercard.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'hovercard':
								{
									Handler: Sigma.Controls.Hovercard
								,	options: {
										target: '.hovercard'
									,	view: '//stock/views/hovercard/hovercard.mustache'
									}
								}
							}
						}
					}
				,	{}
				)

				var hovercard_container = new
					Sigma.Hypermedia.Hovercard.Container(
						hovercardHTML
					,	{
							id:'Hovercard'
						,	target: 'Hovercard'
						,	slot: Sigma.Model.HAL.Hovercard.getRoot('/hovercardDemo','hovercard')
						}
					)

				stop()
				hovercard_container.options.slot
					.then(
						function(hovercardData)
						{	
							start()

							equal(hovercardData.constructor.fullName,"Sigma.Model.HAL.Hovercard","Resource Generated")

							equal(hovercardHTML.find('.popover').length,0,'On Event Mouseout: HoverCard Disabled')

							stop()

							hovercardHTML
								.find('.hovercard')
								.trigger('mouseenter')

							setTimeout(
								function()
								{
									equal(hovercardHTML.find('.popover').length,1,'On Event Mouseenter: HoverCard Enabled')
									hovercardHTML
										.find('.hovercard')
										.trigger('mouseleave')
									setTimeout(
										function()
										{
											equal(hovercardHTML.find('.popover').length,0,'On Event Mouseout: HoverCard Disabled')
											start()
										}
									,	200
									)
								}
							,	100
							)
						}
					)
			}
		)
	}
)