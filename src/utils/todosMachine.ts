import shortid from 'shortid'
import { createMachine, assign } from 'xstate'

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EAZkkt8AdgAsAVgCMAJgAcSySskaAbAoA0IAJ6IAnPvyaZa9dpYG5kgL6uTjLLgJFSFACcwPwhWDiQQHj4BYVEJBABaFSd8STknSTUlDR0WfRUVE3MELJV8bR1MlQ0NNTVFfXdPdG88QhIyCHIAYyDiWgAVFrDRKP5BEQj4hTULfA1lOVrahQ0WeqLENX1JfAsFFwUWdRnaiyaQLxw2kIYW2EphMHxsIQA3VABrZ6ufdtI7hhYAhXh9uv0JmERhExjFJqB4jt8AplEodnVVnV9BZNggLEpypJ9Eo8gsUU4tBdfm0ACLBGivKCPITPUFfH4ta4EOnUARCKAg96ocFwqHsUa8caxKaIBI6PYFY7rapyE5qXEJVapHb7RT1A72FRUzl-Xpgfr0LzM1lC774akEM0WwGoQVgiHCMXhbiSuFxRAqCxyVKSCoWfaBmQsYxmKQ1eTafRyYkKCyG7buDwgIToOCiB0S6ITf2JaoafD5JZKRQFKv6dWx0sHcqLJazAwzarGjBc-6dQtS+HiLb1-AqVYaFRKJQY6r6fS4yPyCzJNNRtEktxZh19l3wGG+4sypuyStaGsqOsN4oGZHSGpycPRpRppTd1rc+l8qADv3Ho6yLU861OO2ROIUjYJNkqQrlktQsDIFgGFuzQ9qafS0C6v5HgiiAkgoyJqJIQZrPOCGXrixGyMc2RaDOU7bAojSZkAA */
interface todoProps {
  id: string
  subject: string
  done: boolean
}
export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EANgCsATnwAWFrIUAmAIwKA7AGYFklQBoQAT0RKWi2Rq0qF22QA4dAXxfHGWXASKkKAJzBfCFYOJBAePgFhUQkEDUl8FQTHWWkFWR0WNWMzBAsrVQ0WHWlHFml1RzcPdC88QhIyCHIAY0DiWgAVOtDRSP5BEXC47Ud8VQqtaUklfSdHXKlVBXwWdfVpHR11VVnZSRqQTxwG4IpIfh7mdn7eQZiRxD3EyV0p2Wzt7S0lhDlVBMVI5ppIWNN1MojidvI1SAw6rBKMIwPhsEIAG6oADWqJhZyaCIwsAQ6KxrU6Q1CfXCA2iw1AcS2+F2Oi0FSq6zS2j+K0sGU2GUcqUc0lsCmhdVOBAAIkEaOioMihKiyTi8VLYXLqAIhFBSZjUBT6dTbrT7vTYuYFDo1rt1JtnOp2dIZrzZPItNoxaK5M7hYd3MdNQ12mBOvRPMrVYbcfh8QQwxGiagDeTKcJTWFuBahlaEOowfgtI5JKWtG82WDwX8DOoJpIsixVI4fhVXEGE-hLsgU+QAK5cCAR66oGk5qJ5p4IAC0mnkqgrmhYuzKtmkqlr9mLkj52jUCjF6klGGl3Yg-D7sGIGLAo-HEVzj0Zz232V0GRWP1Skj+n-w2yOCsVQth+ehuEGQjoHAogJnck7PuIiBzrIWgTEuSiriCaSbqYiDqGySRAYWHqTDIJSBrUp6wucEDwQ8DJIQgOjCgBBzbJImy7CUvx4fkCj1lo64ruykz2FoJ71D4hKePA5oIYxcQsH8VYsjMqhbBWmStsenYhrK8q6lA9GWtOMhoeCbxvNIXxAYsfFFGhBGSG8GkHI4VSzJJZ5JrQKYmVOL7-Cw4xbA6RQqJpBx-FoKxJBkygaM4Oigd5sI9v58kMbBqBcIgWzjF64KcrM6RuiA1AAGbIIgHlrBulTWJMwrZOoxgAEaoMgaAALb5aWxZKFoJWHoev4gP42BQAAFjV8QrvVGnqE1IXlAoxgAO7YBAyDTfhkzGNNYBTbN5j2XEdUVEtK0tQJfwFYNxXlKVY0QS4QA */
  createMachine(
    {
      context: {
        todos: [] as todoProps[]
      },
      tsTypes: {} as import('./todosMachine.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: { data: todoProps[] }
          deleteTodo: { data: void }
          fetchNewTodo: { data: todoProps }
        },
        events: {} as
          | { type: 'createTodo' }
          | { type: 'delete todo'; value: string }
          | { type: 'reload' }
          | { type: 'editTodo' }
          | { type: 'updateTodo'; value: { id: string; subject: string } }
          | { type: 'saveTodo' }
      },
      id: 'todolist',
      initial: 'load todos',
      states: {
        loaded: {
          on: {
            'delete todo': {
              target: 'Deleting',
              actions: 'assignFilteredTodosToContext'
            },
            reload: {
              target: 'load todos'
            },
            createTodo: {
              target: 'create todo'
            },
            editTodo: {
              target: 'edit todo'
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
        Deleting: {
          invoke: {
            src: 'deleteTodo',
            onDone: [
              {
                target: 'loaded'
              }
            ]
          }
        },
        'create todo': {
          invoke: {
            src: 'fetchNewTodo',
            onDone: [
              {
                target: 'edit todo',
                actions: 'assignFormInputToContext'
              }
            ]
          }
        },
        'edit todo': {
          on: {
            updateTodo: {
              actions: 'assignUpdatedTodoToContext'
            },
            saveTodo: {
              target: 'loaded'
            }
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
        assignFormInputToContext: assign((context, event: any) => {
          return {
            todos: [...context.todos, event.data]
          }
        }),
        assignFilteredTodosToContext: assign((context, event: any) => {
          console.log({ event })
          return {
            todos: context.todos.filter(i => i.id !== event.value)
          }
        }),
        assignUpdatedTodoToContext: assign((context, event: any) => {
          console.log('updatation')
          return {
            todos: context.todos.map(todo => {
              if (todo.id === event.data.id)
                return { ...todo, subject: event.data.subject }
              else return todo
            })
          }
        })
      }
    }
  )
