var Calculator = React.createClass({

	getInitialState: function(){
		return {math:[
			["C", "√", "x²", "÷"],
			[7,    8,   9,   "x"],
			[4,    5,   6,   "-"],
			[1,    2,   3,   "+"],
			[".",  0,  "<",  "="]
		]}
	},

	keyPressed: function(operand){
		console.log(operand);
	},

	render: function(){
		return (
			<div id="calculator">
				<div id="result">
					<div id="currentMath"><p>123+23</p></div>
					<div id="solution"><p>146</p></div>
				</div>
				<div id="mathtable">
					{this.state.math.map(function(row, r){
						var rows = row.map(function(operand, o){
							return (
								<div key={o} className="numoperand" onClick={this.keyPressed.bind(null, operand)}>
									{operand}
								</div>
							)
						}.bind(this))
						return (
							<div key={r} className="rows">
								{rows}
							</div>
						)
					}.bind(this))}
				</div>
			</div>
		)
	}
})

ReactDOM.render(<Calculator />, document.getElementById("app"));