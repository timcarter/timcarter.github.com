Uize.module ({
	name:'Uize.TreeNode',
	required:[
		'Uize.Comm'
	],
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/

		/*** Constructor ***/
			var
				_class = _superclass.subclass (
					null,
					function () {
						var
							_this = this
						;

						_this._nodes = [];
						_this._parent;
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Querying ***/
			_classPrototype.getChildNodes = function () {
				return this._nodes;
			};

			_classPrototype.getParent = function () {
				return this._parent;
			};

		/*** Pruning and Grafting ***/
			_classPrototype.removeNode = _classPrototype.prune = function (_subtreeRoot) {
				/**
 					Uize.TreeNode.removeNode
 						Description: Removes the subtree whose root is passed into the method.
						Parameters:
							@subtreeRoot - An immediate child of this that is the root of the subtree to be removed.
				*/
				var
					_this = this,
					_nodes = _this._nodes,
					_index = _nodes.length
				;

				for (;--_index >= 0;) {
					if (_nodes [_index] === _subtreeRoot) {
						_nodes.splice (_index, 1);
						break;
					}
				}
				_subtreeRoot._parent = undefined;

				_this.fire ({
					name:'Subtree Pruned',
					subtree:_subtreeRoot
				});
			};


			_classPrototype.addNode = _classPrototype.graft = function (_subtreeRoot) {
				/**
 					Uize.TreeNode.removeNode
 						Description: Adds the subtree whose root is passed into the method.
						Parameters:
							@subtreeRoot - An immediate child of this that is the root of the subtree to be added.
						TODO: Add support for sorting the children.
				*/
				var
					_this = this
				;

				_this._nodes.push (_subtreeRoot);
				_subtreeRoot._parent = _this;

				_this.fire ({
					name:'Subtree Grafted',
					subtree:_subtreeRoot
				});
			};

		/*** Traversal ***/
			_classPrototype.walk = function (_mode, _walkFunction, _callback) {
				/**
 					Uize.TreeNode.walk
 						Description: Walks the tree with this as root.
						Parameters:
							@mode - The type of traversal: 'pre-order', when the parent is traversed before the children;
									'post-order', when the children are traversed before the parent; 'in-order', when the
									left child is traversed before the parent, followed by the right (this occurs only for
									binary trees); 'level-order', when a breadth-first walk occurs.
							@walkFunction - A function that processes all the nodes walked. The function should be assumed
											to be asynchronous and accept a node as the first parameter and a callback as
											the second. The callback accepts a boolean parameter. If the parameter is false,
											the walk will halt.
							@callback - A function that will be called once the walk is completed. The function will have
										one parameter: a boolean that is true if the full traversal occurred and false
										otherwise.
				*/
				var
					_this = this,
					_nodes = _this._nodes,
					_isModePreOrder = _mode === 'pre-order',
					_nodesToWalk = [_this],
					_nodesToOrder = (_nodes || []).concat (),
					_currNodeToOrder,
					_potentialParent,
					_currNodeToOrderChildren
				;

				_isModePreOrder && _nodesToOrder.reverse ();

				while (_currNodeToOrder = _nodesToOrder.shift ()) {
					_currNodeToOrderChildren = _currNodeToOrder.getChildNodes ();
					if (_mode !== 'level-order') {
						for (var _index = _nodesToWalk.length; --_index >= 0;) {
							_potentialParent = _nodesToWalk [_index];
							if (_potentialParent == _currNodeToOrder._parent) {
								if (_mode === 'in-order' && _potentialParent._nodes.length === 2) {
									_nodesToWalk.splice (
										_potentialParent._nodes [0] == _currNodeToOrder ? _index : _index + 1,
										0,
										_currNodeToOrder
									);
								} else if (_isModePreOrder || _mode === 'post-order') {
									_nodesToWalk.splice (
										_mode === 'post-order' ? _index : _index + 1,
										0,
										_currNodeToOrder
									);

									// the order of the children need to be reversed so that they're added
									// to the walk list correctly for 'pre-order'
									_isModePreOrder && (_currNodeToOrderChildren = [].concat (_currNodeToOrderChildren)).reverse ();
								}
							}
						}
					} else {
						// level order maintains a strict queue
						_nodesToWalk.push (_currNodeToOrder);
					}

					// shift the current node's children to the queue to process
					_nodesToOrder = _nodesToOrder.concat (_currNodeToOrderChildren);
				}

				_superclass.Comm.processArrayAsync (
					_nodesToWalk,
					_walkFunction,
					_callback
				);
			};

		_class.registerProperties ({
			/**
				data: a property of the tree node that can contain any arbitrary data.
			*/
			_data:'data'
		});

		return _class;
	}
});
