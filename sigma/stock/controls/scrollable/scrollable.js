steal(
	'sigma/stock/controls/lib'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Scrollable'
		,	{
				defaults:{
					view_more: false
				,	view_content: false
				}
			,	nextPage : false
			,	lastPage: false
			}
		,	{
				_render_content: function(data)
				{
					var exists = 	this.element.find('div').hasClass('content') 
					||		this.element.find('div').hasClass('more')

					if (!exists) {
						this._render_scrollable_content(data)
						this._render_scrollable_more(data)
					} 
					this._update_content(data)					
				}

			,	_render_scrollable_content: function(data)
				{
					can.append(
						this.element
					,	can.$('<div class="content">')
					)
				}

			,	_render_scrollable_more: function(data)
				{
					can.append(
						this.element
					,	can.$('<div class="more">')
					)
				}

			,	_update_content: function (data)
				{
					this.lastPage = 1

					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	data
						)
					)

					this.element
						.find('div.more')
						.empty()

					can.append(
						this.element
							.find('div.more')
					,	can.view(
							this.options.view_more
						,	data
						)
					)
				}

			,	shouldILoadMore: function(el)
				{

					return	can.$(el).height() + can.$(el).scrollTop() == can.$(document).height() 
					&& 	this.options.slot.attr('more')
					//&&	this.nextPage == this.lastPage
				}

			,	'button.more click' : function(element,event)
				{
					// Tengo q tratarlo asi porque pierde el Resource Type 
					// y el Rel entonces no me lo reconoce el HConteiner
					this._update(
						this.options.slot.constructor.getRoot(
							this.options.slot.attr('more').href
						,	this.options.slot.rel
						)
					)	
					// this._update(element.data('more').fetch())
				}

			,	'{window} scroll': function(el,ev)
				{
					console.log(el)
					if (this.shouldILoadMore(el))
					{
						var self = this
						self._update(
							self.options.slot.constructor.getRoot(
								this.options.slot.attr('more').href
							,	self.options.slot.rel
							)
						)
					}
				}
			}
		)
	}
)
