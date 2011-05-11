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

		_class.getContents = function (_callback) {
			!_this.get ('loaded') ? Uize.module ({
					required:[
						'JsTerm.Data.File.Readme'
					],
					builder:function () {
						_class.set ({
							loaded:true,
							value:[
								JsTerm.Data.File.Readme
							]
						})
						_superclass.getContents.call (_class, _callback)
					}
				}) :
				_superclass.getContents.call (_class, _callback)
		};

		_class.set ({
			author:'root',
			name:'root',
			dateCreated:new Date,
			permissions:'744',
		});

		return _class;
	}
});

