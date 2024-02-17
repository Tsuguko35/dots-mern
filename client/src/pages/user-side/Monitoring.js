import React, { useEffect } from 'react'

function Monitoring() {
    useEffect(() => {
        document.title = `Monitoring`
    }, [])
  return (
    <div>
        <p>Monitoring</p>
    </div>
  )
}

export default Monitoring