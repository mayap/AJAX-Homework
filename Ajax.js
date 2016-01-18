/**
 * 
 */

var Ajax = {
		getXHR: function() {
			if (window.XMLHttpRequest != undefined) {
				return new XMLHttpRequest();
			}
			
			if (window.ActiveXObject != undefined) {
				return new ActiveXObject('Microsoft.XMLHTTP');
			}
			
			throw new Error('AJAX is not supported');
		},
		/**
		 * 
		 * @param method - GET | POST
		 * @param url
		 * @param params {firstName: 'Ivan', lastName: 'Ivanov'} -> firstName=Ivan&lastName=Ivanov
		 * @param isAsync - true|false
		 * @param callback - function(xhr) { .... }
		 */
		makeRequest: function(method, url, params, isAsync, callback) {
			var xhr = this.getXHR();
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					callback(xhr);
				}
			}
			
			var data = this.parseParams(params);
			if (method == 'GET') {
				//http://test.com/server.php
				if (url.indexOf('?') == -1) {
					url += '?';
				} else if (data.length > 0){
					//http://test.com/server.php?a=b
					url += '&';
				}
				
				url += data;
			}
			
			xhr.open(method, url, isAsync);
			
			if (method == 'POST') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			
			xhr.send(method == 'POST' ? data : null);
		},
		/**
		 * @param params
		 * {firstName: 'Ivan', lastName: 'Ivanov'} -> firstName=Ivan&lastName=Ivanov
		 */
		parseParams: function(params) {
			var paramsAsString = [];
			
			for (var key in params) {
				var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
				paramsAsString.push(pair);
			}
			
			return paramsAsString.join('&');
		}
}

/*Ajax.makeRequest()*/