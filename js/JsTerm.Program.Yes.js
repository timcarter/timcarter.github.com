/*
	Name: JsTerm.Program.Yes
	Author: Tim Carter
	Description: Simulates the bash command 'yes.' Unfortunately, support for Ctrl+C doesn't seem to work completely in javascript, so just pressing 'c' kills the loop.
*/

Uize.module ({
	name:'JsTerm.Program.Yes',
	required:[
		'Uize.Node',
		'Uize.Node.Event'
	],
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_callback = _this.get ('callback'),
				_timeout
			;

			_this.wireNode (
				document.body,
				'keydown',
				function (_event) {
					if (_event.keyCode == 67) {
						_this.unwireNode ( document.body, 'keydown' );

						_timeout && clearTimeout (_timeout);
						_timeout = null;

						_callback && typeof _callback == 'function' && _callback ();
					}
				}
			);

			(function _appendY () {
				_this.echo (_this.get ('optionString') || 'y');
				_timeout = setTimeout ( _appendY, 50 );
			 })();

		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});
