steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'HovercardAdapter'
		,	{
				align:'left'
			,	action_align: 'right'
			,	subitems_rel: false
			,	actions_rel: false
			,	hovercard_rel : false
			,	handlers: false
			}
		,	{
				getSubitems:function()
					{
					return	this.constructor.subitems_rel
						&&	this.embedded.attr(this.constructor.subitems_rel)
					}
			,	getHovercard:function()
					{
					return	this.constructor.hovercard_rel
						&&	this.embedded.attr(this.constructor.hovercard_rel)
					}
			,	getActions:function()
					{
					return	this.constructor.actions_rel
						&&	this.links.attr(this.constructor.actions_rel)
					}
			,	getAlign:function()
					{
					return	this.constructor.align
					}
			,	getHref:function()
					{
					return	this.links.attr('self.href')
					}
			,	getIcon:function()
					{
					return	this.icon
					||	(
							(this._init!=1)
						&&	this.links.attr('self.icon')
						)
					||	'bolt'
					}
			,	getText:function()
					{
					return	this.attr('description')
					}
			,	getHandler:function()
					{
					return	this.constructor.handlers
					}
			}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Resource.HStream'
		,	{
				subitems_rel:'hposts'
			,	getRoot: function(rel)
					{
						return this.Fetch('/hposts',rel)
					}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.HPosts'
		,	{
				subitems_rel:'hcomments'
			,	actions_rel: 'hactions'
			,	hovercard_rel: 'hovercard'
			,	handlers: 
				{
					'hovercard' : 
					{
						control: 'Hovercard'
					}
				}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.HComments'
		,	{
				actions_rel: 'hactions'
			,	hovercard_rel: 'hovercard'
			,	handlers: 
				{
					'hovercard' : 
					{
						control: 'Hovercard'
					,	target: '.hovercard'
					,	view: '//stock/views/hovercard/hovercard.mustache'
					}
				}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Hovercard'
		,	{
			getRoot: function(url,rel)
				{
					return this.Fetch(url,rel)
				}
			}
		,	{}
		)
	}
)
