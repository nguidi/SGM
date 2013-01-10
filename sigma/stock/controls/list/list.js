steal(
	'sigma/stock/controls/lib'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.List'
		,	{
				defaults:{
					view_list: false
				}
			}
		,	{
				_render_content: function(data)
				{	
					can.append(
						this.element
					,	can.$('<div class="list-wrapper">')
							.append(can.view(this.options.view_list,data))
					)
				}

			,	update_content: function(data)
				{
					ev.preventDefault()
						this.element.trigger(
							'browse'
						,	{
								links:this.options.data
							,	rel:el.data('relation')
							,	name:el.data('name')
							,	target:this.options.target_content
							}
						)
				}
			}
		)
	}
)
