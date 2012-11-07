steal(
	'sigma/lib/hal'
,	function()
	{
		can.Construct('Sigma.fixtures')
		can.Construct(
			'Sigma.fixtures.hal_builder'
		,	{}
		,	{
				init:
					function(aData,uri)
					{
						this.resource
						=	new	hal.Resource(aData,uri)
					}
			,	link:
					function(aLink, isTrue)
					{
					var	self=this
						if(isTrue==false)
						return	this
						can.each(
							aLink
						,	function(item,key)
							{
								if (Object.prototype.toString.apply(item) === '[object Array]')
									can.each(
										can.map(
											item
										,	function(plurallink)
											{
												var newObject = new Object()
												newObject[key] = plurallink
												return newObject
											}
										)
									,	function(singlelink) {
											self.link(singlelink)
										}
									)
								else {
									self.resource
									.link(key,item)
								}
							}
						)
					return	this
					}
			,	embedded:
					function(anEmbedded)
					{
					var	self=this
						can.each(
							anEmbedded
						,	function(item,key)
							{
								self.resource
								.embed(
									key
								,	(
										can.isArray(item)
												?can.map(
													item
												,	function(i)
													{
													return	i.resource
													}
												)
												:item.resource
									)
								)
							}
						)
					return	this
					}
			,	get_document:
					function()
					{
					return	this.resource.toJSON()
					}
			}
		)
	}
)
