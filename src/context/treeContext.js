import React from 'react'

const TreeContext = React.createContext()

function TreeProvider({ children }) {
    const [tree, setTree] = React.useState();
    const value = { tree, setTree }
    return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}

function useTree() {
    const context = React.useContext(TreeContext)
    if (context === undefined) {
        throw new Error('useTree must be used within a TreeProvider')
    }
    return context
}

export { TreeProvider, useTree }