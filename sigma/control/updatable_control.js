steal(	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		can.Control(
			'Sigma.UpdatableControl'
		,	{
				defaults:{
						view: ''
					,	loading: '//stock/views/common/loading.mustache'
					,	empty: '//stock/views/common/empty.mustache'
					,	failed: '//stock/views/common/failed.mustache'
					,	slot: false
					,	container: false
					,	target: false
					}
			,	rendered : false
			,	setup:	function()
					{
					var	result=this._super.apply(this,arguments)
						Sigma.UpdatableControl.NO_DATA=false
					return	result
					}
			}
		,	{
				init:	function(el,options)
					{
						//this._super.apply(this,arguments)
						can.each(
							this.options
						,	this.proxy(
								function(val,prop)
								{
									if(/^view/.test(prop))
										this.options[prop]=steal.idToUri(val).path
								}
							)
						)
						can.each(
							['loading','empty']
						,	this.proxy(
								function(what)
								{
									this.options[what]=steal.idToUri(this.options[what]).path
								}
							)
						)
						if(!this.options.container)
							throw 'Control must have an "container" property'
						if(!this.options.target)
							this.options.target=this.options.container
						this.update()
					}
			,	update:	function(options)
					{
						this._super(this.options)
					var	data=this.options.slot
						if(data && data.isComputed)
							data=data()
						this._update(data)
					}
			,	_update:
					function(data)
					{
						data=data||Sigma.UpdatableControl.NO_DATA
						if(can.isDeferred(data))
						{
							this._render_loading()
							data.done(can.proxy(this._update,this))
							data.fail(can.proxy(this._render_failed,this))
						}
						else	if(data==Sigma.UpdatableControl.NO_DATA)
								this._render_empty()
							else
							{
								this.clean_rendered()
								this.set_data(data)
								this.on()
								this._render_content(this.options.data)
							}
					}
			,	set_data:
					function(data)
					{
						mio = this.options.data
						this.options.data=
							(data instanceof can.Observe) //funciona tanto para observe.list como para observe.
								? data
								: new can.Observe(data)
					}
			,	clean_rendered:
					function()
					{
						var self = this
						can.each(
							['empty','loading','failed']
						,	function()
							{
								self.element
									.find('div.uc-'+this)
									.remove()
							}
						)
					}
			,	_render_loading:
					function()
					{
						this.element
							.append(
								can.$('<div class="uc-loading">')
									.html(
										can.view(
											this.options.loading
										,	{
												message : 'Cargando...'
											}
										)
									)
							)
					}
			,	_render_content:
					function(data_to_render)
					{
						this.element
							.append(
								can.view(
									this.options.view
								,	data_to_render
								)
							)
					}
			,	_render_empty:
					function()
					{
						this.element
							.append(
								can.$('<div class="uc-loading">')
									.html(
										can.view(
											this.options.empty
										,	{
												message : 'nada...'
											}
										)
									)
							)
					}
			,	_render_failed:
					function()
					{
						this.element
							.append(
								can.$('<div class="uc-loading">')
									.html(
										can.view(
											this.options.failed
										,	{
												message : 'failed...'
											}
										)
									)
							)
					}
			,	'{slot} change':
					function(target, ev, newVal)
					{
						if( target.isComputed )
							this._update(newVal)
					}

			}
		)
	}
)
