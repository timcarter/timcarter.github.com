/*
	Name: JsTerm.Program.Echo
	Author: Tim Carter
	Description: echoes the arguments
*/

Uize.module ({
	name:'JsTerm.Program.Echo',
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
				_callback = _this.get ('callback')
			;

			_this.echo (_this.get ('optionString'));
			_callback && typeof _callback == 'function' && _callback ();
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});
