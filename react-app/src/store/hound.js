const CREATE_HOUND = "hound/CREATE_HOST";
const READ_HOUND = "hound/READ_HOST";
const READ_ALL_HOUNDS = "hound/READ_ALL_HOUNDS";
const UPDATE_HOUND = "hound/UPDATE_HOUND";
const DELETE_HOUND = "hound/DELETE_HOUND";

export const actionCreateHound = (hound) => ({
    type: CREATE_HOUND,
    hound
});

export const actionReadHound = (houndId) => ({
        type: READ_HOUND,
        houndId
});

export const actionReadAllHounds = (hounds) => ({
    type: READ_ALL_HOUNDS,
    hounds
});

export const actionUpdateHound = (hound) => ({
    type: UPDATE_HOUND,
    hound
});

export const actionDeleteHound = (houndId) => ({
    type: DELETE_HOUND,
    houndId
});

export const thunkAddHound = (hound) => async (dispatch) => {
    const {name, description, age, spayed_neutered, img_url} = hound;

    const houndResponse = await fetch("api/hound", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, description, age, spayed_neutered, img_url
        })
    });

    if (houndResponse.ok) {
        const data = await houndResponse.json();

        dispatch(actionCreateHound(data));
        return houndResponse;
    } else if (houndResponse.status < 500) {
        const data = await houndResponse.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const thunkGetOneHound = (houndId) => async (dispatch) => {
    const getHoundResponse = await fetch(`/api/hound/${houndId}`, {
        method: "GET"
    });

    if (getHoundResponse.ok) {
        const hound = await getHoundResponse.json();
        dispatch(actionReadHound(hound));
        return hound
    }
};

export const thunkReadAllHounds = () => async (dispatch) => {
    const response = await fetch("/api/hound/", {
        method: "GET"
    });
    if (response.ok) {
        const hounds = await response.json();

        dispatch(actionReadAllHounds(hounds.hounds));
        return
    } else if (response.status === 404) {
        throw Error('404')
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const thunkUpdateHound = (hound) => async (dispatch) => {
    const {id, name, description, age, spayed_neutered, img_url} = hound;


    console.log("this is hound in thunk update hound", hound);
    const response = await fetch(`/api/hound/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, description, age, spayed_neutered, img_url
        })
    });
    
    if (response.ok) {
        const data = await response.json();
        
        dispatch(actionUpdateHound(data));
        return data;
    }
};

export const thunkRemoveHounds = (houndId) => async (dispatch) => {
    const response = await fetch(`/api/hound/${houndId}`, {
        method: "DELETE"
    });

    if (response.ok) dispatch(actionDeleteHound(houndId));
};


let initialState = {}

export default function houndReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_HOUNDS: {
            const newState = {}
            action.hounds.forEach((hound) => {
                newState[hound.id] = hound;
              });
              return newState;
        }
        case READ_HOUND: {
            let newState = {...state}
            newState[action.hostId]=action.hound
        }
        case CREATE_HOUND: {
            let newState = {...state};
            newState[action.hound.id] = action.hound
            return newState
        }
        case UPDATE_HOUND:{
            let newState = {...state};
            newState[action.hound.id] = action.hound
            return newState
            }
        case DELETE_HOUND:{
            let newState = {...state};
            delete newState[action.hostId]
            return newState
        }
        default:
            return state
    }
};