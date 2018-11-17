import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import pf from 'petfinder-client'
import { Provider } from './SearchContext'
import Results from './Results'
import Loadable from 'react-loadable'
import NavBar from './NavBar'
import SearchParams from './SearchParams'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>Loading Split out Code</h1>
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'New York, NY',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    })
  }
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds
    )
  }
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    })
  }
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          })
        }
      })
    } else {
      this.setState({
        breeds: []
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <LoadableDetails path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
