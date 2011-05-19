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
				_contentName,
			;
			
			for (_contentName in _contents) {
				if (_contentName == _immediatePath) {
					var _content = _contents [_contentName];
					if (_path.length) {
						// we haven't reached the final object we want, so keep going
						!_content.indexOf ('JsTerm.FileSystemObject.Folder') ?
							_content.resolve (_path, _callback) :
							_callback (null) // the content is a file, so there's an error
					}
					else
						// return what we've found
						_callback (_content)
					;
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

		_classPrototype.read = function (_callback) {
			var
				_this = this
			;

			if (_this._loaded)
				_callback (_this._contents)
			;
			else {
				var
					_deferredContents = _this._deferredContents,
					_deferredContentsLength = _deferredContents.length,
					_deferredContentsIndex = -1,
					_evaluatedContents = [],
					_evaluatedContent
				;

				Uize.module ({
					required:_deferredContents,
					builder:function () {
						for (;++_deferredContentsIndex < _deferredContentsLength;)
							(_evaluatedContent = (new _Function ('try {return ' + _deferredContents [_deferredContentsIndex]+ '} catch (e) {}')) ()) && (_evaluatedContents.push (_evaluatedContent))
						;

						_this.set ({contents:_evaluatedContents, _loaded:true});

						_callback (_this._contents);
					}
				});
			}
		};

		_classPrototype.write = function (_newContents, _callback) {
		};

		_class.registerProperties ({
			_deferredContents:{
				name:'deferredContents',
				value:[]
				/*
					Using =deferredContents= means we probably don't have to add the content files to the required property
				*/
			},
			_loaded:{
				name:'loaded',
				value:false
			}
		});

		_class.set ({
			contents:[],
			type:'folder'
		}); // initialize to an empty array
		return _class;
	}
});
