/*
	Name: JsTerm.Program.Ls
	Author: Tim Carter
	Description: Lists all the files available in the current directory. Uses the JsTerm.Program.Data.Ls class as the data
		source.
*/

Uize.module ({
	name:'JsTerm.Program.Ls',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype,
			_eol = '<br/>'
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_resultsString = '',
				_workingDirectory = _this.getInherited ('workingDirectory'), // the parent must provide this somehow
				_workingDirectoryContents = _workingDirectory.get ('contents'),
				_contentName
			;

			for (_contentName in _workingDirectoryContents)
				_resultsString += _contentName + _eol
			;

			// strip the final <br/>
			_this.echo (_resultsString.substring (0, _resultsString.length - _eol.length));
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});

