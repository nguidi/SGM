steal(
	'sigma/lib'
,	'canui/list'
,	'canui/selectable'
).then( 'sigma/lib/style.js'
).then(
//,	'sigma/lib/do-timeout/jquery.ba-dotimeout.min.js'
	'sigma/lib/updatable_control.js'
,	'sigma/lib/hypermedia_control.js'
,	'sigma/lib/hypermedia_container.js'
,	'sigma/util'
//,	'sigma/lib/active_menu'
).then(	'sigma/model'
,	'sigma/model/hal.js'
)
