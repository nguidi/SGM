steal(
	'sigma/hal/store.js'
,	'underscore'
,	'sigma/hal/hal_builder.js'
).then(
	'sgm-nodejs/lib/spec-transform.js'
,	function()
	{
		Sigma.fixtures
		.transformers
		=	Sigma.portable
			.make_transformers(_,Sigma.fixtures.hal_builder)
	}
)
