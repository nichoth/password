import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';

const TextInput = require('@nichoth/forms/react/text-input')
const Button = require('@nichoth/forms/react/button')




function PasswordDemo () {
    const [state, setState] = useState({})

    return html`<div className="counter">
        test life

        <form>
            <${TextInput} type="password" displayName="Password"
                name="password"
            />
            <${TextInput} type="password" displayName="Verify password"
                name="password-verify"
            />
            <${Button} type="submit" />
        </form>
    </div>`
}

ReactDOM.render(html`<${PasswordDemo} />`, document.getElementById('content'));






// var evs = namespace({
//     count: ['inc', 'dec']
// })

// var bus = Bus({ memo: true })

// var state = struct({
//     count: observ(0)
// })

// bus.on(evs.count.inc, () => {
//     state.count.set(state.count() + 1)
// })

// bus.on(evs.count.dec, () => {
//     state.count.set(state.count() - 1)
// })

// function App () {
//     var [_state, setState] = useState(state());
//     state(function onChange (newState) {
//         setState(newState)
//     })
//     var emit = bus.emit.bind(bus)

//     return html`<div className="app">
//         <${Counter} ...${_state} emit=${emit} />
//     </div>`
// }

// function Counter (props) {
//     var { emit } = props
//     return html`<div className="counter">
//         ${props.count}
//         <div className="controls">
//             <button onClick=${emit(evs.count.inc)}>plus</button>
//             <button onClick=${emit(evs.count.dec)}>minus</button>
//         </div>
//     </div>`
// }

// ReactDOM.render(html`<${App} />`, document.getElementById('content'));

