/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { useForm } from 'react-hook-form'

function App(props) {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <input name="firstname" ref={register} /> {/* register an input */}

      <input name="lastname" ref={register({ required: true })} />
      {errors.lastname && 'Last name is required.'}

      <input name="age" ref={register({ pattern: /\d+/ })} />
      {errors.age && 'Please enter number for age.'}

      <input type="submit" />
    </form>
  );
}

describe('useForm', () => {
  it('submits a form', () => {
    mount(<App onSubmit={cy.stub().as('submit')} />)
    cy.get('input[name=firstname]').type('gleb')
    cy.get('input[name=lastname]').type('b')
    cy.get('input[name=age]').type('10')
    cy.get('form').submit()
    cy.get('@submit').should('have.been.calledWith', {
      firstname: 'gleb',
      lastname: 'b',
      age: '10'
    })
  })
})
