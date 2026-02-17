;(function (){

	//$(".step:nth-child(1)").addClass("active")

	const selector = "#contacto"

	$(".path-step").on("click",(ev)=>{
		let current_circle = $(ev.target)
	 $(".path-step.active").removeClass("active")
	 $current_circle.addClass("active")

	 console.log($(current_circle.index()))

	})


	$(selector).find(".input").on("change",()=>{
		let $input = $(ev.target)

		let $next_step = $input.parent().next(".step")

		if($next_step.length > 0){
			siguiente($next_step)

		}else{
			validar_formulario()
		}

	})

//helpers

	function validar_formular(){
		if(es_valido_formulario()){

		}else{
			let $fieldest_invalido = $(selector).find(".input:invalid").first().parent()
			siguiente($fieldest_invalido)
		}

	}

	function es_valido_formulario(){
		document.querySelector(selector).checkValidity()
	}

	function siguiente($next_step) {
		$(".step.active").removeClass("active")
		$next_step.addClass("active")
		$next_step.find(".input").focus()
		validar_formulario()
		//$next_input.focus()
	}

})()