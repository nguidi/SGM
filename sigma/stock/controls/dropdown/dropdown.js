can.Control(
	'Sigma.Controls.Dropdown'
,	{
		defaults:{
		}
	}
,	{
		init: function()
		{
			this.$dropdown 
			= this.element.parent()
				.find('ul.dropdown-menu')

		}

	,	getCSS: function()
		{
			var 	pos = can.$(this.element).position()
			,	toggler = can.$(this.element)
			,	doc = can.$(document)
			,	dropdown = this.$dropdown
			
			return {
				top: pos.top + toggler.height()
			,	left: (pos.left + dropdown.width() < doc.width())
					? pos.left
					: pos.left + toggler.width() + 8 - dropdown.width()
			,	right: 'auto'
			,	opacity: 0
			}
		}

	,	hide_dropdown: function()
		{
			var self = this
			this.$dropdown
				.animate(
						{
							opacity: 0
						}
					,	300
					,	function()
						{
							self.element
								.removeClass('open')
						}
					)
		}

	,	show_dropdown: function()
		{
			this.$dropdown
				.css(
					this.getCSS()
				)

			this.element
				.addClass('open')
			this.$dropdown
				.animate(
						{
							opacity: 1
						}
					,	300
					)
		}

	,	'.options-toggle click': function(el,ev)
		{
			var isActive 
			= 	this.element
					.hasClass('open')

			if(!isActive)
				this.show_dropdown()
			else
				this.hide_dropdown()
		}

	,	'.dropdown-menu mouseleave': function()
		{
			this.hide_dropdown()
				
		}
	}
)