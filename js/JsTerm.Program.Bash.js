/*
	Name: JsTerm.Program.Bash
	Author: Tim Carter
	Description: Drops a bash prompt UI onscreen, waits for user input, attempts to execute the user command, gets control back afterwards
*/

Uize.module ({
	name:'JsTerm.Program.Bash',
	required:[
		'Uize.Template',
		'Uize.Node',
		'Uize.Node.Event',
		'JsTerm.FileSystem',
		'JsTerm.FileSystemObject.Folder.Root'
	],
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (
			function () { this._clearHistory () },
			function () {
				var
					_this = this
				;

				if (!_this._filesystem) {
					var
						_root = new JsTerm.FileSystemObject.Folder.Root
					;

					_this.set ({
						_filesystem:
							new JsTerm.FileSystem ({
								root:_root,
								workingDirectory:_root
							})
					})
				}
			}
			),
			_classPrototype = _class.prototype
		;

		_classPrototype.getCurrentInput = function () {
			return this.getNode ('input' + (this._counter || 0))
		};

		_classPrototype.execute = function () {
			var
				_this = this,
				_containerNode = _this.getNode ('container'),
				_inputCounter = 'input' + (++_this._counter || (_this._counter = 0)),
				_history = _this._history
			;

			/*
				Parses anything that comes after the program name and attempts to sort them into an arguments array.
				The recognized format is a subset of Unix's cli argument convention. Arguments can either be single
				words (commandName argument1 argument2) or follow the "--argumentName=argumentValue" pattern.
			*/
			function _parseArguments (_inputString) {
				var
					_argv = [],
					_quotationStack = [], // put quotations here to keep track of them
					_currArgument = '',
					_optionString = ''
				;

				for (var _currCharIdx = -1, _inputStringLength = _inputString.length; ++_currCharIdx < _inputStringLength;) {
					var _currChar = _inputString [_currCharIdx];

					if (!_currChar.search (/\s/) && !_quotationStack.length && _currArgument) { // if we're not in quotes
						_argv.push (_currArgument);
						if (!_optionString)
							_optionString = _inputString.substring (_currCharIdx)
						;
						_currArgument = '';
					}
					else {
						_quotationStack.length && _quotationStack[0] == _currChar && _quotationStack.pop ();
						
						if (_currChar == '\'' || _currChar == '"') _quotationStack.push (_currChar); // we don't handle \' || \" yet

						_currArgument += _currChar;
					}
				}

				_currArgument && _argv.push (_currArgument);

				return {
					argv:_argv,
					optionString:_optionString
				};
			}

			if (_this.isWired) {

				Uize.Node.injectHtml (
					_containerNode,
					_this._template ({
						username:_this._username,
						host:_this._host,
						id:_this.get ('idPrefix') + '-' + _inputCounter,
						path:_this._filesystem.get ('workingDirectory').get ('name')
					}),
					'inner bottom'
				);
			
				var
					_inputNode = _this.getNode (_inputCounter)
				;

				_this.wireNode (
					_inputNode,
					'keydown',
					function (_event) {
						function _informError (_command) {
							Uize.Node.injectHtml (
								_containerNode,
								'bash: ' + _command + ': command not found<br/><br/>',
								'inner bottom'	
							);
							_this.execute ();
						}

						function _getClassName (_command) {
							return {
								'cd':function (_argumentsObject, _callback) {
									_this._filesystem.open (
										_argumentsObject.argv[1],
										function (_fp) {
											console.log (_fp)
											_fp != JsTerm.FileSystem.UNDEFINED_FILE_HANDLE &&
												_this._filesystem.set ({
													workingDirectory:_this._filesystem.get ('resources')[_fp]
												})
											;
											_callback ();
										}
									)
								},
								'clear':'JsTerm.Program.Clear',
								'date':'JsTerm.Program.Date',
								'history':function (_argumentsObject, _callback) {
									for (
										var
											_echoedString = '',
											_historyIdx = -1,
											_historyLength = _history.length
										;
										++_historyIdx < _historyLength;
									)
										_echoedString += (_historyIdx+1) + ' ' + _history [_historyIdx] + '<br/>'
									;
									_this.echo (_echoedString);
									_callback ();
								},
								'echo':function (_argumentsObject,_callback) {
									_this.echo (_argumentsObject.optionString);
									_callback ();
								},
								'ls':'JsTerm.Program.Ls',
								'pwd':function (_argumentsObject, _callback) {
									_this.echo (_this._filesystem.get ('workingDirectory').get ('name'));
									_callback ();
								},
								'show_args':'JsTerm.Program.ShowArgs',
								'yes':'JsTerm.Program.Yes',
								'whoami':function (_argumentsObject, _callback) {
									_this.echo (_this._username);
									_callback ();
								}
							} [_command]
						}

						if (Uize.Node.Event.isKeyEnter (_event)) {
							// shouldn't be wired anymore, as it's a dead node
							_this.unwireNode ( _inputNode, 'keydown');

							var
								_input = _this.getNodeValue (_inputNode), // input string
								_argumentsObject = _parseArguments (_input),
								_arguments = _argumentsObject.argv,
								_commandName = _arguments [0],
								_commandClassName = _getClassName (_commandName)
							;

							_input && _history.push (_input);

							if (typeof _commandClassName == 'function')
								_commandClassName (_argumentsObject,function (){_this.updateUi ()})
							;
							else if (_commandClassName)
								Uize.module ({
									required:_commandClassName,
									builder:function () {

										if (_commandClassName) {
											var _currCommand = _this.addChild (
												'command' + _history.length,
												(new Function ('try {return ' + _commandClassName + '} catch (e) {}')) (),
												{
													shellNode:_this.getNode ('container'),
													argv:_arguments,
													optionString:_argumentsObject.optionString,
													callback:function () {_this.updateUi ()}
												}
											);

											_currCommand.wireUi ();
											_currCommand.execute ();	
										}
										else
											_informError (_commandName)
										;
									}
								})
							;
							else if (!_commandName) _this.execute ();
							else _informError (_commandName);

							Uize.Node.Event.abort (_event);
						}

						if (++_this._keyUpCounter < _history.length && Uize.Node.Event.isKeyUpArrow (_event))
							// show the history
							_this.setNodeValue (
								_inputCounter,
								_history [(++_this._keyUpCounter || (_this._keyUpCounter = 0))]
							)
						;
						else
							_this._keyUpCounter = -1
						;
					}	
				);

				_inputNode.focus ();
			}
		};

		_classPrototype._clearHistory = function () { this._history = [] };

		_classPrototype.updateUi = function () {
			var
				_this = this
			;

			if (_this.isWired) {
				Uize.Node.injectHtml (
					_this.getNode ('container'),
					'<br/>',
					'inner bottom'
				);
				_this.execute ();

				_superclass.prototype.updateUi.call (_this);
			}
		};

		_classPrototype.wireUi = function () {
			var _this = this;
			if (!_this.isWired) {
				var
					_shellNode = _this.get ('shellNode')
				;
				!_shellNode && _this.set ({shellNode:_this.getNode ('container')});

				_superclass.prototype.wireUi.call (_this);
			}
		};

		_class.registerProperties ({
			_username:{
				name:'username',
				value:'anonymous'
			},
			_history:{},
			_host:{
				name:'host',
				value:'localhost'
			},
			_commandLineTemplate:{
				name:'commandLineTemplate',
				onChange:function () {
					this._template =
						Uize.Template.compile (
							this._commandLineTemplate,
							{
								openerToken:'[%',
								closerToken:'%]'
							}
						)
				},
				value:'<span>[% .username %]@[% .host %]:[% .path %]$</span><input id=\'[% .id %]\' type=\'text\' />'
			},
			_keyUpCounter:{
				value:-1
			},
			_filesystem:'filesystem',
			_template:{}
		});

		return _class;
	}	
});
