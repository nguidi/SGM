steal(
	'sigma/lib/parseuri.js'
,	'sigma/lib/uritemplates.js'
,	'sigma/lib/hal'
,	'sigma/hal/hal_builder.js'
,	'sigma/hal/store.js'
).then(
	function()
	{
		Sigma.fixtures=Sigma.fixtures||{}
		Sigma.fixtures.collectionsFixturator
		=	function(collection_dfd)
			{
			return collection_dfd
				.then(
					function(collection)
					{
					var generator
					=	function(original)
						{
						var	parsed
							=	parseUri(original.url)
						,	current_page
							=	parseInt(parsed.queryKey.page)||undefined
						,	items_per_page
							=	parseInt(parsed.queryKey['items-per-page'])||10
						,	name
							=	parsed.path.split('/').pop()
								return	 Sigma.fixtures
									.getPage(
										collection
									,	{
											currentPage:current_page
										,	itemsPerPage:items_per_page
										,	collectionUrl:'/'+name
										}
									)
						}
						can.fixture("GET /"+collection.name ,	generator)
						can.fixture("GET /"+collection.name+"?page={p}" ,	generator)
						can.fixture("GET /"+collection.name+"?page={p}&items-per-page={ipp}" ,	generator)
						can.fixture("GET /"+collection.name+"?items-per-page={ipp}" ,	generator)
					}
				)
			}
		Sigma.fixtures.getCollection
		=	function(uri)
			{
				var assets_path = "hal/fixtures/", ext = ".csv"
				var	data
						=parseUri(uri)
				,	name
						=data.directory.match(/\/?([^\/]*)/)[1]
				return Sigma.fixtures.store.get(assets_path+name+ext)
					.pipe(
						function(results)
						{
						return	{
								name:name
							,	items: results
							}
						}
					)
			}
		Sigma.fixtures.getPage
		=	function(collection,options)
			{
				var	current_page
						=options.currentPage||1
				,	items_per_page
						=options.itemsPerPage||20
				,	start
						=(current_page-1)*items_per_page
				,	next_page
						=1+current_page
				,	prev_page
						=current_page-1
				,	end
						=start+items_per_page
				,	url
						=uritemplate(options.collectionUrl+'{/id}{?page,items-per-page}')
				,	last_page
						=(collection.items.length+items_per_page-1)/items_per_page
				,	self
						={self:{href:url.expand({page:(current_page!=1)?current_page:null})}}
				,	next
						={next:{href:url.expand({page:next_page,'items-per-page':items_per_page})}}
				,	prev
						={prev:{href:url.expand({page:prev_page,'items-per-page':items_per_page})}}
				,	links
						=self
				,	gen_items
						=function(start,end)
						{
						return	can.map(
								collection.items
							,	function(item,index)
								{
								return	new Sigma.fixtures
									.hal_builder(
										item
									,	url.expand({id:index})
									)
								}
							).slice(start,end)
						}
				return	new Sigma.fixtures
					.hal_builder({},self.href)
					.link({self:{href:url.expand({})}})
					.link(prev,prev_page>0)
					.link(next,next_page<=last_page)
					.embedded(
						{'collection':
							gen_items(start,end)
						}
					)
					.get_document()
			}
	}
)
