Uize.module ({
	name:'JsTerm.FileSystemObject.Folder',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.getContents = function (_callback) {
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

		_classPrototype.setContents = function (_newContents, _callback) {
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
