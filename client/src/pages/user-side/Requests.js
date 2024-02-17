import React, { useEffect } from 'react'

function Requests() {
    useEffect(() => {
        document.title = `Requests`
    }, [])
  return (
    <div>
        <p>Requests</p>
    </div>
  )
}

export default Requests