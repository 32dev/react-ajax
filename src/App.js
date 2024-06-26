
import './App.css';
import React, { Component } from 'react';
class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <div>{this.props.desc}</div>
      </article>
    );
  }
}
class Nav extends Component {
  state = {
    list: [],
    isLoaded: false
  }
  componentDidMount() {

    fetch('list.json')
      .then(function (result) {
        return result.json();
      })
      .then(function (json) {
        console.log(json);
        this.setState({ list: json });
      }.bind(this))

  }
  render() {
    var listTag = [];
    for (let i = 0; i < this.state.list.length; i++) {
      var li = this.state.list[i];
      listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function (e) {
            e.preventDefault();
            console.log('trigger');
            this.props.onClick(e.target.dataset.id)
          }.bind(this)}>
            {li.title}
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    )
  }
}
class App extends Component {
  state = {
    article: { title: 'Welcome', desc: 'Hello, React & Ajax' }
  }
  render() {
    return (
      <div className="App">
        <h1>
          Web
        </h1>
        <Nav onClick={function (id) {
          console.log(id);
          fetch(id + '.json')
            .then(function (result) {
              console.log("result:" + result)
              return result.json();
            })
            .then(function (json) {
              this.setState({
                article: {
                  title: json.title,
                  desc: json.desc
                }
              })
            }.bind(this));
        }.bind(this)}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc} />
      </div>
    );
  }
}

export default App;
