steal(
	'sigma/model/hal.js'
).then(
	'sigma/hal/store.js'
,	function()
	{
        module('sigma/hal/store')
		test("csv2json ajax convert"
		,	function()
			{
				stop();
			var	store= can.ajax(
						"hal/fixtures/items.csv"
					)
					.then(
						function(items)
						{
							console.log(items)
							ok(items,'OK')
							start()
						return	items
						}
					)
			}
		)
		test("Store-Deferreds-get"
		,	function()
			{
				stop();
			var	store
			=	Sigma.fixtures
				.store
				.get(
					"hal/fixtures/items.csv"
				).then(
					function(items)
					{
						ok(items,'OK')
						start()
					return	items
					}
				)
			}
		)
		test("Store-Deferreds-union"
		,	function()
			{
				stop();
			var	store
			=	Sigma.fixtures
				.store
				.union(
					"hal/fixtures/items.csv"
				,	"hal/fixtures/mas-items.csv"
				).then(
					function(items)
					{
						ok(items,'OK')
						start()
					return	items
					}
				)
			}
		)
		test("Store-Deferreds-join"
		,	function()
			{
				stop();
			var	join
			=	Sigma.fixtures
				.store
				.join(
					Sigma.fixtures
					.store
					.get(
						"hal/fixtures/provincias.csv"
					)
				,		"hal/fixtures/instituciones-univ.csv"
				,	function(provincia, institucion)
					{
					return	institucion.provincia==provincia.id_provincia
					}
				).pipe(
					function(provincias)
					{
					return can
						.map(
							provincias
						,	function(provincia)
							{
								provincia.instituciones=provincia.joined
								delete	provincia.joined
							return	provincia
							}
						)
					}
				)
				.then(
					function(items)
					{
						ok(items[0].joined==undefined,'joined undefined OK')
						ok(items[0].instituciones,'instituciones OK')
						start()
					}
				)
			}
		)
	}
)
