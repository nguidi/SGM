steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.DrillDown'
		,	{
				defaults: {
					view_drilldown: false
				,	view_breadcrumb: false
				}
			}
		,	{
				_render_content: function(data)
				{
					var exists = 	this.element.find('ul').hasClass('breadcrumb') 
					||		this.element.find('ul').hasClass('drilldown')

					if (!exists)
					{
						can.addClass(
							this.element
						,	'well media span5'
						)	

						can.$('<ul class="breadcrumb">')
							.appendTo(this.element)

						can.$('<li><i class="icon-home">')
							.appendTo(this.element.find('ul.breadcrumb'))

						can.$('<div class="span3 bs-docs-sidebar drilldown">')
							.appendTo(this.element)
					}
					this._render_resource(data)
				}

			,	_render_resource: function(data) 
				{
					this._render_breadcrumb(data)

					this._reder_drilldown(data)
				}

			,	_render_breadcrumb: function(data)
				{
					var control = false

					this.element
						.find('ul.breadcrumb')
						.find('li')
						.each(
							function()
							{
								if (control)
									can.$(this).remove()
								else 
									if (can.$(this).attr('id') == 'breadcrumb-'+data.attr('id'))
										control = true
							}
						)
					if (!control)
					{
						this.element
							.find('ul.breadcrumb')
							.find('li')
							.addClass('active')

						if (this.options.view_breadcrumb)
							can.append(
								this.element
									.find('ul.breadcrumb')
							,	can.view(
									this.options.view_breadcrumb
								,	data
								)
							)	
					}
				}

			,	_reder_drilldown: function(data) 
				{
					this.element
						.find('div.drilldown')
						.find('ul')
						.remove()

					if (this.options.view_drilldown)
						can.append(
							this.element
								.find('div.drilldown')
						,	can.view(
								this.options.view_drilldown
							,	data
							)
						)
				}

			,	'.drilldown ul li click': function(element,event)
				{
					
					var self = this
					Sigma.Model.HAL.Resource.DrillDown.getRoot(element.attr('href'))
					.then(
						function(slot)
						{
							self.options.slot = slot
							self._update(
								element
							,	self.options
							)
						}
					)
				}

			,	'.breadcrumb li.active click': function(element,event)
				{
					this.options.slot = element.data('breadcrumb')
					this._render_resource(
						element.data('breadcrumb')
					)
				}
			}
		)
	}
)