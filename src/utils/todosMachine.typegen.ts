// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todolist.create todo:invocation[0]': {
      type: 'done.invoke.todolist.create todo:invocation[0]'
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
    fetchNewTodo: 'done.invoke.todolist.create todo:invocation[0]'
    loadTodos: 'done.invoke.todolist.load todos:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'loadTodos' | 'deleteTodo' | 'fetchNewTodo'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignFilteredTodosToContext: 'delete todo'
    assignFormInputToContext: 'done.invoke.todolist.create todo:invocation[0]'
    assignTodosToContext: 'done.invoke.todolist.load todos:invocation[0]'
    assignUpdatedTodoToContext: 'updateTodo'
    toggleTodoFromContext: 'toggleTodo'
  }
  eventsCausingServices: {
    deleteTodo: 'delete todo'
    fetchNewTodo: 'createTodo'
    loadTodos: 'reload' | 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'Deleting'
    | 'create todo'
    | 'edit todo'
    | 'load todos'
    | 'loaded'
  tags: never
}
