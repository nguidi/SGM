steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.List'
		,	{}
		,	{
				getHeaders:function()
				{
					return	this.embedded.attr('headers_list')
				}
			,	getActions:function()
				{
					return this.embedded.attr('actions_list')
				}
			,	getList:function()
				{
					//return this.embedded.attr('actions_list')
					return new can.Observe.List(
						[
							{"_links":
								{
									"self":{"href":"/api/planes/1"}
								,	"programas":{"href":"/api/planes/1/programas"}
								}
							,	"id":"1"
							,	"plan":"Plan 1"
							,	"objetivos":"Acercamiento de estudiantes a los centros productivos con la idea de hacer conocer las instalaciones y su gente, ofreciendo una experiencia formativa a lo largo de la visita que promocione la marca empleadora"
							,	"impacto":"Impacto plan 1"
							,	"id_area_accion":"1"
							,	"evaluacion_y_diagnostico":null
							,	"id_estado_avance":"1"
							,	"adjuntos":null
							,	"fecha_inicio":null
							,	"fecha_fin":null
							,	"programas":
								[
									{	"_links":
										{
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"1"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 1"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"2"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 2"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"3"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 3"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}	

								]
							}
							,
							{
							"_links":
								{
									"self":{"href":"/api/planes/2"}
								,	"programas":{"href":"/api/planes/1/programas"}
								}
							,	"id":"2"
							,	"plan":"Plan 2"
							,	"objetivos":"Promoción de la vocación y el estudio por carreras de ingenierías y geociencias."
							,	"impacto":"Impacto plan 1"
							,	"id_area_accion":"1"
							,	"evaluacion_y_diagnostico":null
							,	"id_estado_avance":"1"
							,	"adjuntos":null
							,	"fecha_inicio":null
							,	"fecha_fin":null
							,	"programas":
								[
									{	"_links":
										{
											"self":{"href":"/api/programas/4"}
										}
									,	"id":"4"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 4"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/5"}
										}
									,	"id":"4"
									,	"id_nombre_programa":"4"
									,	"nombre_programa":"Programa 4"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/6"}
										}
									,	"id":"5"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 5"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}	

								]
							}
							,{"_links":
								{
									"self":{"href":"/api/planes/1"}
								,	"programas":{"href":"/api/planes/1/programas"}
								}
							,	"id":"1"
							,	"plan":"Plan 1"
							,	"objetivos":"Acercamiento de docentes a los centros productivos con la idea de lograr actualización y formación de formadores asi como acercar conocimeintos del ambito académico al sector productivo"
							,	"impacto":"Impacto plan 1"
							,	"id_area_accion":"1"
							,	"evaluacion_y_diagnostico":null
							,	"id_estado_avance":"1"
							,	"adjuntos":null
							,	"fecha_inicio":null
							,	"fecha_fin":null
							,	"programas":
								[
									{	"_links":
										{
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"1"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 1"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"2"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 2"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/1"}
										}
									,	"id":"3"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 3"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}	

								]
							}
							,
							{
							"_links":
								{
									"self":{"href":"/api/planes/2"}
								,	"programas":{"href":"/api/planes/1/programas"}
								}
							,	"id":"2"
							,	"plan":"Plan 2"
							,	"objetivos":"Promoción y difusión de la marca empleadora, potenciando los atributos asociados a dicha marca."
							,	"impacto":"Impacto plan 1"
							,	"id_area_accion":"1"
							,	"evaluacion_y_diagnostico":null
							,	"id_estado_avance":"1"
							,	"adjuntos":null
							,	"fecha_inicio":null
							,	"fecha_fin":null
							,	"programas":
								[
									{	"_links":
										{
											"self":{"href":"/api/programas/4"}
										}
									,	"id":"4"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 4"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/5"}
										}
									,	"id":"4"
									,	"id_nombre_programa":"4"
									,	"nombre_programa":"Programa 4"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}
								,	{	"_links":
										{	
											"self":{"href":"/api/programas/6"}
										}
									,	"id":"5"
									,	"id_nombre_programa":"1"
									,	"nombre_programa":"Programa 5"
									,	"id_pais":"1"
									,	"id_plan":"1"
									,	"id_tipo_iniciativa":"1"
									,	"objetivos":null
									,	"impacto":null
									,	"id_area_accion":null
									,	"evaluacion_y_diagnostico":null
									,	"estado_avance":null
									,	"adjuntos":null
									,	"indicadores_avance":null
									,	"periodo_duracion":null
									,	"fecha_inicio":null
									,	"fecha_fin":null
									}	

								]
							}
						])
					}
			}
		)

		can.Model.List( 'Sigma.Model.HAL.Searcher.List');
	}
)
