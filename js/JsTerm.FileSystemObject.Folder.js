/*
	Name: JsTerm.FileSystemObject.Folder
	Author: Tim Carter
	Description: Static class representing a folder
*/

Uize.module ({
	name:'JsTerm.FileSystemObject.Folder',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		/*
			The value of a folder is going to be a Json object, not
			the text value that normally gets returned when a folder
			is opened in a text editor. The getContents call will
			be overridden to provide that information instead.
		*/
		_class.getContents = function () {
			// iterate over the information found in the value property
			return '';
		};

		return _class;
	}
});
