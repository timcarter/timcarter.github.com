/*
	Name: ShellCommand.Data.Ls
	Author: Tim Carter
	Description: Holds the information for files in the current directory
*/

Uize.module ({
	name:'ShellCommand.Data.Ls',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ()
		;

		_class.set ({
			value:{
				'readme.txt':{},
				'
			}
		})
		return _class;
	}
});
