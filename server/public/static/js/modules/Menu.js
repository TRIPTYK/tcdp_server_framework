(function(window,$){

	function Menu(){

		var dropdown = false;

		$('.hasHoverMenu').bind('mouseover', overHandler);
		$('.hasHoverMenu').bind('mouseleave', outHandler);

		function overHandler(){
			dropdown = true;
			$(this).children('.hovermenu').clearQueue().show();
			$(this).children('.headerMenu-lien').css({color:'#e85d10'});
		}

		function outHandler(){
			dropdown = false;
			overOutEvent();
		}

		function overOutEvent(){
			if(!dropdown){
				$('.hovermenu').delay(500).fadeOut();
				$('.headerMenu-lien').css({color:'#FFFFFF'});
			}
		}

		var that = {};
		return that;
	}

	window.betv = window.betv||{};
	window.betv.Menu = Menu;

})(window,jQuery);