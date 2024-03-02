import { 
    useDotsContext, 
    DotsProvider,
    SidebarContext
} from "./context"

import {
    initialState,
    reducer,
    COUNTDOWN,
    LOG_IN_USER
} from './reducer'

import { 
    logInUser ,
    validateUser,
    logOutUser,
    isEmailRegistered,
    RegisterUser
} from "./action"

export {
    useDotsContext,
    DotsProvider,
    initialState,
    reducer,
    LOG_IN_USER,
    COUNTDOWN,
    logInUser,
    validateUser,
    logOutUser,
    SidebarContext,
    isEmailRegistered,
    RegisterUser
}
