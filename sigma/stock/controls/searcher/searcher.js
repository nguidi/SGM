steal(
	'sigma/stock/controls/lib'
,	'sigma/stock/controls/dropdown'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Searcher'
		,	{
				defaults:{
					view_filter: false
				}
			}
		,	{
				_render_content: function(data)
				{	
					can.append(
						this.element
					,	can.$('<div class="filter">')
							.append(can.view(this.options.view_filter,data))
					)
					
					new Sigma.Controls.Dropdown(
						can.$('.filter')
					)
					
				}

			,	'button#search click' : function(element,event)
				{
					// Tengo q tratarlo asi porque pierde el Resource Type 
					// y el Rel entonces no me lo reconoce el HConteiner
					this._update_content(
						this.options.slot.constructor.getRoot(
							this.options.slot.attr('search').href
						,	this.options.slot.rel
						)
					)	
					// this._update(element.data('more').fetch())
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
