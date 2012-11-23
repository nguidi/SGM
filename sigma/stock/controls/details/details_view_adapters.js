Sigma.Model.HAL.Resource(
	'Sigma.Model.HAL.Resource.Details'
,	{
		getRoot: function(id)
		{
			return this.Fetch('/details/'+id,'details')
		}
	}
,	{}
)

Sigma.Model.HAL.Resource(
	'Sigma.Model.HAL.Resource.Comments'
,	{
		actions_rel: 'actions'
	,	getRoot: function(id)
		{
			return this.Fetch('/comments/'+id,'reply')
		}
	}
,	{
		getActions:function()
			{
			return	this.constructor.actions_rel
				&&	this.links.attr(this.constructor.actions_rel)
			}
		}
)

Sigma.Model.HAL.Resource(
	'Sigma.Model.HAL.Resource.DrillDown'
,	{
		getRoot: function(id)
		{
			return this.Fetch('/drilldown/'+id,'drilldown')
		}
	}
,	{}
)

var DetailsViewsAdapter
=	Sigma.Model.HAL.Resource(
		{
			align:'left'
		,	action_align: 'right'
		,	subitems_rel: false
		,	actions_rel: false
		}
,	{
		getSubitems:function()
			{
			return	this.constructor.subitems_rel
				&&	this.embedded.attr(this.constructor.subitems_rel)
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

DetailsViewsAdapter(
	'Sigma.Model.HAL.Resource.StreamView'
,	{
		subitems_rel:'posts'
	,	getRoot: function()
		{
			return this.Fetch('/streamView','stream')
		}
	}
,	{}
)

DetailsViewsAdapter(
	'Sigma.Model.HAL.Posts'
,	{
		subitems_rel:'comments'
	,	actions_rel: 'actions'
	}
,	{}
)

DetailsViewsAdapter(
	'Sigma.Model.HAL.Comments'
,	{
		actions_rel: 'actions'
	}
,	{}
)