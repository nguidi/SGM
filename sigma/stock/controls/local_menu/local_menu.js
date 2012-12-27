steal(
	'sigma/lib'
).then(
	function() {
		//can.fixture.on = false;
		Sigma.HypermediaControl(
			'Sigma.Controls.LocalMenu'
		,	{
				defaults:
				{
					view: false
				,	target_content: false
				,	auto_render: false
				}
			}
		,	{
			 	_render_content: function(data)
				{
					this.element
						.html(
							can.view(
								this.options.view
							,	data.links
							)
						)
					if (this.options.auto_render)
						this.element
							.find('.browseable:first')
							.click()
				}

			,	toggleActive: function(li)
				{
					if (li.hasClass('active'))
						return false
					li.parent('ul')
						.find('li.active')
						.removeClass('active')
					li.addClass('active')
					return true
				}

			,	'.browseable click': function(el, ev)
				{
					if (this.toggleActive(el.is('li') ? el : el.parent('li')))
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
		)
	}
)
