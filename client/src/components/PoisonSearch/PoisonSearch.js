import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from 'react';
import axios from 'axios';
import Downshift from 'downshift';
import poisonList from '../../poisons.json';
import ResultCard from '../Result/Result';

let poisonNameList = [];

function debounce(fn, time) {
  let timeoutId
  return wrapper
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
} 

function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
  alert(changes.type);
  switch (changes.type) {
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        inputValue: '',
        isOpen: !state.isOpen,
        highlightedIndex: state.highlightedIndex,
      }
    case Downshift.stateChangeTypes.blurInput:
      return {
        ...changes,
        inputValue: '',
      }
    default:
      return changes
  }
}

const baseEndpoint = process.env.NODE_ENV === "development" ? 'http://localhost:3001/api/' : 'https://poisonous.herokuapp.com/api/';

class PoisonSearchbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poisons: {}
    }
  }
  
  async componentDidMount() {
    await poisonList.poisons.map(async poison => {
      await poisonNameList.push({value: poison.poisonName});
    });
  }
 
  fetchPoison = debounce(value => {
    axios
    .get(baseEndpoint + value)
    .then(response => {
        let poisonSelected = response.data.poison[0];
        this.setState({poisons: poisonSelected})
      })
      .catch(error => {
        console.log(error)
      })
  }, 700)

  render() {
    return (
      <Downshift
        // onChange={selection => { 
        //   console.log(selection);
        //   return this.fetchPoison(selection.value)
        // }}
        itemToString={item => (item ? item : '')}
        stateReducer={stateReducer}
        >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => {
          return (
            <div>
              <label {...getLabelProps()}>Suspect your animal has been poisoned?</label>
              <input type="text" className="form-control" aria-describedby="basic-addon1" placeholder="Enter item here"
                {...getInputProps({
                  onChange: event => {
                    const value = event.target.value
                    if (!value) {
                      return
                    }
                    // this.fetchPoison(value);
                    // call the debounce function
                  },
                })}
              />
              <ul className="list-group list-group-flush" {...getMenuProps()}>
                {isOpen
                  ? poisonNameList
                    .filter(item => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => (
                      <li className="list-group-item"
                        {...getItemProps({
                          key: item.value + index,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                  : null}
              </ul>
              <div>
                {Object.keys(this.state.poisons).length ? (
                  <div>
                    <ResultCard poisonSelected={this.state.poisons} />
                  </div>
                  ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>
    )
  }
}

function PoisonSearch() {
  return (
    <div className="container h-100">
      <div className="jumbotron my-auto">
        <h1 className="display-4">Poisono.us</h1>
        <PoisonSearchbox />
      </div>
    </div>
  );
}

export default PoisonSearch;