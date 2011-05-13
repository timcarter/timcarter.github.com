/*
	Name: JsTerm.Data
	Author: Tim Carter
	Description: Static class representing an object in the file system
*/

Uize.module ({
	name:'JsTerm.Data',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.getValue = function (_callback) {
			_callback (_class._value)
		};

		_class.registerProperties ({
			_author:'author',
			_dateCreated:'dateCreated',
			_name:'name',
			_permissions:{
				name:'permissions',
				value:'777' // default rwx for all
			},
			_value:'value'
		});

		return _class;
	}
});

