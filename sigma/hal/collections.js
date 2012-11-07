steal(
	'sigma/lib/parseuri.js'
,	'sigma/lib/uritemplates.js'
,	'sigma/lib/hal'
,	'sigma/hal/hal_builder.js'
).then(
	function()
	{
		Sigma.fixtures.collectionsGenerator
			=	function(original)
				{
				var	parsed
						=parseUri(original.url)
				,	current_page
						=parseInt(parsed.queryKey.page)||undefined
				,	items_per_page
						=parseInt(parsed.queryKey['items-per-page'])||10
				,	name
						=parsed.path.split('/').pop()
				,	collection=Sigma.fixtures
							.getCollection('/'+name)
					//ANTENTI ACA
					collection.items=collection.items.slice(1,6)
					//ES para que queden 5 items (3 pages)
				return	Sigma.fixtures
					.getPage(
						collection
					,	{
							currentPage:current_page
						,	itemsPerPage:items_per_page
						,	collectionUrl:'/'+name
						}
					)
				}
			can.fixture("GET /institutions" ,	Sigma.fixtures.collectionsGenerator)
			can.fixture("GET /institutions?page={p}" ,	Sigma.fixtures.collectionsGenerator)
			can.fixture("GET /institutions?page={p}&items-per-page={ipp}" ,	Sigma.fixtures.collectionsGenerator)
			can.fixture("GET /institutions?items-per-page={ipp}" ,	Sigma.fixtures.collectionsGenerator)
		Sigma.fixtures.getCollection
		=	function(uri)
			{
				var	data
						=parseUri(uri)
					name
						=data.directory.match(/\/?([^\/]*)/)[1]
				return	{
							name:name
						,	items://Sigma.fixtures.store(name)
								can.map(
									['inst1','inst2','inst3','inst4','inst5','inst6','inst7']
								,	function(item)
									{
									return	{ nombre:item }
									}
								)
						}
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
