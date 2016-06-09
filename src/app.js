//Actions
//  ADD DECK
//  SHOW ADD DECK
//  HIDE ADD DECK
//  
// Action creators
const addDeck = name => ({ type: 'ADD_DECK',data: name });
const showAddDeck = () => ({type: 'SHOW_ADD_DECK'});
const hideAddDeck = () => ({type: 'HIDE_ADD_DECK'});

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

const decks = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck = { name: action.data, id: +new Date };
      return state.concat([newDeck]);
      default:
        return state || [];
  }
};

const addingDeck = (state, action) => {
  switch (action.type) {
    case 'SHOW_ADD_DECK': return true;
    case 'HIDE_ADD_DECK': return false;
    default: return !!state; //state || false;
  }
};

// create a store - we're writing a reducer here
// The state object below is the entire state tree
const store = Redux.createStore(Redux.combineReducers({
  cards,
  decks,
  addingDeck
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

function run () {
  let state = store.getState();
  console.log(state);
  ReactDOM.render((<App>
  <Sidebar decks={state.decks} addingDeck={state.addingDeck} />
</App>), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));




















