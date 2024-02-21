import React, { useEffect } from 'react'
import { PageHeader } from '../../components'

import '../../styles/templates.css'

function Templates() {
    useEffect(() => {
        document.title = `Templates`
    }, [])
  return (
    <section id='Templates' className='Templates'>
        <div className="wrapper">
          <PageHeader page={"Templates"}/>
        </div>
    </section>
  )
}

export default Templates