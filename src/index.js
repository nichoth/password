import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';

const TextInput = require('@nichoth/forms/react/text-input')
const Button = require('@nichoth/forms/react/button')




function PasswordDemo () {
    const [state, setState] = useState({})
    const [isResolving, setResolving] = useState(false)
    const [isOk, setOk] = useState(false)

    function savePassword (ev) {
        ev.preventDefault()
        setResolving(true)

        setTimeout(() => {
            setResolving(false)
        }, 2000)  // 2 seconds
    }

    const vals = {
        password: '',
        'password-verify': ''
    }

    function handleInput (ev) {
        console.log('input', ev.target.value, ev.target.name)
        const { name, value } = ev.target
        vals[name] = value
        if (vals.password !== vals['password-verify']) return
        console.log('is equal')
    }

    console.log('vals', vals)

    return html`<div className="counter">

        <form onSubmit=${savePassword} onInput=${handleInput}>
            <p>Create a password</p>
            <${TextInput} type="password" displayName="Password"
                required=${true} name="password"
            />
            <${TextInput} type="password" displayName="Verify password"
                name="password-verify"
            />
            <${Button} disabled=${!isOk} type="submit"
                isSpinning=${isResolving}
            >
                Submit
            <//>

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

