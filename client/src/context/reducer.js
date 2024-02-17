// Global
export const COUNTDOWN = 60000

// Actions
export const LOG_IN_USER = 'LOG_IN_USER'


// Initial State
export const initialState = {
    user: {},
    userDetails: {},
    action: '',
    countdownStart: false,
}

// Reducer
export const reducer = (initialState, action) => {
    switch(action.type){
        case LOG_IN_USER:
            return{
                ...initialState,
                user: {
                    ...initialState.user,
                    ...action.payload
                }
            }
    }
}