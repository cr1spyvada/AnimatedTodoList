import shortid from 'shortid'
import { createMachine, assign } from 'xstate'

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EAZkkt8AdgAsAVgCMAJgAcSySskaAbAoA0IAJ6IAnPvyaZa9dpYG5kgL6uTjLLgJFSFACcwPwhWDiQQHj4BYVEJBABaFSd8STknSTUlDR0WfRUVE3MELJV8bR1MlQ0NNTVFfXdPdG88QhIyCHIAYyDiWgAVFrDRKP5BEQj4hTULfA1lOVrahQ0WeqLENX1JfAsFFwUWdRnaiyaQLxw2kIYW2EphMHxsIQA3VABrZ6ufdtI7hhYAhXh9uv0JmERhExjFJqB4jt8AplEodnVVnV9BZNggLEpypJ9Eo8gsUU4tBdfm0ACLBGivKCPITPUFfH4ta4EOnUARCKAg96ocFwqHsUa8caxKaIBI6PYFY7rapyE5qXEJVapHb7RT1A72FRUzl-Xpgfr0LzM1lC774akEM0WwGoQVgiHCMXhbiSuFxRAqCxyVKSCoWfaBmQsYxmKQ1eTafRyYkKCyG7buDwgIToOCiB0S6ITf2JaoafD5JZKRQFKv6dWx0sHcqLJazAwzarGjBc-6dQtS+HiLb1-AqVYaFRKJQY6r6fS4yPyCzJNNRtEktxZh19l3wGG+4sypuyStaGsqOsN4oGZHSGpycPRpRppTd1rc+l8qADv3Ho6yLU861OO2ROIUjYJNkqQrlktQsDIFgGFuzQ9qafS0C6v5HgiiAkgoyJqJIQZrPOCGXrixGyMc2RaDOU7bAojSZkAA */
interface todoProps {
  id: string
  subject: string
  done: boolean
}
export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EANgAc0-AE4AzLMkB2Fi0kBGFqsUAaEAE9EixZPzrpk+ZIAs0ltIBMygKwBfD4cZZcBIlIKACcwQIhWDiQQHj4BYVEJBGctC3k7FJl5NzslFgzDEwQ7DXxc5xSWRTdHNy1pLx90PzxCEjIIcgBjUOJaABVmyNFY-kERaKTFJXxJCsVcmVV0yXzCqWc7fA0WLTczLWd7W0aQXxxW8IpIfkHmdhHeMYTJxCOLNUUWN2X8sztVKp1gg3PJnPhnOlpKo3KsYTp5Kdzv42kFOmgoFBqHdUMNoqN4hNQElJF8yj95Op5NJ5EpzMC5m58NItIdnDktHZQTIkc0LgF2gxmrBKMIwPhsEIAG6oADW4uRl0FvlgCElMq6fXGkTx3CehMSiH2+EOinUdUcLGyAOBmxYZXke1ysmpFLsvIw-PwABEwjRJVBRUJxeq5Qq+SjfdQBEIoGrpahNYSdQ98frxobinZFNtDqyaootObYbbaZYAT9pG5QUWVB6WgQemA+vRfEGQwn5fhFY3erQhRh4xqtcIU1E9XEM68EKl7aprNZVJ8lxogcYpI6IaSNM5pADzYp616bsgB6hyABXLgQFs43UxdMvYmIAC0nPkEKXnN27Oh2WcDJ2FsS52gCGRcqoWhHiiJ5nuQsDEFKYB3qmE7PES4hvEB2wAgsYJAYCNKSMC5T4GYLh2PUu56Nm7qnEI6BwKIPaPJOT6YQgb6Up+2glIcNTLG4AHrjOZoKC4qRfACkg-KodFNJ6KJXBArHoZmyhyNMpLmHshxVGuRRAVoliCbs6jOPkALQUqpBnvAaZsRhSQsMCZoWHsjJuUoe5Qd4ZwRq0Ub+rGqkGtOMmqNsS7RW4fwuNItrOJFWjmGo7K2Cy1jyf5imtE2LZnqFU7PsUQkQrYRb2LksJAcCVhlIcNg1PsqjzNZBCwb4RXsWgXBGso5a6PUmhclyxEgNQABmyCICy2xCXUYIWbI+RaIYABGqDIGgAC2RrWINkGOPYOQliAwTYFAAAWM3JLs83sloS1OI4diGAA7tgEDIFdiB6YYV1gJdN2IA4hhJHN3yPc9K2UcC+xyHJQ3HaNsJeF4QA */
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
          | { type: 'toggleTodo'; value: string }
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
            },
            toggleTodo: {
              actions: 'toggleTodoFromContext'
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
        }),
        toggleTodoFromContext: assign((context, event: any) => {
          return {
            todos: context.todos.map(todo => {
              if (event.value === todo.id)
                return {
                  ...todo,
                  done: !todo.done
                }
              else return todo
            })
          }
        })
      }
    }
  )
