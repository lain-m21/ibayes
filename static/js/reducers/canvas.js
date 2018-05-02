const initialState = {};

export default function graphReducer(state=initialState, action) {
    switch (action.type) {
        case 'FETCH_NOTES':
            console.log('reducer FETCH_NOTES')
            console.log(action)
            return [...state, ...action.notes];

        case 'ADD_NOTE':
            return [...state, {text: action.text}];

        case 'UPDATE_NOTE':
            let noteToUpdate = noteList[action.id];
            noteToUpdate.text = action.text;
            noteList.splice(action.id, 1, noteToUpdate);
            return noteList;

        case 'DELETE_NOTE':
            noteList.splice(action.id, 1);
            return noteList;
        
        default:
            return state;
    }
}