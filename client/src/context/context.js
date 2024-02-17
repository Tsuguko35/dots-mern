import React from "react";

const DotsContext = React.createContext()

export const useDotsContext = () => React.useContext(DotsContext)

export const DotsProvider = ({ children, initialState, reducer }) => {
    const [globalState, dispatch] = React.useReducer(reducer, initialState)

    return (
        <DotsContext.Provider value={[globalState, dispatch]}>
            {children}
        </DotsContext.Provider>
    )
}

export const SidebarContext = React.createContext()