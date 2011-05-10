/*
	Name: JsTerm.FileSystemObject
	Author: Tim Carter
	Description: Static class representing an object in the file system
*/

Uize.module ({
	name:'JsTerm.FileSystemObject',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		/*
			By default, returns the value of the class. This is here so that the
			overridden toString method in the Uize base class can still provide
			good debugging information.
		*/
		_class.getContents = function () {
			return _class._value
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

