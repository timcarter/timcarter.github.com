var
	fs = require('fs'),

	dictionary = {},
	getTree = function() {
		var startingString = '---------',
			roots = [],
			index = -1,
			newRoot
		;

		for (;++index < 9;) {
			roots.push(getNode(startingString, 'x', index))
		}

		return roots;
	},
	getNode = function(string, character, index) {
		var node = {
				s:string.substring(0, index) + character + string.substring(index + 1),
				p:[0,0,0],
				c:[]
			},
			i = -1,
			childCharacter = character === 'x' ? 'o' : 'x',
			nodeString = node.s,
			stringLength = nodeString.length,
			outcome = getOutcome(node.s)
		;

		if (!outcome && nodeString.indexOf('-') !== -1) {
			var xScore = 0, oScore = 0, drawScore = 0, newNode, newNodeDirectOutcome;

			for (;++i < stringLength;) {
				if (nodeString[i] === '-') {
					newNode = getNode(nodeString, childCharacter, i);
					if (!newNodeDirectOutcome)
						newNodeDirectOutcome = getOutcome(newNode.s);

					node.c.push(newNode);

					xScore += newNode.p[0];
					oScore += newNode.p[1];
					drawScore += newNode.p[2];
				}
			}

			node.p[0] = !newNodeDirectOutcome ? (Math.round(xScore / node.c.length * 100) / 100 || 0) : +(newNodeDirectOutcome === 'x');
			node.p[1] = !newNodeDirectOutcome ? (Math.round(oScore / node.c.length * 100) / 100 || 0) : +(newNodeDirectOutcome === 'o');
			node.p[2] = Math.round(drawScore / node.c.length * 100) / 100 || 0;

		} else {
			if (outcome === 'x') node.p[0] = 1;
			else if (outcome === 'o') node.p[1] = 1;
			else node.p[2] = 1;
		}

		// if one of the probabilities is 1 then there's no point in having children
		if (node.p[0] === 1 || node.p[1] === 1 || node.p[2] === 1)
			delete node.c;

		dictionary[node.s] = node.p;
		return node;
	},

	horzORegex = new RegExp('^.*ooo.*$'),
	horzXRegex = new RegExp('^.*xxx.*$'),
	vertORegex = new RegExp('^.*o..o..o.*$'),
	vertXRegex = new RegExp('^.*x..x..x.*$'),
	diagORegex1 = new RegExp('o...o...o'),
	diagORegex2 = new RegExp('..o.o.o..'),
	diagXRegex1 = new RegExp('x...x...x'),
	diagXRegex2 = new RegExp('..x.x.x..'),
	getOutcome = function(string) {
		// returns an 'x', 'o', or null
		if (string.substring(0, 3) === 'ooo' || string.substring(3, 6) === 'ooo' || string.substring(6, 9) === 'ooo' || vertORegex.test(string) || diagORegex1.test(string) || diagORegex2.test(string))
			return 'o';
		if (string.substring(0, 3) === 'xxx' || string.substring(3, 6) === 'xxx' || string.substring(6, 9) === 'xxx' || vertXRegex.test(string) || diagXRegex1.test(string) || diagXRegex2.test(string))
			return 'x';
		else
			return null;
	},
	dontDieLogic = function(state, character, probabilitiesMap) {
		// given a game string, uses the dictionary to determine the best course of action.
		// this particular function will go for the move with the lowest probability of losing.
		// if there are multiple moves with equal probabilities, it then goes for that which
		// has the highest probability of winning.
		var i = -1,
			stateLength = state.length,
			possibleMoves = [],
			lossPosition = +(character === 'x') // in the probabilities array, p(x) == win is index 0 and p(o) is 1
			winPosition = +(!lossPosition)
		;

		for (;++i < stateLength;) {
			if (state[i] === '-') {
				possibleMoves.push([i, probabilitiesMap[state.substring(0, i) + character + state.substring(i+1)]]);
				console.log(state.substring(0, i) + character + state.substring(i+1) + JSON.stringify(probabilitiesMap[state.substring(0, i) + character + state.substring(i+1)]));
			}
		}

		possibleMoves.sort(function(first, second) {
			var firstProbability = first[1],
				secondProbability = second[1]
			;

			if (firstProbability[lossPosition] < secondProbability[lossPosition])
				return -1;
			if (firstProbability[lossPosition] > secondProbability[lossPosition])
				return 1;

			// otherwise, compare their probability of winning
			if (firstProbability[winPosition] > secondProbability[winPosition])
				return -1;
			if (firstProbability[winPosition] < secondProbability[winPosition])
				return 1;

			return 0;
		});

		return possibleMoves[0][0];
	}
;

//fs.writeFileSync('tree.json', JSON.stringify(getTree()));
//fs.writeFileSync('dictionary.json', JSON.stringify(dictionary));

var data = JSON.parse(fs.readFileSync('dictionary.json')),
	character = 'x'
	//gameBoard = '---------',
	gameBoard = 'xox-xoo--',
	index = dontDieLogic(gameBoard, character, data),
	outcome = gameBoard.substring(0, index) + character + gameBoard.substring(index+1)
;


console.log(index + ' ' + outcome);
//console.log(getOutcome('xooooxxxx'));
