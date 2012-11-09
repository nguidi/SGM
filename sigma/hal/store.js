steal(
	'can'
).then(
	function()
	{
	var	line_separator
	=	'\n'
	,	field_separator
	=	','
	,	unquote
	=	function(item)
		{
		return	item.replace(/^"|"$/g,"")
		}
	,	toCsv
	=	function(raw_text)
		{
		var	lines
		=	raw_text
			.split(line_separator)
		,	headers
		=	lines[0]
			//.shift()
			.split(field_separator)
			.map(unquote)
		return	lines
			.map(
				function(line)
				{
				var	result ={}
				,	fields
				return	line
					.split(field_separator)
					.map(unquote)
				}
			)
		}
	,	toJson
	=	function(csv_data)
		{
		var	lines
		=	csv_data
		,	headers
		=	lines
			.shift()
		return	lines
			.map(
				function(line)
				{
				var	result ={}
				,	fields
				=	line
					.map(unquote)

					can
					.each(
						headers
					,	function(header,index)
						{
							result[header.toLowerCase()]=fields[index]
						}
					)
				return	result
				}
			)
		}
		can.ajaxPrefilter(
			function(options)
			{
			return	(/\.csv/.test(options.url))
						?'csv-json'
						:options.dataType
			}
		)
		can.ajaxSetup(
			{
				accepts:
					{
						'csv':	"text/csv"
					,	'csv-json':	"text/csv"
					}
			,	contents:
					{
						'csv':	/csv/
					,	'csv-json':	/csv-json/
					}
			,	converters:
					{
						"text csv":toCsv
					,	"csv csv-json":toJson
					}
			}
		)
    	can.Construct(
    		'Sigma.fixtures.store'
    	,	{
    			defaults:
    				{
    					line_separator:'\n'
    				,	field_separator:','
    				}
    		,	union:
    				function()
    				{
    				var	args
    				=	arguments
    				return	can.when
    						.apply(
    							null
    						,	can.map(
    								args
    							,	this._get_one
    							)
    						).pipe(
    							function()
    							{
    							return	Array
    								.prototype
    								.concat
    								.apply([],arguments)
    							}
    						)
    				}
    		,	join:
    				function(left_dfd,right_url,pred,fix_join)
    				{
    				var	self
    				=	this
    				return can.when(
    						left_dfd
    					,	self.get(right_url)
    				)
    				.then(
    					function(data_left, data_right)
    					{
    						return can.map(
    								data_left[0]
    							,	function(lobj)
    								{
    									var	prop='joined'
    									lobj[prop]
    									=	can
    										.grep(
    											data_right[0]
    										,	function(rval)
    											{
    											return	pred(lobj,rval)
    											}
    										)
    										return fix_join(lobj)
    								}
    						)
    					}
    				)
    				}
    		,	get:
    				function(url)
    				{
    				return	this._get_one(url)
    				}
    		,	_get_one:
    				function(what)
    				{
    				return	can
    					.ajax(what)
    					//.pipe(toJson)
    				}
    		}
    	,	{
    			init:
    				function(options)
    				{
    					this.options=can.extend(options,this.constructor.defaults)
    					this.results=can.Deferred()
    					this.results.resolveWith(this)
    					this.results.promise(this)
    				}
    		,	start:
    				function()
    				{
    				return	can
    					.when
    					.apply(
    						null
    					,	can
    						.map(
    							this.deferreds
    						,	function()
    							{
    							return	can.isDeferred(dfd)
    								?dfd
    								:can.Deferred(dfd)
    							}
    						)
    					)
    				}
    		}
    	)
    }
)