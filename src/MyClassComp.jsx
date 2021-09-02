import React from "react";

class MyClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.names = [
      "Jen",
      "Jane",
      "Jim",
      "Jon",
      "Jack",
      "Jay",
      "Jade",
      "Jeff",
      "Jill",
      "Josh",
      "Jude",
      "Joe",
    ];
    this.state = {
      name: "",
      date: new Date(),
    };
  }

  // Life Cycle Method

  tick = () => this.setState({ date: new Date() });

  componentDidMount() {
    // this.timeId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  shuffle = () => {
    const i = Math.floor(Math.random() * this.names.length);
    this.setState({
      name: this.names[i],
      stateName: this.names[i],
      count: this.state.count + 1,
    });
  };

  render() {
    const { name, date } = this.state;
    return (
      <div>
        <h2> Hello, {name}👋 </h2> <h2> It is {date.toLocaleTimeString()} </h2>
        <button onClick={this.shuffle}> Click me </button>
      </div>
    );
  }
}

export default MyClassComp;
