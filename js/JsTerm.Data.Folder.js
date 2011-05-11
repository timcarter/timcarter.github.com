/*
	Name: JsTerm.Data.Folder
	Author: Tim Carter
	Description: Static class representing a folder
*/

Uize.module ({
	name:'JsTerm.Data.Folder',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.registerProperties ({
			_loaded: {
				/*
					Most folders will need to load their contents dynamically (ie, through module calls)
				*/
				name:'loaded',
				value:false
			}
		});

		return _class;
	}
});
