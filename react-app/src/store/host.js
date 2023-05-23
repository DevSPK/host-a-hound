const CREATE_HOST = "host/CREATE_HOST";
const READ_HOST = "host/READ_HOST";
const READ_ALL_HOSTS = "host/READ_ALL_HOSTS";
const UPDATE_HOST = "host/UPDATE_HOST";
const DELETE_HOST = "host/DELETE_HOST";
const READ_YOUR_HOSTS = "host/READ_YOUR_HOSTS";


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

export const actionReadYourHosts = (hosts) => ({
    type: READ_YOUR_HOSTS,
    hosts
});


export const thunkReadAllHosts = () => async (dispatch) => {
    const response = await fetch("/api/host/", {
        method: "GET"
    });
   
    if (response.ok) {
        const hosts = await response.json();

        // console.log(
        // 	"this is hosts.hosts from thunkReadAllHosts",
        // 	hosts.hosts
        // );
        dispatch(actionReadAllHosts(hosts.hosts));
        return
    } else if (response.status === 404) {
        throw Error('404')
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkReadYourHosts = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/hosts`, {
        method: "GET"
    });
   
    if (response.ok) {
        const hosts = await response.json();

        // console.log(
        // 	"this is hosts.hosts from thunkReadYourHosts",
        // 	hosts.hosts
        // );
        dispatch(actionReadYourHosts(hosts.hosts));
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

// export const thunkAddHost = (host) => async (dispatch) => {
//     const { name, about, price_per_night, address, city, state, country, img_url, lat, lng } = host;
//     const hostResponse = await fetch("api/host/", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name, about, price_per_night, address, city, state, country, img_url, lat, lng
//         })
//     });

//     if (hostResponse.ok) {
//         const data = await hostResponse.json();

//             dispatch(actionCreateHost(data));
//             return hostResponse;
//         } else if (hostResponse.status < 500) {
//             const data = await hostResponse.json();
//             if (data.errors) {
//                 return data.errors;
//             }
//         } else {
//             return ['An error occurred. Please try again.']
//         }
//     }
// };

export const thunkAddHost = (host) => async (dispatch) => {
    const { name, about, price_per_night, address, city, state, country, img_url, lat, lng } = host;
    
    try {
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
        return Promise.resolve(data);
      } else {
        const data = await hostResponse.json();
        if (hostResponse.status < 500 && data.errors) {
          return Promise.reject(data.errors);
        } else {
          return Promise.reject(['An error occurred. Please try again.']);
        }
      }
    } catch (error) {
      console.error('Failed to add host:', error);
      return Promise.reject(['An error occurred. Please try again.']);
    }
  };

  

export const thunkUpdateHost = (host) => async (dispatch) => {
    const { id, name, about, price_per_night, address, city, state, country, img_url, lat, lng } = host;

    // console.log("this is host in thunk update host", host);
    const response = await fetch(`/api/host/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           name, about, price_per_night, address, city, state, country, img_url, lat, lng
        })
    });
    // console.log("this is response in thunkUpdateHost", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("this is data in thunkUpdateHost", data)
        dispatch(actionUpdateHost(data));
        return data;
    }
};

export const thunkRemoveHost = (hostId) => async (dispatch) => {
    const response = await fetch(`/api/host/${hostId}`, {
        method: "DELETE"
    });

    if (response.ok) dispatch(actionDeleteHost(hostId));
};

let initialState = {}

export default function hostReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_HOSTS: {

            // console.log("this is action.hosts in READ_ALL_HOSTS", action.hosts)
            
            const newState = {}
            action.hosts.forEach((host) => {
                newState[host.id] = host;
              });
              return newState;
        }
        case READ_YOUR_HOSTS: {

            // console.log("this is action.hosts in READ_YOUR_HOSTS", action.hosts)
            
            const newState = {}
            action.hosts.forEach((host) => {
                newState[host.id] = host;
              });
              return newState;
        }
        case READ_HOST: {

            let newState = {...state}
            newState[action.hostId]=action.host
            return newState
        }
        case CREATE_HOST: {
            let newState = {...state};
            newState[action.host.id] = action.host
            return newState
        }
        case UPDATE_HOST:{
            // console.log("this is action.host in UPDATE_HOST", action.host)
            let newState = {...state};
            newState[action.host.id] = action.host
            return newState
            }
        case DELETE_HOST:{
            let newState = {...state};
            delete newState[action.hostId]
            return newState
        }
        default:
            return state
    }
}