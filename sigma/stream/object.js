		Sigma.Media
		.Object
		=	can
			.Control(
				{
					defaults:
						{
							align:'left'
						,	title:'4'
						,	view:'//sigma/stream/views/object.ejs'
						,	css:
								{	'text-align':'center'
								,	'padding':'10px'
								,	'border-radius':'10px'
								,	'line-height':'1'
								,	'background-color':'#9D261D'
								,	'font-size':'40px'
								,	'text-shadow':'2px 2px 3px #222'
								,	'color':'white'
								}
						}
				}
			,	{
					init:
						function(element,options)
						{
						var	$object=
								element
								.html(can.view(this.options.view,this.options.data))
								.find('.media-object')
								//.addClass('pull-'+this.options.align)
								.css(this.options.css )
								/*
								.append(
									$('<h'+this.options.title+'>')
									.html(this.options.data.attr('title'))
								)
							if(this.options.data.attr('href'))
								$object=
									element
									.wrap(
											$('<a>')
											.attr('href',this.options.data.attr('href'))
									)
							if(this.options.data.attr('img'))
								$object
								.append('<img>')
								.attr(
									'src'
								,	this.options.data.attr('img')
								)
							else
								if(this.options.data.attr('icon'))
									//$object
									//.prepend('<i>')
									$('<i>')
									.prependTo($object)
									.addClass(
										'icon-'
									+	(	this.options.data.attr('icon')
										||	'bolt'
										)
									)
								else
									$object
									.prepend('<i>')
								*/
						}
				}
			)

