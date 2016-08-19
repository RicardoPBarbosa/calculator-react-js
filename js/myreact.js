Array.prototype.solve = function(){

	if(isNaN(this[0])){
		if(this[0] == "√"){
			var arith = parseFloat(Math.sqrt(this[1]));
		}else{
			var arith = false;
		}
	}else{
		var arith = parseFloat(this[0]);
	}

	this.forEach(function(n, next){
		if(!isNaN(arith)){
			if(isNaN(n) && this[next + 1] && !isNaN(this[next + 1])){
				switch(n){
					case "+":
						arith += parseFloat(this[next + 1]);
					break;
					case "-":
						arith -= parseFloat(this[next + 1]);
					break;
					case "÷":
						arith /= parseFloat(this[next + 1]);
					break;
					case "x":
						arith *= parseFloat(this[next + 1]);
					break;
					case "√":

					break;
				}
			}else if(isNaN(n) && n == "²"){
				arith = parseFloat(Math.pow(arith, 2));
			}
		}
	}.bind(this));
	return arith;
}

var Calculator = React.createClass({

	getInitialState: function(){
		return {math:[
			["C", "√", "x²", "÷"],
			[7,    8,   9,   "x"],
			[4,    5,   6,   "-"],
			[1,    2,   3,   "+"],
			[".",  0,  "<",  "="]
		],
			expression: "",
			answer: 0,
			theme: "light",
			themePhrase: "Argh! My eyes!"
		}
	},

	updateExpression: function(val){
		if(val == "x²"){val = "²"}
		return this.setState({expression:this.state.expression + val});
	},

	doMath: function(val){
		if(val === "<"){return this.setState({expression:this.state.expression.substring(0, this.state.expression.length - 1)})}
		else if(val === "="){
			this.evaluateString();
		}else{return this.setState({expression:"", answer:0})}
	},

	evaluateString: function(){
		var reg = this.state.expression.replace(/[\+\-\x\÷\²\√]/g," $& ");
		reg = reg.split(" ");
		var update = reg.filter(function(val){return val != ""});
		update = update.solve();
		console.log(update);
		return update ? this.setState({answer:Math.round10(update, -3)}):this.setState({answer:"Error!"})
	},

	changeLight: function(theme){
		if(this.state.theme == "light"){
			$("body").css('background', '#333333');
			return this.setState({theme:"dark", themePhrase:"Uff, that's better."});
		}else{
			$("body").css('background', '#E5E5E5');
			return this.setState({theme:"light", themePhrase:"Argh! My eyes!"});
		}
	},

	render: function(){
		return (
			<div id="calculator">
				<div id="github"><a target="_blank" href="https://github.com/RicardoPBarbosa">VISIT MY GITHUB</a></div>
				<div id="result">
					<div id="currentMath"><p>{this.state.expression}</p></div>
					<div id="solution"><p>{this.state.answer}</p></div>
				</div>
				<div id="mathtable" className={this.state.theme === "light" ? "" : "mathtableD"}>
					{this.state.math.map(function(row, r){
						var rows = row.map(function(operand, o){
							return (
								<div key={o} className={this.state.theme === "light" ? "numoperand" : "numoperand numoperandD"} onClick={operand === "C" || operand === "<" || operand === "="? this.doMath.bind(null, operand) : this.updateExpression.bind(null, operand)}>
									{operand}
								</div>
							)
						}.bind(this))
						return (
							<div key={r} className={this.state.theme === "light" ? "rows" : "rows rowsD"}>
								{rows}
							</div>
						)
					}.bind(this))}
				</div>
				<div id="changeColor" onClick={this.changeLight.bind(null, this.state.theme)}>{this.state.themePhrase}</div>
			</div>
		)
	}
})

ReactDOM.render(<Calculator />, document.getElementById("app"));

// Solution from MDN to cut the number of decimals without rounding
function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
	  return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
	  return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
	Math.round10 = function(value, exp) {
	  return decimalAdjust('round', value, exp);
	};
}
