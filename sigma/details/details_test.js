steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/details/details_fixture.js'
,	'sigma/details/details.js'
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
							return this.model({_links:{self:{href:'/details'}}}).Fetch()
						}
					}
				,	{}
				)

				var details = can.$('<div id="detailsContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Details.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'details':
								{
									Handler: Sigma.Hypermedia.Details
								,	options:
									{
										target: 'details'
									}
								}
							}
						}
					}
				,	{
					}
				)

				var details_container = new Sigma.Hypermedia.Details.Container(
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