/*
	Name: ShellCommand.Clear
	Author: Tim Carter
	Description: Simulates the bash command 'clear'
*/

Uize.module ({
	name:'ShellCommand.Clear',
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

			this.get ('shellNode').innerHTML = '';

			_callback && typeof _callback == 'function' && _callback ()	
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});
