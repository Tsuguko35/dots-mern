import React, { useEffect } from 'react'

function Templates() {
    useEffect(() => {
        document.title = `Templates`
    }, [])
  return (
    <div>
        <p>Templates</p>
    </div>
  )
}

export default Templates