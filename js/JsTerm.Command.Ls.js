/*
	Name: JsTerm.Command.Ls
	Author: Tim Carter
	Description: Lists all the files available in the current directory. Uses the JsTerm.Command.Data.Ls class as the data
		source.
*/

Uize.module ({
	name:'JsTerm.Command.Ls',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype,
			_br = '<br/>'
		;

		_classPrototype.execute = function () {
			// worry about the command line switches later
			var
				_this = this,
				_currentFiles = JsTerm.Command.Data.Ls.get ('value'),
				_resultString = ''
			;

			for (var fileName in _currentFiles) {
				_resultString += _currentFiles [_fileName] + _br
			}
			_resultsString = _resultsString.substring (0, _resultsString.length - _br.length); // strip the final <br/>

			_this.echo (_resultsString);
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		return _class;
	}
});

