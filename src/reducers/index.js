const initialState = {
  user: {}, // {givenName: <giveName>, familyName: <familyName> ...}
  currentItem: {}, // <item>
  favorites: [], // [{id: <id1>}, {id: <id2>}, ...]
};

// action = {user: <user>}, user is {givenName: <giveName>, familyName: <familyName> ...}
const setUser = (state, action) => {
  return {
    user: action.payload.user,
    currentItem: state.currentItem,
    favorites: state.favorites,
  };
};

// action = payload: {favorites: [<item1>, <item2>, ...]}
const setFavorites = (state, action) => {
  let favItems = action.payload.favorites;
  let newFavorites = [];
  for (var idx in favItems) {
    let item = favItems[idx];
    newFavorites.push({ id: item.id });
  }
  return {
    user: state.user,
    currentItem: state.currentItem,
    favorites: newFavorites,
  };
};

// Move this to util after done
// Deep copy of an Object
const deepCopyObject = (inObject) => {
  let outObject, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] =
      typeof value === "object" && value !== null
        ? deepCopyObject(value)
        : value;
  }
  return outObject;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      // action = payload: {user: <user>}
      return setUser(state, action);
    case "SET_FAVORITES":
      // action = payload: {favorites: [<item1>, <item2>, ...]}
      return setFavorites(state, action);
    default:
      return state;
  }
};
