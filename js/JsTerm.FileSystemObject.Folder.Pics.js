Uize.module ({
	name:'JsTerm.FileSystemObject.Folder.Pics',
	builder:function (_superclass) {
		var _class = _superclass.subclass ();

		_class.set ({
			name:'pics',
			author:'timcarter',
			contents:{
				'dick.jpg':'JsTerm.FileSystemObject.File.DickJpg'
			},
			timestamp:'1305875485014',
			permissions:'777'
		});

		return _class;
	}
});
