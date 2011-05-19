/*
	Name: JsTerm.Program
	Author: Tim Carter (timcarter@stanfordalumni.org)
	Description:
		Superclass that contains common functionality for all javascript classes representing shell commands. This class encompasses the handling of commandline arguments and the container node.
*/

Uize.module ({
	name:'JsTerm.Program',
	superclass:'Uize.Widget',
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (),
			_classPrototype = _class.prototype,
			_orderingEnum = {
				_REQUIRE_ORDER:0,
				_PERMUTE:1,
				_RETURN_IN_ORDER:2
			}
		;

		/*
			Given a hash of options, this tries to find a key for which _value might be an abbreviation. For example, if the _value is 'da' and the _option hash = {'date':1}, then this function would return the value of 'date'. If the _option hash is {dat:1,date:2}, then this function throws an error and discards due to the ambiguity. Returns the actual string requested.
		 */
		function _resolveAbbreviation (_options, _value) {
			if (_options [_value] ) return _value;

			var
				_ambiguousMatches = -1,
				_matchedOption
			;

			for (var _option in _options) {
				var _currOption = _options [_option];
				if (!_option.indexOf (_value)) {
					_matchedOption = _option;

					if (++_ambiguousMatches) alert ('way too many matches, dude');
				}
			}

			return _matchedOption;
		}
		/*
			Based loosely (depending on your definition of 'loose') on the GNU C getopt implementation. This function takes as input an array of arguments, usually passed from the command line and a set, or sets, of valid option elements. In return, it will iterate over the arguments array and return either an option character and an option argument (which may or may not exist) or a -1, indicating that the iteration has completed and no additional option elements remain.

			Unlike the C implementation, this method takes advantage of the fact that javascript allows the creation of arbitrary objects. The return value of this method is an object with three properties:
			{
				optionCharacter:'string' // a character or string, will be undefined if we've reached the non-option element part of the array
				optionArgument:'string' // the argument that goes along with the optionCharacter. If there is no argument, then this will be undefined.
				nonOptionElement:'string' // will be undefined until getopt iterates towards the end of the array
			}
		*/
		_classPrototype.getopt = function () {
			var
				_this = this,
				_arguments = _this._argv,
				_argumentsLength = _arguments.length,
				_longOptions = _this._longOptions,
				_currentIndex = _this._currentIndex || (_this._currentIndex = 0),
				_optionStringIndex = _this._optionStringIndex || (_this._optionStringIndex = 0),
				_returnObject = {}
			;

			// the name of the command is at index 0, so always start at 1
			for (;++_currentIndex < _argumentsLength;) {
				var
					_currentArgument = _arguments [_currentIndex]
				;

				// if we encounter a '--' then we need to stop checking for option elements and treat everything as a non-option element
				// on a side note, a standalone '-' is treated as a non-option (but you could have deduced that from the codepath.
				if (_currentArgument == '--')
					_this._treatAllAsNonOptions = true
				;
				else if (_this._treatAllAsNonOptions) { // we don't want to return '--', so make this an else if
					++_this._currentIndex;
					return {nonOptionElement:_currentArgument};
				}
				else if (_longOptions && !_currentArgument.indexOf ('--')) { // at some point we might have to restructure this to allow long optionElements to accept a single '-' as their precursor
					var
						_argumentArr = _currentArgument.substring(2).split ('='), // '--foo=bar' becomes ['foo','bar'] while '--foo' = ['foo']
						_argumentOptionString = _argumentArr[0],
						_targetOptionString = _longOptions [_argumentOptionString] ? _argumentOptionString : _resolveAbbreviation (_longOptions, _argumentOptionString) // because 'foo' can be resolved to 'foobar'
					;

					if (!_targetOptionString) {
						// unrecognized option string passed into the command line. Should notify the user about this, yea?
					}
					else {
						var
							_optionArguments = _longOptions [_targetOptionString] // 1 = no args, 2 = required arg, 3 = optional arg
						;

						if (_optionArguments == 1) {
							// advance the counter and return
							++_this._currentIndex;
							return {optionCharacter:_targetOptionString};
						}
						
						// when optionArguments == 2 or 3, then we need to find the argument. If we can't find one, in the case of 2 we need to complain, in the case of 3 we can just retire peacefully to the countryside and spend our days hunting for elk.
						if (_argumentArr[1]) { // the backside of '--foo=bar'
							++_this._currentIndex;
							return {optionCharacter:_targetOptionString,optionArgument:_argumentArr[1]};
						}
						else if (++_this._currentIndex < _argumentsLength) {
							// the only other place the argument can be is in the next element of argv, provided we're not at the end

							return {optionCharacter:_targetOptionString,optionArgument:_arguments [_this._currentIndex]};
						}

						// if we've reached this point, we haven't found an argument. if the optionArgument == 2, we should throw an error.
						if (_optionArguments == 3) {
							++_this._currentIndex;
							return {optionCharacter:_targetOptionString};
						}
						else {
							alert (_targetOptionString + ' is missing a required argument.');
						}
					}
				}
				else if (!_currentArgument.indexOf ('-')) { // option element with a character as an argument
					// this is slightly weirder because we can have -abc as a format where a, b, and c are all individual arguments
					if (!_currentArgument.indexOf ('--')) {
						// this should throw into an error state, as short options are not supposed to have '--'
						alert ('you formatted something incorrectly')
					}
					else if (_currentArgument.length == 2) {
						// this particular argument consists of only one character (-a). We need to determine whether or not it requires an argument, find that argument, and return the duo or throw an error message.
					}
					else {
						// there are a bunch of characters grouped together in this particular argument (ie, -abc). Before continuing, one should find out how this affects the arguments of those characters.
					}
				}
				else { // non-option element
				}
			}
		};

		/*** Public Instance Methods ***/
		_classPrototype.echo = function (_text) {
			Uize.Node.injectHtml (
				this.get ('shellNode'),
				_text + '<br/>',
				'inner bottom'
			)
		};

		_classPrototype.output = function (_message, _callback) {
			this.fire ({
				name:'Standard Output',
				message:_message,
				callback:_callback
			})
			/*
				Acts like standard output.
			*/
		};

		_classPrototype.input = function (_prompt, _callback) {
			this.fire ({
				name:'Standard Input',
				prompt:_prompt,
				callback:_callback
			})
			/*
				Acts like standard input; invokes the shell's input UI to get user data, which is then
				piped through the callback.
			*/
		};

		_classPrototype.error = function (_message, _callback) {
			this.fire ({
				name:'Standard Error',
				message:_message,
				callback:_callback
			});

			/*
				Acts like stderr.
			*/
		};

		_class.registerProperties ({
			_callback:{
				name:'callback',
				value: function () {}
			/*
				The function to call once execution is completed. In most cases, this will be JsTerm.Program.Bash's updateUi method. Yes, this is forecasting of a subclass in a superclass, but this is a comment, so I can do whatever the bleep I want (including bleeping instances of the word "fuck".
			*/
			},
			_shellNode:'shellNode',
			/*
				Not necessarily related in naming convention to this widget, =shellNode= merely contains the ID of the node (or the node) that simulates the flowing nature of the command prompt. It should get passed in whenever a command is entered by the user. The subclass =JsTerm.Program.Bash= sets it on its own, as it is usually the (new JsTerm.Program.Base).getNode ('container') that is the shellNode.
			*/
			_argv:{
				name:'argv',
				value:[]
			/*
				An argv array that emulates that found in C. The first argument is always the name of the command, so if you want the actual args, you need to start with arguments[1].
			*/
			},
			_optionString:'optionString',
			/*
				A string of available short options. A ':' after the character indicates that an argument is required, a "::" indicates that the argument is optional. The short and long options are separated because long options don't need to match exactly; they only need to match a substring (from the start of the long option value).
			*/
			_longOptions:'longOptions'
			/*
				A hash of available long options, in the following format:
				{
					'optionString':'A number, 1, 2, or 3, indicating whether an argument is not required, required, or optional'
				}
			*/
		});
		return _class;
	}	
});
