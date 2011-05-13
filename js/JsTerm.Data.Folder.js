/*
	Name: JsTerm.Data.Folder
	Author: Tim Carter
	Description: Static class representing a folder
*/

Uize.module ({
	name:'JsTerm.Data.Folder',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.getValue = function (_callback) {
			if (_class._loaded)
				_superclass.getValue (_callback)
			;
			else {
				var
					_deferredValue = _class._deferredValue,
					_deferredValueLength = _class._deferredValue.length,
					_deferredValueIndex = -1,
					_evaluatedValue = [],
					_fileSystemObject
				;

				Uize.module ({
					required:_deferredValue,
					builder:function (_superclass) {
						for (;++_deferredValueIndex < _deferredValueLength;)
							(_fileSystemObject = (new Function ('try {return ' + _deferredValue [_deferredValueIndex] + '} catch (e) {}'))) && (_evaluatedValue.push (_fileSystemObject))
						;
						_class.set ({_loaded:true, value:_evaluatedValue});
						_callback (_class.get ('value'));
					}
				});
			}
		};

		_class.registerProperties ({
			_deferredValue: {
				name:'deferredValue',
				value:[]
			},
			_loaded: {
				/*
					Most folders will need to load their contents dynamically (ie, through module calls)
				*/
				name:'loaded',
				value:false
			}
		});

		return _class;
	}
});
