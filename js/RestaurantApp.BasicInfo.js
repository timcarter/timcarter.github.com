Uize.module ({
	name:'RestaurantApp.BasicInfo',
	required:[
		'Uize.Widget.Form'
	],
	builder:function (_superclass) {
		var
			_class = _superclass.subclass (
				null,
				function () {
					var
						_this = this
					;

					_this.addChild (
						'form',
						Uize.Widget.Form,
						{
						}
					);
				}
			),
			_classPrototype = _class.prototype
		;

		_class.registerProperties ();

		return _class;
	}
});
