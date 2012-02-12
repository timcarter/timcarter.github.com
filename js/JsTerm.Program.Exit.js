/*
	Name: JsTerm.Program.Exit
	Author: Tim Carter
	Description: Simulates the bash command 'exit'
*/

Uize.module ({
	name:'JsTerm.Program.Exit',
	required:'Uize.Node',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.execute = function () {
			var
				_callback = this.get ('callback')
			;

			this.echo ('Goodbye.');

			// no callback, because you'll be redirected to Google.
			setTimeout (
				function () {
					location.href = 'http://www.google.com';
				},
				2000 // 2 seconds to contemplate your fate.
			);
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});

