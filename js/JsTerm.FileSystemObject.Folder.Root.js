/*
	Name: JsTerm.FileSystemObject.Folder
	Author: Tim Carter
	Description: Static class representing the root directory
*/

Uize.module ({
	name:'JsTerm.FileSystemObject.Folder.Root',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.set ({
			author:'root',
			name:'root',
			dateCreated:new Date,
			permissions:'744',
			value:[
				{
					// maybe use the declarative syntax here
				}
			]
		});

		return _class;
	}
});

