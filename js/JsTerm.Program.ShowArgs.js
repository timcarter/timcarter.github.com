/*
	Name: JsTerm.Program.ShowArgs
	Author: Tim Carter
	Description: displays the contents of the program instance's argv, excluding the program name.
*/

Uize.module ({
	name:'JsTerm.Program.ShowArgs',
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
				_arguments = _this.get ('argv'),
				_argumentsLength = _arguments.length,
				_callback = _this.get ('callback'),
				_currArgumentIdx = 0
			;

			for (;++_currArgumentIdx < _argumentsLength;)
				_this.echo (_arguments [_currArgumentIdx])
			;
			
			_callback && typeof _callback == 'function' && _callback ();
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});
