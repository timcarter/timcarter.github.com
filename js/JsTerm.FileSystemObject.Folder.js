Uize.module ({
	name:'JsTerm.FileSystemObject.Folder',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.resolve = function (_path, _callback) {
			var
				_this = this,
				_contents = _this._contents,
				_immediatePath = _path.shift (),
				_contentName
			;
			for (_contentName in _contents) {
				if (_contentName == _immediatePath) {
					var _content = _contents [_contentName];
					if (_path.length) {
						// we haven't reached the final object we want, so keep going
						!_content.indexOf ('JsTerm.FileSystemObject.Folder') ?
							Uize.module ({
								required:[_content],
								builder:function () {
									_content.resolve (_path, _callback)
								}
							}) :
							_callback (null); // the content is a file, so there's an error
							return;
					}
					else {
						// return what we've found
						_callback (_content);
						return;
					}
				}
			}

			_callback (null); // if we've reached this point, we haven't found anything
			/*
				Returns the name of the class that corresponds to the given path.
				This function is recursive, so it will fail after a certain
				number of attempts.

				The path is assumed to be an array of strings that is the result of
				a _path.split ('/') call.

				=contents= should be a dictionary, where the path name is the key
				and the class is the object
			*/
		};

		_class.set ({
			contents:{
				/*
					=contents= is a dictionary; the keys correspond to the path name of the file system object (relative to this folder) and the values correspond to the JsTerm.FileSystemObject subclass for the object.
				*/
			},
			type:'folder'
		});

		return _class;
	}
});
