steal(
	'sigma/hal/store.js'
,	function()
	{
        module('sigma/hal/store'
		,	{
				setup:
					function()
					{
						can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
						can.fixture('GET /instituciones-univ',steal.idToUri("//stock/fixtures/data/json/instituciones-univ.json").path)
					}
			}
		)
		test("Find & Filter"
		,	function()
			{
				stop();
			var	store
			=	new Sigma.fixtures
				.store( ['/provincias','/instituciones-univ'])
				store
				.then(
					function()
					{
						equal(this.prefetchs['/provincias'][0].id,'BUE','provincias OK')
						ok(this.prefetchs['/instituciones-univ'],'instituciones OK')
						equal(this.find('/provincias','id','BUE').id,'BUE','store.find OK')
						equal(this.filter('/instituciones-univ','provincia','BUE').length,8,'store.filter OK')
						start()
					}
				)
			}
		)
	}
)
