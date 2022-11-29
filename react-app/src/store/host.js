const CREATE_HOST = "host/CREATE_HOST";
const READ_HOST = "host/READ_HOST";
const READ_ALL_HOSTS = "host/READ_ALL_HOSTS";
const UPDATE_HOST = "host/UPDATE_HOST";
const DELETE_HOST = "host/DELETE_HOST";


export const actionCreateHost = (host) => ({
    type: CREATE_HOST,
    host
});

export const actionReadHost = (hostId) => {
    return {
        type: READ_HOST,
        hostId
    };
};

export const actionReadAllHosts = (hosts) => ({
    type: READ_ALL_HOSTS,
    hosts
});

export const actionUpdateHost = (host) => ({
    type: UPDATE_HOST,
    host
});

export const actionDeleteHost = (hostId) => ({
    type: DELETE_HOST,
    hostId
});



export const thunkReadAllHosts = () => async (dispatch) => {
    const response = await fetch("/api/host/", {
        method: "GET"
    });
    // console.log(
    // 	"This is response from thunkReadAllGroups",
    // 	response
    // );
    if (response.ok) {
        const hosts = await response.json();

        console.log(
        	"this is hosts.hosts from thunkReadAllHosts",
        	hosts.hosts
        );
        dispatch(actionReadAllHosts(hosts.hosts));
        return
    } else if (response.status === 404) {
        throw Error('404')
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkGetOneHost = (hostId) => async (dispatch) => {
    // console.log(
    // 	"this is hostId from thunkGetOneHost",
    // 	hostId
    // );
    const getHostResponse = await fetch(`/api/host/${hostId}`, {
        method: "GET"
    });

    if (getHostResponse.ok) {
        const host = await getHostResponse.json();
        // console.log("this is host in thunkGetOneHost", host)
        dispatch(actionReadHost(host));
        return host;
    }
};

export const thunkAddHost = (host) => async (dispatch) => {
    const { name, about, price_per_night, address, city, state, country, img_url, lat, lng } = host;
    const hostResponse = await fetch("api/host/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, about, price_per_night, address, city, state, country, img_url, lat, lng
        })
    });

    if (hostResponse.ok) {
        const data = await hostResponse.json();

            dispatch(actionCreateHost(data));
            return hostResponse;
        } else if (hostResponse.status < 500) {
            const data = await hostResponse.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.']
        }
    }
// };

export const thunkUpdateHost = (host) => async (dispatch) => {
    const { id, name, about, price_per_night, address, city, state, country, img_url, lat, lng } = host;

    console.log("this is host in thunk update host", host);
    const response = await fetch(`/api/host/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           name, about, price_per_night, address, city, state, country, img_url, lat, lng
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionUpdateHost(data));
        return data;
    }
};

export const thunkRemoveHost = (hostId) => async (dispatch) => {
    const response = await fetch(`/api/host/${hostId}`, {
        method: "DELETE"
    });
    // console.log(
    // 	"this is response from remove Group",
    // 	response
    // );

    if (response.ok) dispatch(actionDeleteHost(hostId));
};

let initialState = null

export default function hostReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_HOSTS:
            console.log("this is action.hosts", action.hosts)
            let hosts = action.hosts
            const newState = {}
            console.log(hosts)
            return hosts
        case CREATE_HOST:
            const stateCreateHost = {...action.hosts}
            return stateCreateHost
        case READ_HOST:
            const stateReadHost = {...action.hosts}
            return stateReadHost
        case UPDATE_HOST:
            const stateUpdateHost = {...action.hosts}
            return stateUpdateHost
        case DELETE_HOST:
            const stateDeleteHost = {...action.hosts}
            return stateDeleteHost
            // console.log("this is action.hosts", action.hosts)
            // let hosts = action.hosts
            // const newState = {}
            // hosts.forEach((host) => {
            //     newState[host.id] = host
            // })
            // console.log("this is newState in read_all_hosts", newState);
            // return newState
        default:
            return state
    }
}