steal(
	'sigma/stock/controls/lib'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Tabs'
		,	{
				defaults:{
					view_form: false
				}
			}
		,	{
				_render_content: function(data)
				{	
					can.append(
						this.element
					,	can.$('<div class="form-wrapper">')
							.append(can.view(this.options.view_form,data))
					)

					var selector
					=	'#tab-'+ this.options.slot.id +' a'

					console.log(selector)

					$('#tab-'+ this.options.slot.id +' a')
						.click(
							function (e) {
								console.log($(this))
								e.preventDefault();
								$(this).tab('show');
							}
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
