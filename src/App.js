import React, { useState, useEffect, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce';
import './App.css';

function App()
{
  const [input, setInput] = useState( '' )

  const fetchData = ( input ) =>
  {
    if ( input !== '' )
    {
      console.log( `Searching For ${ input }` )
    }
  }

  const onChange = ( e ) =>
  {
    let value = e.target.value
    setInput( value )
    fetchData( value )
  }

  //useCallback makes sure to return the SAME INSTANCE of the debounced callback between re-renderings
  // const debouncedInput = useCallback( debounce( onChange, 1000 ), [] )

  //useMemo() calls debounce() just ONCE, while useCallback() during EVERY RE-RENDERING. 
  //If you look at the debounce() source code, it's a quite EXPENSIVE CALL.
  const debouncedInput = useMemo( () => debounce( onChange, 1000 ), [] )

  //Stop the invocation of the debounced function after unmounting
  useEffect( () =>
  {
    debouncedInput.cancel()
  }, [] )

  return (
    <div className="App">
      <h1>Hello</h1>
      <input type="text" aria-label="Search" onChange={debouncedInput} />
    </div>
  );
}

export default App;
