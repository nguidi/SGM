steal(
	'sigma/lib'
,	'canui/list'
).then(
	'sigma/media/media.css'
,	function()
	{
		can.Construct('Sigma.Media')
	}
).then(
	'sigma/media/object.js'
,	'sigma/media/body.js'
).then(
	'sigma/media/control.js'
)
