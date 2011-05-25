/*
	Name: JsTerm.Program.Ls
	Author: Tim Carter
	Description: Lists all the files available in the current directory. Uses the JsTerm.Program.Data.Ls class as the data
		source.
*/

Uize.module ({
	name:'JsTerm.Program.Ls',
	required:'Uize.Template',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype,
			_eol = '<br/>'
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_callback = _this.get ('callback'),
				_resultsString = '',
				_workingDirectory = _this.getInherited ('workingDirectory'), // the parent must provide this somehow
				_workingDirectoryContents = _workingDirectory.get ('contents'),
				_contentName
			;

			for (_contentName in _workingDirectoryContents)
				_resultsString += _this._contentMarkupSimple({name:_contentName})
			;

			_this.echo (_resultsString);
			_callback && typeof _callback == 'function' && _callback ()	
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		_class.registerProperties ({
			_contentMarkupSimple:{
				value:
					Uize.Template.compile (
						'<span style="padding-right:30px">[% .name %]</span>',
						{
							openerToken:'[%',
							closerToken:'%]'
						}
					)
			},
			_contentMarkup:{
				value:
					Uize.Template.compile (
						'',
						{
							openerToken:'[%',
							closerToken:'%]'
						}
					)
			}
		});
		return _class;
	}
});

