import React from 'react'
import { HashRouter as Router} from 'react-router-dom'
import AppLayout from './layout'

export default function() {
  return (
    <Router>
      <AppLayout></AppLayout>
    </Router>
  )
}