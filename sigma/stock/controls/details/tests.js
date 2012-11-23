steal(
<<<<<<< HEAD:sigma/details_view/details_view_test.js
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/details_view/details_view_fixture.js'
,	'sigma/details_view/details.js'
,	'sigma/details_view/drilldown.js'
,	'sigma/details_view/comments.js'
,	'sigma/media/media.css'
,	'sigma/media/stream_adapter.js'
,	'sigma/media/stream_mustache.js'
,	'sigma/media/stream_mustache.css'
,	'can/view/mustache'
=======
	'sigma/stock/controls/details'
,	'sigma/stock/controls/details/fixtures.js'
>>>>>>> 42e059e8a766a4eb1a478f34f6fbc7592fc998d9:sigma/stock/controls/details/tests.js
).then(
	function()
	{
		test(
			"Vista Detalle - Details"
		,	function()
			{

				Sigma.Model.HAL.Resource(
					'Sigma.Model.HAL.Resource.Details'
				,	{
						getRoot: function()
						{
							return this.Fetch('/streamView')
						}
					}
				,	{}
				)

				var details = can.$('<div id="detailsContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.DetailsView.Container'
				,	{
						defaults:
						{
							media_types:
							{
								
								'stream': 
								{
									Handler: Sigma.Hypermedia.Stream
								,	options:
									{
										target: 'stream'
									}
								}
							,	'details':
								{
									Handler: Sigma.Hypermedia.Details
								,	options:
									{
										target: 'details'
									}
								}
							,	'drilldown':
								{
									Handler: Sigma.Hypermedia.DrillDown
								,	options:
									{
										target: 'drilldown'
									}
								}
							,	'comments':
								{
									Handler: Sigma.Hypermedia.Comments
								,	options:
									{
										target: 'comments'
									}
								}
							}
						}
					}
				,	{
					}
				)

				details_container = new Sigma.Hypermedia.DetailsView.Container(
					details
				,	{
						id:'Details'
					,	target: 'Details'
					,	slot: Sigma.Model.HAL.Resource.Details.getRoot()
							.pipe(
								function(raw)
								{//solo para el caso de root hay que explicitar el rel (buscar algo mas consistente/elegante)
									raw.rel='details'
								return	raw
								}
							)
					}
				)

				stop()
				details_container.options.slot
				.then(
					function(data)
					{
						start()
						ok(details.find('div.hc_generic:contains("Hola")'),"Hola Generado")
					}
				)

			}
		)
	}
)
