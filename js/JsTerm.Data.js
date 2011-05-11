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

		/*
			By default, returns the value of the class. This is here so that the
			overridden toString method in the Uize base class can still provide
			good debugging information.
		*/
		_class.getContents = function (_callback) {
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
			_value:'value' // use getContents, not this
		});

		return _class;
	}
});

