Uize.module ({
	name:'JsTerm.FileSystem',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		/*
			basic operations:
				get file system object
				move file system object (copy or move)
				delete file system object
				save
		*/

		_class.registerProperties ({
			_rootDirectory:'rootDirectory'
		});

		return _class;
	}
});
