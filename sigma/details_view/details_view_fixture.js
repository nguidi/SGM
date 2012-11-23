steal(
	'sigma/hal/hal_builder.js'
,	function ()
	{
		
		var comments = can.map(
			[1,2,3,4,5,6,7,8,9,10]
		,	function(it)
			{	
				return {
					title: 'Comentarista '+it
				,	icon: 'star'
				,	description: 'Comentario numero '+it
				}
			}
		)

		var posts = can.map(
			[1,2,3,4,5,6]
		,	function(it) 
			{
				return  {
					title: 'Posteador '+it
				,	icon:  'off'
				,	description: 'Post numero '+it
				,	align: 'left'
				,	icon_align: 'left'
				}
			}
		)

		var genDetails = function(comment_id)
		{
			return 	{
				id : comment_id	
			,	title: 'Propetario : '+comments[comment_id].title
			,	description: comments[comment_id].description
			,	icon: comments[comment_id].icon
			,	date: new Date()
			,	likes: Math.floor((Math.random()*8)+1)
			, 	shared: Math.floor((Math.random()*2)+1)
			}
		} 

		can.fixture(
			'GET /details/{id}'
		,	function(data)
			{	
				return  new Sigma.fixtures
						.hal_builder(
							genDetails(data.url.split('/').reverse()[0])
						).get_document()
			}
		)

		var genComments = function(post_url) 
		{
			return can.map(
				comments
			,	function(comment,index) 
				{
					return  new Sigma.fixtures
							.hal_builder(
								{
									title: comment.title
								,	icon: comment.icon
								,	description: comment.description
								,	icon_align: (index % 2) ? 'right' : 'left'
								}
							,	post_url+'/comments/'+index
							)
				}
			)
		}

		var genPosts = function() 
		{
			return can.map(
				posts
			,	function(post,it) 
				{
					return	new Sigma.fixtures
							.hal_builder(
								{
									title: post.title
								,	icon:  post.icon
								,	description: post.description
								,	align: post.align
								,	icon_align: post.icon_align
								}
							,	'/posts/'+it
							).link(
								{
									'comments':
									{
										href:'/comments'
									}
								}
							).embedded(
								{
									'comments': genComments('/posts/'+it)
								}
							)
				}
			)
		}

		can.fixture(
			'GET /streamView'
		,	function()
			{
				
				return  new Sigma.fixtures
						.hal_builder(
							{
							}
						,	'/stream'
						).link(
							{
								'posts':
									{
										href:'/posts'
									}
							}
						).embedded(
							{
								'posts': genPosts()
							}
						).get_document()
			}
		)
	}
)