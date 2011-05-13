Uize.module ({
	name:'JsTerm.FileSystemObject.File',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype
		;

		_classPrototype.getContents = function (_callback) {
			_callback (this.get ('contents'))
		};

		_classPrototype.setContents = function (_newContent, _callback) {
			this.set ({contents:_newContent});
			_callback ();
		};

		_class.set ({
			contents:'',
			type:'file'
		})
		return _class;
	}
});
