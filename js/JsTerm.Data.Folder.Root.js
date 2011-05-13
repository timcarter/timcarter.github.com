/*
	Name: JsTerm.Data.Folder
	Author: Tim Carter
	Description: Static class representing the root directory
*/

Uize.module ({
	name:'JsTerm.Data.Folder.Root',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.set ({
			author:'root',
			name:'/',
			dateCreated:new Date,
			permissions:'744',
			deferredValue:[
				'JsTerm.Data.File.Readme'
			]
		});

		return _class;
	}
});

