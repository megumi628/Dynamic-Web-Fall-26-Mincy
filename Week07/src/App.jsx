/*
It watches the `cards` state, with the dependency array [cards]. The fact that all cards are matched lives inside `cards`; every card object has a matched property. setCards only updates these matched flags when a match is found, so we only need to run the win check at that moment. 
Listening to turns or choiceOne would be incorrect: those update on every card flip, while the cards state has not yet updated, so the check would read stale data.

cards.length > 0 &&
On initial page load, cards is []. [].every(...) always returns true for an empty array. Without this check, the game would immediately show “You win” before the New Game button is even clicked.

Because setChoiceTwo(card) only queues the state update; it does not take effect until the next render. If we read choiceTwo immediately afterward inside handleChoice, we still get null. 
This explains the unreachable if (choiceOne && choiceTwo) block in that code. Placing the comparison inside a useEffect with dependencies [choiceOne, choiceTwo] means it runs only after both values finish updating and the component re-renders, so we can read the latest state.
*/




import Grid from './components/Grid'

const App = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      <Grid />
    </div>
  )
}

export default App
