steal(
	'sigma/model/hal.js'
,	'sgm-nodejs/spec-transform.js'
).then(
	function()
	{
		module(
			"sigma/model/json2hal"
		,	{
			}
		)
		test(
			"transform"
		,	function()
			{
				//stop();
				var	spec
				=	{
						linked:
							{
							}
					,	embeded:
							{
							}
					}
				,	store
				=	{
						find:
							function()
							{
							}
					,	filter:
							function()
							{
							}
					}
				,	transformers
				=	spec_transform.make_transformers(can,store,spec)
			}
		)
	}
)
