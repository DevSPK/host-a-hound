// const CREATE_HOST = "host/CREATE_HOST";
// const READ_HOST = "host/READ_HOST";
const READ_ALL_HOSTS = "host/READ_ALL_HOSTS";
// const UPDATE_HOST = "host/UPDATE_HOST";
// const DELETE_HOST = "host/DELETE_HOST";


// export const actionCreateHost = (host) => ({
//     type: CREATE_HOST,
//     host
// });

// export const actionReadHost = (hostId) => {
//     return {
//         type: READ_HOST,
//         hostId
//     };
// };

export const actionReadAllHosts = (hosts) => ({
    type: READ_ALL_HOSTS,
    hosts
});

// export const actionUpdateHost = (host) => ({
//     type: UPDATE_HOST,
//     host
// });

// export const actionDeleteHost = (hostId) => ({
//     type: DELETE_HOST,
//     hostId
// });



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
        	"this is hosts from thunkReadAllHosts",
        	hosts
        );
        dispatch(actionReadAllHosts(hosts));
        return
    } else if (response.status === 404) {
        throw Error('404')
    } else {
        return ['An error occurred. Please try again.']
    }
}

// export const thunkGetOneHost = (hostId) => async (dispatch) => {
//     // console.log(
//     // 	"this is groupId from thunkGetOneGroup",
//     // 	groupId
//     // );
//     const getHostResponse = await fetch(`api/host/${hostId}`, {
//         method: "GET"
//     });

//     if (getHostResponse.ok) {
//         const host = await getHostResponse.json();
//         dispatch(actionReadHost(host));
//         return getHostResponse;
//     }
// };

// export const thunkAddHost = (host) => async (dispatch) => {
//     const { name, about, type, privateVal, city, state, imageUrl } = host;
//     const hostResponse = await fetch("api/hosts", {
//         method: "POST",

//         body: JSON.stringify({
//             name,
//             about,
//             type,
//             private: privateVal,
//             city,
//             state
//         })
//     });
//     if (hostResponse.ok) {
//         const data = await hostResponse.json();

//         const { id } = data;

//         // console.log("this is data from groupResponse", data);
//         // console.log("this is id from groupresponse.body", id);

//         const imageResponse = await fetch(`api/hosts/${id}/images`, {
//             method: "POST",

//             body: JSON.stringify({
//                 url: imageUrl,
//                 preview: true
//             })
//         });
//         if (imageResponse.ok) {
//             // const imgageData = await imageResponse.json()
//             dispatch(actionCreateHost(data));
//             return hostResponse;
//         }
//     }
// };

// export const thunkUpdateHost = (host) => async (dispatch) => {
//     const { name, about, type, privateVal, city, state } = host;

//     // console.log("this is group in thunk update group", host);
//     const response = await fetch(`/api/groups/${host.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name,
//             about,
//             type,
//             private: privateVal,
//             city,
//             state
//         })
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(actionUpdateHost(data));
//         return data;
//     }
// };

// export const thunkRemoveGroup = (hostId) => async (dispatch) => {
//     const response = await fetch(`/api/host/${hostId}`, {
//         method: "DELETE"
//     });
//     // console.log(
//     // 	"this is response from remove Group",
//     // 	response
//     // );

//     if (response.ok) dispatch(actionDeleteHost(hostId));
// };

let initialState = null

export default function hostReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_HOSTS:
            console.log("this is action.hosts", action.hosts)
            let hosts = action.hosts
            const newState = {}
            console.log(hosts)
            return hosts
        default:
            return state
    }
}