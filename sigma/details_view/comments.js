Sigma.HypermediaControl(
	'Sigma.Hypermedia.Comments'
,	{
		defaults: {}
	}
,	{
		init: function(element,options)
		{
			console.log('REPLY',element,options)
			element.append('Comments')
		}
	}
)