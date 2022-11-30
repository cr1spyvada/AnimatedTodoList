import shortid from 'shortid'
import { createMachine, assign } from 'xstate'

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EAZkkt8AdgAsAVgCMAJgAcSySskaAbAoA0IAJ6IAnPvyaZa9dpYG5kgL6uTjLLgJFSFACcwPwhWDiQQHj4BYVEJBABaFSd8STknSTUlDR0WfRUVE3MELJV8bR1MlQ0NNTVFfXdPdG88QhIyCHIAYyDiWgAVFrDRKP5BEQj4hTULfA1lOVrahQ0WeqLENX1JfAsFFwUWdRnaiyaQLxw2kIYW2EphMHxsIQA3VABrZ6ufdtI7hhYAhXh9uv0JmERhExjFJqB4jt8AplEodnVVnV9BZNggLEpypJ9Eo8gsUU4tBdfm0ACLBGivKCPITPUFfH4ta4EOnUARCKAg96ocFwqHsUa8caxKaIBI6PYFY7rapyE5qXEJVapHb7RT1A72FRUzl-Xpgfr0LzM1lC774akEM0WwGoQVgiHCMXhbiSuFxRAqCxyVKSCoWfaBmQsYxmKQ1eTafRyYkKCyG7buDwgIToOCiB0S6ITf2JaoafD5JZKRQFKv6dWx0sHcqLJazAwzarGjBc-6dQtS+HiLb1-AqVYaFRKJQY6r6fS4yPyCzJNNRtEktxZh19l3wGG+4sypuyStaGsqOsN4oGZHSGpycPRpRppTd1rc+l8qADv3Ho6yLU861OO2ROIUjYJNkqQrlktQsDIFgGFuzQ9qafS0C6v5HgiiAkgoyJqJIQZrPOCGXrixGyMc2RaDOU7bAojSZkAA */
interface todoProps {
  id: string
  subject: string
  done: boolean
}
export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBsCWtkDpNUBDCSAYjMzGTAAI0MBtABgF1FQAHVWbZbKgB2nEAA9EAVkkt8kgIwBOAGyLJAJmXzlAdgAs8gDQgAnogDMexfkUtlylnfPy9e5ZYC+H44yy4CRKQUAE5ggRCsHEggPHwCwqISCOraNnopygAcalbmLOnGZgh6jvhW6iks5pKZLAqZXj7ofniEJGQQ5ADGocS0ACrNkaKx-IIi0Ul6Opn46nU6ksolboqZmYWIyup6+I4s8pLmzppWyo0gvjit4RSQ-IPM7CO8YwmTiJrK+Lp5kjq2PTHaY6TYISSKdRzRR6TKLByLeQsRQXK7+NqkBjNWCUYRgfDYIQAN1QAGt8Wibu0sRhYAhCSSun1xpFhtFRvEJqAkuo1nI4fkSuYdJZdGCKlCdCLbADFPIkepJKjmtcCAARMI0QlQXFCfEMskUlXojXUARCKD04moJmc1nPdmvTmJRBqH4GFhwlLy+aqMHy3Z5dSZZwadTmZY6ZUYVX4HpgPr0Xy6-XW8n4SkEeOJmmoK2M5nCe1RbhO8YuhDaWQzLK6X46BwsUGmLZyubuRzBkF1czRloEe7IXPkACuXAgiceqDZpbi5Y+CAAtC5rOoGy4Doq4Wp1GDlrsGzt8vodv95H3Y4Ph7BiESwFOZzEy+9uZ9XHtppZIa4pdllGDynwY5Mh2eQQLhSxPAuIR0DgURMxeOcX3ERBl0UHQ5nXEp5C3AENHFSR8BcEN5hFJY1nsC90VuCBELeLkUIQcx1iAlRji0BR5mFACDHwKU1AOHQWHmH8qKpTFfHgR0kIYpIWDBYVvkObYjgbRRmIMMT1U1c0oDo50F0kWEiIFAxeVwyRxVSGQHFqFQ5V0bQtLjXpaFzfT51fcFPTkZwcN5PRVJUMEdB2NJbEhMDjmDKNvEuY1WivXwPOQtAuCkZi+JKHQwLsQLAv-EBqAAM2QRBMnkPYNAUSF5nWfIjBAAAjVBkDQABbKRMm+fQm1y5YjKWYxgmwKAAAsyuSA4qsVJQKk9Wo9GMAB3bAIGQMbEBw+SQDGsBRomxBYWMJIKpmmr5vqgwwSOWZepy2oBoKrwvCAA */
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
                target: 'load todos'
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
          return {
            todos: context.todos.filter(i => i !== event.value)
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
