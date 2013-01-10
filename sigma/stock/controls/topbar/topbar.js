steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/stock/controls/dropdown'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Topbar'
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
					
					var nav = new Array()
					
					data.links.each(
						function(link,attr)
						{
							if (this.rel && this.length > 0)
								nav.push(
									new can.Observe(
										can.extend(
											data.embedded[this.rel] ?
												data.embedded[this.rel]
											: 	{}
										,	{
												title: attr
											,	dropdown: true
											,	nav: this
											}
										)
									)
								)
							else 
								if (this.rel && this.rel != 'self')
									nav.push(this)
						}
					)

					this.element
						.html(
							can.view(
								this.options.view
							,	{
									brand: data.brand
								,	nav: nav
								,	self: data.links.self
								}
							)
						)

					this.element.find('.dropdown-toggle')
						.each(
							function()
							{	
								new Sigma.Controls.Dropdown(
									can.$(this).parent()
								)
							}
						)

				}

			,	'li a.browseable click': function(el, ev)
				{
					if (!el.parent('li').hasClass('active'))
					{
						el.parent('li').addClass('active')
						this.element.trigger(
							'browse'
						,	{
								links: this.options.slot.links
							,	rel: el.data('link').rel
							,	name: el.data('link').name
							,	target: (this.options.target_content)
									? this.options.target_content
									: this.options.target
							}
						)
					}
				}

			}
		)
	}
)
