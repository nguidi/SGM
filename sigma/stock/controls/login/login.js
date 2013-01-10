steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Login'
		,	{
				defaults:
				{
					view: false
				,	target: false
				}
			}
		,	{
				'_render_content': function(data)
				{
					data.attr('user_error_msg','')
					data.attr('password_error_msg','')
					data.attr('login_error_msg','')
					this._super(data)
				}

			,	'.login click': function()
				{
					var form = {
						username: can.$('.login-form')
								.find('#username').val()
					,	password: can.$('.login-form')
								.find('#password').val()
					}
					if (this.checkLogin(form))
						if (form.username == 'gerente' && form.password == 12345)
							this.loginSuccess()
						else
							this.loginFail()
				}

			,	checkLogin: function(form)
				{
					var bool = true
					if (form.username.length == 0) {
						can.$('.login-form')
							.find('#username')
							.parent()
							.addClass('error')
						this.showError(
							'user_error_msg'
						,	(this.options.data.user_fail) ?
								this.options.data.user_fail
							: 	'No username'
						)
						bool = false
					}
					if (form.password.length == 0) {
						can.$('.login-form')
							.find('#password')
							.parent()
							.addClass('error')
						this.showError(
							'password_error_msg'
						,	(this.options.data.password_fail) ?
								this.options.data.password_fail
							: 	'No password'
						)
						bool = false
					}
					return bool
				}

			,	loginSuccess: function()
				{
					can.$('.login-form')
						.find('#username')
						.empty()
					can.$('.login-form')
						.find('#password')
						.empty()
					this.showError('')
					var self = this
					this.options
						.container
						.constructor
						.containers['Gerente']
						.slot(
							Sigma.Model.HAL.Resource.getRoot('/api/gerente','login')
						)
				}

			,	loginFail: function()
				{
					can.$('.login-form')
						.find('#username')
						.parent()
						.addClass('error')
					can.$('.login-form')
						.find('#password')
						.parent()
						.addClass('error')
					this.showError(
						(this.options.data.auth_fail) ?
							this.options.data.auth_fail
						: 	'Error!!!'
					)
				}

			,	showError: function(what,msg)
				{
					this.options.data
						.attr(
							what ? what :'login_error_msg'
						,	msg ? msg : ''
						)
				}

			,	'input#username, input#password change': function(el)
				{
					el
						.parent()
						.removeClass('error')
					switch(el.attr('id'))
					{
						case 'username' :
							this.showError('user_error_msg')
							break;
						case 'password' :
							this.showError('password_error_msg')
							break;
					}
				}

			,	'.register click': function()
				{
					this.$login.show()
					$('#wellcome').hide()
				}

			,	'[data-re---lation] click' : function(el, ev)
					{
						ev.preventDefault()
						this.element.trigger(
							'browse'
						,	{
								links:this.options.data
							,	rel:el.data('relation')
							,	name:el.data('name')
							,	target:this.options.target
							}
						)
					}
			}
		)
	}
)