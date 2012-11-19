steal(
	'sigma/lib'
,	'sigma/lib/style.js'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/media/stream_fixture.js'
,	'sigma/media/stream_adapter.js'
,	'sigma/media'
).then(	
	function()
	{

		Sigma.HypermediaContainer(
			'Sigma.Hypermedia.Stream.Container'
		,	{
				defaults:
				{
					media_types:
					{
						'comments':
						{
							Handler: Sigma.Hypermedia.Stream
						,	options:{
								target: 'comments'
							}
						}
					}
				}
			}
		,	{
			}
		)

		var stream_container = new Sigma.Hypermedia.Stream.Container(
			$('#stream')
		,	{
				id:'Stream'
			,	target: 'Stream'
			,	slot: Sigma.Model.HAL.Resource.Stream.getRoot()
					.pipe(
						function(raw)
						{//solo para el caso de root hay que explicitar el rel (buscar algo mas consistente/elegante)
							raw.rel='comments'
						return	raw
						}
					)
			}
		)
	}
)

