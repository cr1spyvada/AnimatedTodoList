import shortid from 'shortid'
import { createMachine, assign } from 'xstate'

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYgGMAnMY5MAAgDswB3AbQAYBdRUAA6pY2ZNlTN+IAB6IATAA4u+LgGYArFwCMq1Vy4A2BUYAsAGhABPRHpP4t6hXICcWgOwHnRjwF8fFtAwcPEISMghyMkwwBkZA1G4+JBAhETEJKVkEXWU3E3UtRXVVHWNzK0QvfEU9OULirmM3VT8A9CxcAiJSOPbYSIkwfGxmADdUAGsh+OCusN6MWAQR8cp6cWZExKlU0Q3MxC4LawQuVpAZzvwaOlj4-FgAC1Q2EahGADNUagBbRhGBABXZDkL6-f7MIHIRiUR7EZgwCDbZK7dKSZJZAC0WgU+D0bgUzjcXHyckMrnKJxMzmceIMbk06gMDgMJhMcnOlxCABEwNExAiBqxhmNJtN2rN8Lz+W9lqK1mitrwdsI9hkMYhMSV8K4tNouHUFG5CuzjpqTLjVAZVM4THk5Hk3HUtH5-CBmOg4FIucgVWl9hqENiFLjmQT1HktO4FEy5Gagzo3PgCgo2U72XpbQZORKrt1wn61ejQFk5AY5PYLQoHOo5HITDiDAZ41pnKp8G5XFxnHI9FwmZoWm6faEevF4CjVWiDgmTMowzHI9HY-HjPgTLoQ53nCT1D31DmglcbvQmPFC9PA5im3iuASibuyZ4tPG57TVMa1ISdCT3IeOiEJ53O0DzPK8CKfN8fwAsCF4BiWNjuDqG7VneMZNG4r7OLitbqJo1LluSzj-pK0oxG8cHqgh2ROPYIY2p2VqGNa8a0uyDQGtW34FK6PhAA */
export const todosMachine = createMachine(
  {
    context: {
      todos: [],
      createnewTodosFormInput: {
        id: shortid.generate(),
        subject: '',
        done: false
      }
    },
    tsTypes: {} as import('./todosMachine.typegen').Typegen0,
    schema: {
      services: {} as { loadTodos: { data: [] }; deleteTodo: { data: void } },
      events: {} as
        | { type: 'create new' }
        | { type: 'form input changed'; value: string }
        | { type: 'delete todo'; value: string }
    },
    id: 'todolist',
    initial: 'load todos',
    states: {
      loaded: {
        on: {
          'create new': {
            target: 'create todo'
          },
          'delete todo': {
            target: 'Deleting',
            actions: 'assignFilteredTodosToContext'
          }
        }
      },
      'load todos': {
        invoke: {
          src: 'loadTodos',
          onDone: [
            {
              target: 'loaded',
              actions: 'assignTodosToContext'
            }
          ]
        }
      },
      'create todo': {
        initial: 'showing form input',
        states: {
          'showing form input': {
            on: {
              'form input changed': {
                actions: 'assignFormInputToContext'
              }
            }
          }
        }
      },
      Deleting: {
        invoke: {
          src: 'deleteTodo',
          onDone: [
            {
              target: 'load todos'
            }
          ]
        }
      }
    }
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data
        }
      }),
      assignFormInputToContext: assign((context, event) => {
        return {
          createnewTodosFormInput: {
            ...context.createnewTodosFormInput,
            subject: event.value
          }
        }
      }),
      assignFilteredTodosToContext: assign((context, event) => {
        return {
          todos: context.todos.filter(i => i !== event.value)
        }
      })
    }
  }
)
