Uize.module ({
	name:'JsTerm.FileSystemObject',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
			_classPrototype = _class.prototype
		;

		_classPrototype.getContents = function () {
			// overridden in the children
			return '';
		},

		_classPrototype.setContents = function (_newContents) {
			// overridden in the children
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
});
