(function() {
	
	this.Blob = function( options ) {
		var w = window, d = document, self = this, photo = [],
		ctn = d.querySelector( options.container );
	
		Blob.prototype.start = function() {
			self.photo( ctn, function( elem, blob ) {
				elem.setAttribute( 'src', blob );
				elem.addEventListener('load', function() {
					this.removeAttribute( options.atributo );
					URL.revokeObjectURL( blob );
				});
			});
		}
		
		Blob.prototype.photo = function(photoUrl, callback) {
			var xhttp = new XMLHttpRequest();
			xhttp.open('GET', photoUrl.getAttribute( options.atributo ), true);
			xhttp.responseType = 'blob';
			xhttp.addEventListener('load', function() {
				if(xhttp.status == 200) {
					var blob = URL.createObjectURL( xhttp.response, { oneTimeOnly : true } );
					if( callback ) callback( photoUrl, blob );
				}
			});
			xhttp.send();
		}
	
		if(ctn) self.start();
	}
})();