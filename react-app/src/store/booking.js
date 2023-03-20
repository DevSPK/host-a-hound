const CREATE_BOOKING = "booking/CREATE_BOOKING";
const READ_BOOKING = "booking/READ_BOOKING";
const READ_ALL_BOOKINGS = "booking/READ_ALL_BOOKINGS";
const UPDATE_BOOKING = "booking/UPDATE_BOOKING";
const DELETE_BOOKING = "booking/DELETE_BOOKING";
const READ_YOUR_BOOKINGS = "booking/READ_YOUR_BOOKINGS";

export const actionCreateBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking
});

export const actionReadBooking = (bookingId) => ({
    type: READ_BOOKING,
    bookingId
});

export const actionReadAllBookings = (bookings) => ({
    type: READ_ALL_BOOKINGS,
    bookings
});

export const actionUpdateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    booking
});

export const actionDeleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
});

export const actionReadYourBookings = (bookings) => ({
    type: READ_YOUR_BOOKINGS,
    bookings
});

export const thunkReadAllBookings = () => async (dispatch) => {
    const response = await fetch("/api/booking/", {
        method: "GET"
    });

    if (response.ok) {
        const bookings = await response.json();

        dispatch(actionReadAllBookings(bookings.bookings));
        return
    } else if (response.status === 404) {
        throw Error("404")
    } else {
        return ["An error occurred. Please try again."]
    }
};

export const thunkReadYourBookings = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/bookings`, {
        method: "GET"
    });
   
    if (response.ok) {
        const bookings = await response.json();

        // console.log(
        // 	"this is bookings.bookings from thunkReadYourBookings",
        // 	bookings.bookings
        // );
        dispatch(actionReadYourBookings(bookings.bookings));
        return
    } else if (response.status === 404) {
        throw Error('404')
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkGetOneBooking = (bookingId) => async (dispatch) => {
    // console.log(
    // 	"this is bookingId from thunkGetOneBooking",
    // 	bookingId
    // );
    const getBookingResponse = await fetch(`/api/booking/${bookingId}`, {
        method: "GET"
    });

    if (getBookingResponse.ok) {
        const booking = await getBookingResponse.json();
        // console.log("this is booking in thunkGetOneBooking", booking)
        dispatch(actionReadBooking(booking));
        return booking;
    }
};

export const thunkAddBooking = (booking) => async (dispatch) => {
    const { name, about, price_per_night, address, city, state, country, img_url, lat, lng } = booking;
    const bookingResponse = await fetch("api/booking/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, about, price_per_night, address, city, state, country, img_url, lat, lng
        })
    });

    if (bookingResponse.ok) {
        const data = await bookingResponse.json();

            dispatch(actionCreateBooking(data));
            return bookingResponse;
        } else if (bookingResponse.status < 500) {
            const data = await bookingResponse.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.']
        }
    }
// };

export const thunkUpdateBooking = (booking) => async (dispatch) => {
    const { id, name, about, price_per_night, address, city, state, country, img_url, lat, lng } = booking;

    // console.log("this is booking in thunk update booking", booking);
    const response = await fetch(`/api/booking/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           name, about, price_per_night, address, city, state, country, img_url, lat, lng
        })
    });
    // console.log("this is response in thunkUpdateBooking", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("this is data in thunkUpdateBooking", data)
        dispatch(actionUpdateBooking(data));
        return data;
    }
};

export const thunkRemoveBooking = (bookingId) => async (dispatch) => {
    const response = await fetch(`/api/booking/${bookingId}`, {
        method: "DELETE"
    });

    if (response.ok) dispatch(actionDeleteBooking(bookingId));
};

let initialState = {}

export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_BOOKINGS: {

            // console.log("this is action.bookings in READ_ALL_BOOKINGS", action.bookings)
            
            const newState = {}
            action.bookings.forEach((booking) => {
                newState[booking.id] = booking;
              });
              return newState;
        }
        case READ_YOUR_BOOKINGS: {

            // console.log("this is action.bookings in READ_YOUR_BOOKINGS", action.bookings)
            
            const newState = {}
            action.bookings.forEach((booking) => {
                newState[booking.id] = booking;
              });
              return newState;
        }
        case READ_BOOKING: {

            let newState = {...state}
            newState[action.bookingId]=action.booking
            return newState
        }
        case CREATE_BOOKING: {
            let newState = {...state};
            newState[action.booking.id] = action.booking
            return newState
        }
        case UPDATE_BOOKING:{
            // console.log("this is action.booking in UPDATE_BOOKING", action.booking)
            let newState = {...state};
            newState[action.booking.id] = action.booking
            return newState
            }
        case DELETE_BOOKING:{
            let newState = {...state};
            delete newState[action.bookingId]
            return newState
        }
        default:
            return state
    }
}