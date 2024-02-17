import React, { useEffect } from 'react'

function ArchiveTable() {
    useEffect(() => {
        document.title = `Archve Table`
    }, [])
  return (
    <div>Archive Table</div>
  )
}

export default ArchiveTable