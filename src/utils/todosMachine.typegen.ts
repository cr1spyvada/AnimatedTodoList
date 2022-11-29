// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todolist.Deleting:invocation[0]': {
      type: 'done.invoke.todolist.Deleting:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.todolist.load todos:invocation[0]': {
      type: 'done.invoke.todolist.load todos:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    deleteTodo: 'done.invoke.todolist.Deleting:invocation[0]'
    loadTodos: 'done.invoke.todolist.load todos:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'loadTodos' | 'deleteTodo'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignFilteredTodosToContext: 'delete todo'
    assignFormInputToContext: 'form input changed'
    assignTodosToContext: 'done.invoke.todolist.load todos:invocation[0]'
  }
  eventsCausingServices: {
    deleteTodo: 'delete todo'
    loadTodos: 'done.invoke.todolist.Deleting:invocation[0]' | 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'Deleting'
    | 'create todo'
    | 'create todo.showing form input'
    | 'load todos'
    | 'loaded'
    | { 'create todo'?: 'showing form input' }
  tags: never
}
