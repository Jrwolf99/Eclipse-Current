const { createStore } = Redux;
const initState = {
  todos: [],
  posts: [],
};

const myreducer = (state = initState, action) => {
  if (action.type == "ADD_TODO") {
    return {
      ...state,
      todos: [...state.todos, action.todo],
    };
  }
  if (action.type == "ADD_TODO") {
  }
};

const store = createStore(myreducer);

store.subscribe(() => {
  console.log("State Updated");
  console.log(store.getState());
});

// //make action to change state
// const todoAction = {
//   type: 'ADD_TODO',
//   todo: 'buy milk'
// }

// //pass in action to the reducer to change state
// store.dispatch(todoAction)

store.dispatch({ type: "ADD_TODO", todo: "buy milk" });
store.dispatch({ type: "ADD_TODO", todo: "sleep some more" });
store.dispatch({ type: "ADD_TODO", todo: "Egg hunt" });
