Uize.module ({
	name:'JsTerm.FileSystem',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype,
			_null = null
		;

		/* Private Constants */
		_class._UNDEFINED_FILE_HANDLE = -1;

		/* Private Methods */
		_classPrototype._getObjectFromPath = function (_path, _callback) {
			var
				_this = this,
				_root = _this._root
			;

			_root ? _root.resolve (_path.toLowerCase ().split ('/'), _callback) : _callback (_null);
			/*
				Resolves the object found at the given path.
			*/
		};

		/* Public Methods */
		_classPrototype.open = function (_path, _callback) {
			var
				_this = this,
				_pointer = _class._UNDEFINED_FILE_HANDLE
			;

			_this._getObjectFromPath (
				_path,
				function (_results) {
					if (_results)
						Uize.module ({
							required:[_results.fileSystemObject],
							builder:function () {
								var
									_fileSystemObjectInstance = (new Function ('try { return new ' + _results.fileSystemObject + '} catch (e) {}'))()
								;

								if (_fileSystemObjectInstance) {
									_this._resources [_this._referenceCounter] = _fileSystemObjectInstance;
									_pointer = ++_this._referenceCounter;
								}

								_callback (_pointer);
							}
						})
					;
					else {
						// provide some error handling here, or just return null
						_callback (_pointer)
					}
				}
			);
			/*
				Gets a "pointer" to a file system object at the specified path. The "pointer" is
				actually a number indicating the index within the =resources= array at which
				the object instance is located. If the creation of the instance is successful,
				the instance's "pointer" will be returned in the callback

				The path parameter must be absolute and not relative
			*/
		};

		_classPrototype.close = function (_resourceNumber, _callback) {
			/*
				Given a "pointer" to an open resource (ie, instance of a JsTerm.FileSystemObject subclass),
				removes that resource from the list of open resources. The result of the action will be
				delivered in the callback arguments.
			*/
		};

		_class.registerProperties ({
			_referenceCounter:{
				value:0
				/*
					A private property used to create unique identifiers for the resources.
				*/
			},
			_resources:{
				value:{}
				/*
					An array containing references to file system objects that are currently in use. To add
					an object to this array, call open. To remove a resource, call
					close.
				*/
			},
			_root:'root'
		});

		return _class;
	}
});
