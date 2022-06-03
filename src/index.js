import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';

const TextInput = require('@nichoth/forms/react/text-input')
const Button = require('@nichoth/forms/react/button')




function PasswordDemo () {
    const [isResolving, setResolving] = useState(false)
    const [pendingPwds, setPendingPwds] = useState({
        password: '',
        passwordVerify: ''
    })

    function savePassword (ev) {
        ev.preventDefault()
        setResolving(true)

        setTimeout(() => {
            setResolving(false)
        }, 2000)  // 2 seconds
    }

    console.log('render', pendingPwds)

    // (?=.*[a-z]) -- at least one lowercase letter
    // (?=.*[A-Z]) -- at least one uppercase letter
    // (?=.*[0-9]) -- at least one digit
    const tester = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^\"'&*()]).")
    const specialChars = '!@#$%^&*()_-+={[}]|:;"\'<,>.'

    function handleInput (ev) {
        console.log('input', ev.target.name, ev.target.value)
        const { name, value } = ev.target

        const obj = {}
        obj[name] = value
        console.log('obj', obj)
        const pwds = Object.assign({}, pendingPwds, obj)

        setPendingPwds(pwds)
    }

    console.log('render', pendingPwds)

    function pwIsOk () {
        // const { name, value } = ev.target
        const { password, passwordVerify } = pendingPwds

        // // TODO -- could use regex here, but how?
        const hasSpecial = Array.prototype.some.call(password, l => {
            return specialChars.includes(l)
        })

        if (password.length <= 6) return false
        console.log('is more than 6')

        if (password !== passwordVerify) return false
        console.log('is equal')

        if (!hasSpecial || !tester.test(password)) return false
        console.log('has special and regex is ok')

        return true
    }

    const instructions = [
        'Password has a min length of 6 characters',
        'Password has at least 1 uppercase character',
        'Password has at least 1 lowercase character',
        'Password has at least 1 number',
        'Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"\'<,>.)'
    ]

    return html`
    <ul className="instructions">
        ${instructions.map((line, i) => {
            return html`<li key=${i}>${line}</li>`
        })}
    </ul>

    <div className="password-form">
        <form onSubmit=${savePassword}>
            <p>Create a password</p>
            <${TextInput} type="password" displayName="Password"
                required=${true} name="password" minLength=${6}
                onChange=${handleInput}
                value=${pendingPwds.password}
            />
            <${TextInput} type="password" displayName="Verify password"
                name="passwordVerify"
                onChange=${handleInput}
                value=${pendingPwds.passwordVerify}
            />
            <${Button} disabled=${!pwIsOk()} type="submit"
                isSpinning=${isResolving}
            >
                Submit
            <//>

        </form>
    </div>`
}

ReactDOM.render(html`<${PasswordDemo} />`, document.getElementById('content'));
