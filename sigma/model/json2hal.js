steal(
	'sigma/hal/store.js'
,	'underscore'
).then(
	'sgm-nodejs/lib/spec-transform.js'
,	function()
	{
		Sigma.fixtures
		.transformers
		=	Sigma.portable
			.make_transformers(_)
	}
)
