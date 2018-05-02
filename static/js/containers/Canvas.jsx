import React, { Component } from 'react';
import { connect } from 'react-redux';

import { canvasActions } from '../actions';

class CanvasContainer extends Component {
    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            return dispatch(notes.fetchNotes());
        },
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            return dispatch(notes.deleteNote(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);