steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/stock/controls/dropdown'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Home'
		,	{
				defaults:{
					target_content: false
				,	view: false
				,	auto_render: false
				}
			}
		,	{
				_render_content : function(data)
				{
					
					this.element
						.html(
							can.view(
								this.options.view
							,	can.extend(
									data.attr()
								,	{
										applications: data.links.attr('applications')
									,	dropdown: data.links.attr('dropdown')
									}
								)
							)
						)

					new Sigma.Controls.Dropdown(
						can.$('.user-dropdown')
					)

					if (this.options.auto_render)
						this.element
							.find('.browseable:first')
							.click()
				}
			
			,	'.dropdown-browseable click': function(el,ev)
				{
					$('.options-toggle').click()
					this.element.trigger(
						'browse'
					,	{
							links: this.options.slot.links
						,	rel: el.data('menu').rel
						,	name: el.data('menu').name
						,	target: (this.options.target_content)
								? this.options.target_content
								: this.options.target
						}
					)
				}

			,	'.browseable click': function(el, ev)
				{
					this.element.trigger(
						'browse'
					,	{
							links: this.options.slot.links
						,	rel: el.data('application').rel
						,	name: el.data('application').name
						,	target: (this.options.target_content)
								? this.options.target_content
								: this.options.target
						}
					)
				}

			}
		)
	}
)
