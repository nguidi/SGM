steal(
	'sigma/hal/collections.js'
).then(
	function()
	{
		module("sigma/hal/fixtures")
		test(
			"Collections"
		,	function()
			{
				stop()
			var	collection=Sigma.fixtures
						.getCollection('/institutions')
			var	page1=Sigma.fixtures
				.getPage(
					collection
				,	{
						currentPage:1
					,	itemsPerPage:2
					,	collectionUrl:'/institutions'
					}
				)
				ok(page1._links, "links OK");
				ok(page1._embedded, "embedded OK");
				ok(page1._links.next, "links.next OK");
				ok(page1._embedded.collection, "_embedded.items OK");
				equal(page1._embedded.collection[0]._links.self.href,'/institutions/0', "_embedded href OK");
				equal(page1._embedded.collection.length,2, "length OK");
				start()
			}
		)
		test(
			"Collections Models"
		,	function()
			{
				Sigma.Model.HAL.Resource
				(
					"Sigma.Model.HAL.Collection"
				,	{
						getRoot: function()
							{
							return	Sigma.Model.HAL.Collection.model({_links:{self:{href:'/institutions?items-per-page=2'}}}).Fetch()
							}
					}
				,	{ }
				)
				can.Model.List( 'Sigma.Model.HAL.Collection.List');
				var the_first = Sigma.Model.HAL.Collection.getRoot()
				stop()
				the_first.then(
					function(first)
					{
						stop()
						equals(first.constructor.fullName, "Sigma.Model.HAL.Collection", "links type ok");
						equals(first.embedded.collection.constructor.fullName, "Sigma.Model.HAL.Collection.List", "embedded type ok");
						ok(first.links.next, "first next OK");
						ok(!first.links.prev, "no first prev OK");
						equal(first.embedded.collection.length,2, "length OK");

						var the_next = first.links.next.fetch()
						the_next.then(
							function(next)
							{
								stop()
								equal(next.embedded.collection.length,2, "length OK");
								ok(next.links.next, "next next OK");
								ok(next.links.prev, "next prev OK");
								var the_last = next.links.next.fetch()
								the_last.then(
									function(last)
									{
										equal(last.embedded.collection.length,1, "length OK");
										ok(!last.links.next, "no last next OK");
										ok(last.links.prev, "last prev OK");
										start()
									}
								)
								start()
							}
						)
						start()
					}
				)
			}
		)
	}
)
