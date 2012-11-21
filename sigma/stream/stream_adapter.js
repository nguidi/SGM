var StreamAdapter = Sigma.Model.HAL.Resource(
	{
		align:'left'
	,	actions_rel: false
	}
	,	{
		getSubitems:function()
			{
			return	this.constructor.subitems_rel
				&&	this.embedded.attr(this.constructor.subitems_rel)
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
	}
)

StreamAdapter(
	'Sigma.Model.HAL.Resource.Stream'
	,	{
		subitems_rel:'comments'
	,	actions_rel: 'actions'
	,	getRoot: function(rel)
		{
			return this.Fetch('/comments',rel)
			//return this.model({_links:{self:{href:'/comments'}}}).Fetch('/comments',rel)
		}
	}
	,	{}
)

StreamAdapter(
	'Sigma.Model.HAL.Comments'
	,	{
		align:'right'
	,	actions_rel: 'actions'
	}
	,	{ }
)