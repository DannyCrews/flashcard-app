(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
var cards = function cards(state, action) {
  switch (action.type) {
    case 'ADD_CARD':
      var newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date()
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }
};

// create a store - we're writing a reducer here
// The state object below is the entire state tree
var store = Redux.createStore(Redux.combineReducers({
  cards: cards
}));

// The Redux.combineReducers() function replaces the function below
// which manually calls each reducer

//   function(state, action) {
//     return {
//       cards: cards(state.cards, action),
//       decks: decks(state.decks, action)
//     };
// });

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch({
  type: 'ADD_CARD',
  data: {
    front: 'front',
    back: 'back'
  }
});

store.dispatch({
  type: 'ADD_CARD',
  data: {}
});

},{}]},{},[1]);
