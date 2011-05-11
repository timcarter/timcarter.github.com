/*
	Name: JsTerm.Program.Date
	Author: Tim Carter
	Description: Simulates the bash command 'date'
*/

Uize.module ({
	name:'JsTerm.Program.Date',
	required:'Uize.Node',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_callback = _this.get ('callback'),
				_option,
				_dateObject
			;

			// handle arguments
			while (_option = _this.getopt ()) {
				if (_option.optionCharacter == 'date') {
					var _format = _option.optionArgument;
					_dateObject = new Date (_format);
				}
			}

			_this.echo (_dateObject || new Date);

			_callback && typeof _callback == 'function' && _callback ()	
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		_class.set ({
			longOptions:{
				'date':3
			}
		});

		return _class;
	}
});
