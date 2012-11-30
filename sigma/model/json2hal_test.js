steal(
	'sigma/model/hal.js'
,	'sigma/lib' // /fixtures.js'
,	'sigma/hal/store.js'
,	'sgm-nodejs/spec-transform.js'
).then(
	function()
	{
		module(
			"sigma/model/json2hal"
		,	{
				setup:
					function()
					{
						can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/provincias.json").path)
						can.fixture('GET /instituciones-univ',steal.idToUri("//stock/fixtures/instituciones-univ.json").path)
					}
			}
		)
		test(
			"transform"
		,	function()
			{
				stop();
				var	spec
				=	{
						"/provincias":
							{
								"institutions":
										{
											"embeded":"/instituciones-univ"
										,	"embeded_key":"provincia"
										}
							}
					,	"/instituciones-univ":
							{
								"provincia":
									{
										"key":"provincia"
									,	"embeded":"/provincias"
									,	"embeded_key":"id"
									}
							,	"provincia_link":
									{
										"key":"provincia"
									,	"linked":"/provincias"
									,	"linked_key":"id"
									}
							}
					}
				,	store
				=	new Sigma.fixtures
					.store( ['/provincias','/instituciones-univ'])
					store.then(
						function()
						{
						var	transformers
						=	spec_transform.make_transformers(_,store,spec)
						,	provincia
						=	transformers['/provincias'](this.prefetchs['/provincias'][0])
							ok(provincia,'OK')
							equal(provincia.id,'BUE','provincia.id OK')
							equal(provincia.institutions.length,8,'provincia.intitutions OK')
							equal(provincia.institutions[0].id,'UDESA','provincia.intitutions embeded OK')
							start()
						}
					)
			}
		)
	}
)
