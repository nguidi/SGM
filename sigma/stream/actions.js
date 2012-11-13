Sigma.HypermediaControl(
	'Sigma.Hypermedia.Action'
,	{
		defaults: 
		{
			title:'3'
		,	view:'//sigma/stream/views/actions.ejs'
		,	css:
				{	
					'font-size':'20px'
				,	'padding':'5px'
				,	'border-radius':'5px'
				}
		,	css_list:
				{
					'float':'right'
				,	'list-style-type': 'none'
				}
		}
	}
,	{
		init: function(element,options)
		{			
			var self = this
			var AC = function(el,actions)
			{
				el.data('actions',actions)
				return	el
					.list(
						{
							loading : function() { return 'Cargando'; }
						,	empty   : function() { return 'Nada!' }
						,	view    : function(action) //can.view('//sigma/stream/views/action.ejs')
							{	
								var li = 
									$('<li>')
										.append(can.view('//sigma/stream/views/action.ejs',action))
										.css(self.options.css_list)
										//.addClass(action.identity())
								return li
							}
						,	list    : actions
						}
					)
			}

			var $body = element
					.html(
						can.view(
							this.options.view
						,	this.options.data
						,	{
								ActionsControl : AC
							}
						)
					)
		}
	}
)