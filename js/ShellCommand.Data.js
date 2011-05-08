/*
	Name: ShellCommand.Data
	Author: Tim Carter
	Description: Simulates a config file. Contains one static value property that holds the data.
*/

Uize.module ({
	name:'ShellCommand.Data',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.registerProperties ({
			_value:{
				name:'value',
				value:{}
			}
		});

		return _class;
	}
});
