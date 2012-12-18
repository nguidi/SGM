Sigma.HypermediaControl(
	'Sigma.Controls.Pageable'
,	{
		defaults:{
			view_links: false
		,	view_content: false
		}
	}
,	{
		_render_content: function(data)
		{
			var exists = 	this.element.find('div').hasClass('content') 
			||		this.element.find('div').hasClass('links')

			if (!exists) {
				this._render_pageable_content(data)
				this._render_pageable_links(data)
			} 
			this._update_content(data)			
		}

	,	_render_pageable_content: function(data)
		{
			can.append(
				this.element
			,	can.$('<div class="content">')
			)

			can.append(
				this.element
					.find('div.content')
			,	can.view(
					this.options.view_content
				,	data
				)
			)
		}

	,	_render_pageable_links: function(data)
		{
			can.append(
				this.element
			,	can.$('<div class="links">')
			)

			can.append(
				this.element
					.find('div.links')
			,	can.view(
					this.options.view_links
				,	data
				)
			)
		}

	,	_update_content: function(data)
		{
			// update pageable content
			this.element
				.find('div.content')
				.empty()

			can.append(
				this.element
					.find('div.content')
			,	can.view(
					this.options.view_content
				,	data
				)
			)

			// update pageable links
			this.element
				.find('div.links')
				.empty()

			can.append(
				this.element
					.find('div.links')
			,	can.view(
					this.options.view_links
				,	data
				)
			)

			if (data.attr('prev'))
				this.element
					.find('ul.paginable')
					.find('li.previous')
					.removeClass('disabled')
			else
				this.element
					.find('ul.paginable')
					.find('li.previous')
					.addClass('disabled')

		        if (data.attr('next'))
				this.element
					.find('ul.paginable')
					.find('li.next')
					.removeClass('disabled')
			else
				this.element
					.find('ul.paginable')
					.find('li.next')
					.addClass('disabled')
		}

	,	'ul.paginable li:not(".disabled") click' : function(element,event)
		{
			// Tengo q tratarlo asi porque pierde el Resource Type 
			// y el Rel entonces no me lo reconoce el HConteiner
			this._update(
				this.options.slot.constructor.getRoot(
					element.data('link').href
				,	this.options.slot.rel
				)
			)	
			// this._update(element.data('link').fetch())
		}
	}
)