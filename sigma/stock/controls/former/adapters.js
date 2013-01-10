steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Former'
		,	{}
		,	{
				getActions:function()
				{
					return this.embedded.attr('actions_form')
				}
			,	getFields:function()
				{
					return this.embedded.attr('fields_form')	
				}
			}
		)

		can.Model.List( 'Sigma.Model.HAL.Former.List');
	}
)
