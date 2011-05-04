/*
	Name: ShellCommand.Bash
	Author: Tim Carter
	Description: Drops a bash prompt UI onscreen, waits for user input, attempts to execute the user command, gets control back afterwards
*/

Uize.module ({
	name:'ShellCommand.Bash',
	required:[
		'Uize.Template',
		'Uize.Node',
		'Uize.Node.Event'
	],
	builder:function (_superclass) {
		var
			_class = _superclass.subclass ( function () { this._clearHistory () } ), // init the history
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

			// split the string based by space, ignoring spaces that occur within quotations.
			function _parseArguments (_inputString) {
				var
					_argv = [],
					_quotationStack = [], // put quotations here to keep track of them
					_currArgument = ''
				;

				for (var _currCharIdx = -1, _inputStringLength = _inputString.length; ++_currCharIdx < _inputStringLength;) {
					var _currChar = _inputString [_currCharIdx];

					if (!_currChar.search (/\s/) && !_quotationStack.length && _currArgument) { // if we're not in quotes
						_argv.push (_currArgument);
						_currArgument = '';
					}
					else {
						_quotationStack.length && _quotationStack[0] == _currChar && _quotationStack.pop ();
						
						if (_currChar == '\'' || _currChar == '"') _quotationStack.push (_currChar); // we don't handle \' || \" yet

						_currArgument += _currChar;
					}
				}

				_currArgument && _argv.push (_currArgument);

				return _argv;

			}

			if (_this.isWired) {
				Uize.Node.injectHtml (
					_containerNode,
					'<span>anon@timcarter $ </span><input id=\'' + _this.get('idPrefix') + '-' + _inputCounter + '\' type=\'text\' /><br/>',
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
								'&nbsp;&nbsp;&nbsp;&nbsp;The command \'' + _command + '\' does not exist. Try again.<br/><br/>',
								'inner bottom'	
							);
							_this.execute ();
						}

						function _getClassName (_command) {
							return {
								'clear':'ShellCommand.Clear',
								'date':'ShellCommand.Date',
								'yes':'ShellCommand.Yes'
							} [_command]
						}

						if (Uize.Node.Event.isKeyEnter (_event)) {
							// shouldn't be wired anymore, as it's a dead node
							_this.unwireNode ( _inputNode, 'keydown');

							var
								_input = _this.getNodeValue (_inputNode), // input string
								_arguments = _parseArguments (_input),
								_commandName = _arguments [0],
								_commandClassName = _getClassName (_commandName)
							;

							if (_commandClassName)
								Uize.module ({
									required:_commandClassName,
									builder:function () {

										if (_commandClassName) {
											var _currCommand = _this.addChild (
												'command' + _history.length,
												(new Function ('try {return ' + _commandClassName + '} catch (e) {}')) (),
												{
													shellNode:_this.getNode ('container'),
													arguments:_arguments,
													callback:function () {
														_this.execute ()
													}
												}
											);
											
											_history.push (_input); // this might be moved

											_currCommand.wireUi ();
											_currCommand.execute ();	
										}
										else
											_informError (_commandName)
										;
									}
								})
							;
							else _informError (_commandName);
						}
						/*else if (Uize.Node.Event.isKeyUpArrow (_event)) {
							// show the history
							_this.setNodeValue (
								_inputCounter,
								_history [(++_this._keyUpCounter || (_this._keyUpCounter = 0))]
							)
						}
						else if (!Uize.Node.Event.isKeyUpArrow (_event)
							_this._keyUpCounter = -1
						;*/
					}	
				);

				_inputNode.focus ();	
			}
		};

		_classPrototype._clearHistory = function () { this._history = [] };

		_classPrototype.wireUi = function () {
			var
				_this = this
			;

			if (!_this.isWired) {
				_this.wireNode (
					'input',
					'keydown',
					function (_event) {
						var
							_isEnter = Uize.Node.Event.isKeyEnter (_event)
						;

						if (_isEnter)
							alert ('at this point, the command should execute');	
					}
				);
			}
			_superclass.prototype.wireUi.call (_this);
			
			_this.execute ();
		};

		return _class;
	}	
});
