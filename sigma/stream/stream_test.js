steal(
	'sigma/lib/hypermedia.js'
).then(
	function()
	{
		test(
			"Stream Hypermedia"
		,	function()
			{
				Sigma.HypermediaControl(
					'Sigma.Hypermedia.Stream'
				,	{}
				,	{}
				)
				ok(true)
			}
		)
	}
)