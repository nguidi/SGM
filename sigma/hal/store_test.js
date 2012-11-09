steal(
	'sigma/model/hal.js'
).then(
	'sigma/hal/store.js'
,	function()
	{
        module('sigma/hal/store')
		var assets_path = "../../fixtures/assets/"
		test("csv2json ajax convert"
		,	function()
			{
				stop();
			var	store= can.ajax(
						assets_path+"instituciones_ot.csv"
					)
					.then(
						function(items)
						{
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
					assets_path+"instituciones_ot.csv"
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
					assets_path+"instituciones_ot.csv"
				,	assets_path+"instituciones_univ.csv"
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
						assets_path+"provincias.csv"
					)
				,	assets_path+"instituciones_univ.csv"
				,	function(provincia, institucion)
					{
					return	institucion.provincia==provincia.id_provincia
					}
				,	function(item)
					{
						item.instituciones=item.joined
							delete	item.joined
						return	item
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
