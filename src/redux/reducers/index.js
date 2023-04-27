import dataMain from '../../data/dataMain.json'

const initiValue = {
    data: dataMain,
    coinList: [],
    advancedFilter: false
}

function reducer(state = initiValue, action) {
    switch (action.type) {
        case "Exclusive coins":
            return state = {
                ...state,
                coinList: action.payload
            };
        case "FILTERED":
            return state = {
                ...state, 
                coinList : action.payload
            }
        case "ADVANCED FILTERED":
            return state = {
                ...state,
                coinList : action.payload
            }
        default:
            return state;
    }
}

export default reducer;
