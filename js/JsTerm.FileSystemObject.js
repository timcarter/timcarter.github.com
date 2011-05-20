Uize.module ({
	name:'JsTerm.FileSystemObject',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
			_classPrototype = _class.prototype
		;

		_classPrototype.read = function (_callback) {
			_callback (this._contents)
			/*
				Returns the contents of the file or folder, in whatever format they might be.
				Check the subclasses for any specific implementations.
			*/
		};

		_classPrototype.write = function (_data, _callback) {
			this.set ({_contents:_data});
			_class.set ({_contents:_data});
			_callback ();
			/*
				Writes the data to both the current instance of the file and the file itself (ie, the class).
				TODO:
					Add an integration point with the file system, so that upon writing to the file, all the
					instances of that file can be updated with the correct contents.
			*/
		};

		_class.registerProperties ({
			_author:'author',
			_contents:'contents', // for files, this will be a string; for folders, an array
			_timestamp:'timestamp',
			_type:'type', // either 'file' or 'folder'
			_permissions:{
				name:'permissions',
				value:'777'
			}
		});

		return _class;
	}
});
