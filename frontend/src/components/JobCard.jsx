import React from 'react'

function JobCard({job}) {
  return (
    <div className=''>
      <h1>{job.company}</h1>
      <h1>{job.role}</h1>
      <h1>{job.description}</h1>
    </div>
  )
}

export default JobCard