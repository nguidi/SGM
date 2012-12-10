steal(
	'sigma/model/hal.js'
,	'sigma/lib' // /fixtures.js'
,	'sigma/hal/store.js'
,	'sigma/model/json2hal.js'
).then(
	function()
	{
		module(
			"sigma/model/json2hal"
		,	{
				setup:
					function()
					{
						can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
						can.fixture('GET /instituciones-univ',steal.idToUri("//stock/fixtures/data/json/instituciones-univ.json").path)
					}
			}
		)
		test(
			"transform"
		,	function()
			{
				stop();
				can.when(
					new Sigma.fixtures
						.store(
							[
								{name:'provincias',url:'/provincias'}
							,	{name:'instituciones-univ',url:'/instituciones-univ'}
							]
						)
				,		can.ajax(
							'../sgm-nodejs/tools/test/specs/transforms.json'
						)
				).then(
					function(store,spec)
					{
							var	transformers
							=	Sigma.fixtures.transformers(store,spec[0])
							,	provincia
							=	transformers['provincias'](store.prefetchs.provincias[0])
								ok(provincia,'OK')
								equal(provincia._links.self.href,'provincias/BUE','provincia.id OK')
								equal(provincia._embedded['instituciones-univ'].length,8,'provincia.intitutions OK')
								equal(provincia._embedded['instituciones-univ'][0].id,'UDESA','provincia.intitutions embeded OK')
								start()
					}
				)
			}
		)
	}
)
