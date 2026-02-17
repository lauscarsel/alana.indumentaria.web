;(function () {

	let sticky = false
	let currentPostition = 0

	const imageCounter = $("[data-name='image-counter']").attr("content")
	const email = "lautaroscarselletta1234@gmail.com"

	$("#contacto").on("submit",function(ev){
		ev.preventDefault()

		sendForm($(this))

		return false

	})

 
	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)

	setInterval(() => {

		if (currentPostition < imageCounter) {
			currentPostition++
		} else {
			currentPostition = 0
		}

		$("#gallery .inner").css({
			left: "-" + (currentPostition * 100) + "%"
		})

	}, 4000)

	$(window).scroll(() => {
		const inBottom = isInBottom()

		if (inBottom && !sticky) {
			sticky = true
			stickNavigation()
		}

		if (!inBottom && sticky) {
			sticky = false
			unstickNavigation()
		}
	})

	function stickNavigation() {
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp()
		$("#sticky-navigation").slideDown()
	}

	function unstickNavigation() {
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown()
		$("#sticky-navigation").slideUp()
	}

	function sendForm($form){
		$.ajax({
			url: $form.attr("action"),
			method: "POST",
			data: $form.formObject(),
			dataType: "json",
			success: function(){
	    		alert("todo okey")
			}
	})
}

	function isInBottom() {
		const $description = $("#description")
		const descriptionHeight = $description.height()

		return $(window).scrollTop() >
			$(window).height() - (descriptionHeight * 2)
	}

})()
