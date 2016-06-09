//need to be thinking about our state shape
//
//  generally good to have as many top level id's as possible
//  don't have a lot of nested objects in arrays, use id's
//  {
//    cards:[{deckId: 123}],
//    decks: []
//    
//    
//  }
//  have a reducer for each top level property
//  this state object is only current value of the cards property
const cards = (state, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }
};

// create a store - we're writing a reducer here
// The state object below is the entire state tree
const store = Redux.createStore(Redux.combineReducers({
  cards
}));

// The Redux.combineReducers() function replaces the function below
// which manually calls each reducer

//   function(state, action) {
//     return {
//       cards: cards(state.cards, action),
//       decks: decks(state.decks, action)
//     };
// });

// Create a pure React component:
const App = (props) => {
  return (<div className='app'>
    {props.children}
    
  </div>);
};

// here we create a std React component
const Sidebar = React.createClass({
  render() {
    let props = this.props;

    return (<div className='sidebar'>
      <h2> All Decks </h2>
      <ul>
      {props.decks.map((deck, i) =>
        <li key={i}> {deck.name} </li>
        )}
      </ul>
      {props.addingDeck && <input ref='add' /> }
    </div>);
  }
});

ReactDOM.render((<App>
  <Sidebar decks={[ { name: 'Deck 1' } ]} addingDeck={true} />
</App>), document.getElementById('root'));



















