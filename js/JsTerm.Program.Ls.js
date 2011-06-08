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
			_classPrototype = _class.prototype
		;

		_classPrototype.execute = function () {
			var
				_this = this,
				_callback = _this.get ('callback'),
				_resultsString = '',
				_workingDirectory = _this.getInherited ('filesystem').get ('workingDirectory'), // the parent must provide this somehow
				_workingDirectoryContents = _workingDirectory.get ('contents'),
				_arguments = _this.get ('argv'),
				_argumentNo = 0, // start at 1 (after initial increment) because argv[0] is the command name
				_argumentsLength = _arguments.length,
				_useSimple = true,
				_contentName
			;

			// determine whether -l was passed
			for (;++_argumentNo < _argumentsLength;) {
				if (_arguments [_argumentNo] == '-l') {
					_useSimple = false;
					break;
				}
			}

			if (_useSimple) {
				for (_contentName in _workingDirectoryContents)
					_resultsString +=
						_this._contentMarkupSimple({
							name:_contentName,
							isFolder:!_workingDirectoryContents [_contentName].indexOf ('JsTerm.FileSystemObject.Folder')
						})
				;

				_this.echo (_resultsString);
				_callback && typeof _callback == 'function' && _callback ();
			} else {
				
			}
		};

		_classPrototype.wireUi = function () {
			_superclass.prototype.wireUi.call (this);
		};

		_class.registerProperties ({
			_contentMarkupSimple:{
				value:
					Uize.Template.compile (
						'<span style="padding-right:30px">[% if (input.isFolder) { %]<strong>[% } %][% .name %][% if (input.isFolder) { %]</strong>[% } %]</span>',
						{
							openerToken:'[%',
							closerToken:'%]'
						}
					)
			},
			_contentMarkup:{
				value:
					Uize.Template.compile (
						'<div>[% .permissions %] [% .links %] [% .owner %] [% .group %] [% .timestamp %] [% .name %]</div>',
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

