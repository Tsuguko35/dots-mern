import React, { useEffect } from 'react'

function ArchiveFolders() {
    useEffect(() => {
        document.title = `Archive Folders`
    }, [])
  return (
    <div>
        <p>Archive Folder</p>
    </div>
  )
}

export default ArchiveFolders