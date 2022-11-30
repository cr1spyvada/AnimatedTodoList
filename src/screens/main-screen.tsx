import React, { useCallback, useEffect, useState } from 'react'
import { Center, VStack, useColorModeValue, Fab, Icon } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import { AntDesign } from '@expo/vector-icons'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import { useMachine } from '@xstate/react'
import { todosMachine } from '../utils/todosMachine'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy Groceries',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Task Application',
    done: false
  }
]
interface ItemProps {
  id: string
  subject: string
  done: boolean
}

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return data
      },
      deleteTodo: async (context, event) => {
        setData(data.filter(i => i.id != event.value))
      },
      fetchNewTodo: async () => {
        const newTodo = {
          id: shortid.generate(),
          subject: '',
          done: false
        }
        setData([...data, newTodo])
        setEditingItemId(newTodo.id)
        return newTodo
      }
    }
  })
  useEffect(() => {
    console.log({ value: state.value })
  }, [state.value])

  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const handleToggleTaskItem = useCallback((item: ItemProps) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = { ...item, done: !item.done }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback(
    (item: ItemProps, newSubject: string) => {
      setData(prevData => {
        const newData = [...prevData]
        const index = prevData.indexOf(item)
        newData[index] = {
          ...item,
          subject: newSubject
        }
        return newData
      })
      if (state.matches('loaded')) send({ type: 'editTodo' })
      send({ type: 'updateTodo', data: { id: item.id, subject: newSubject } })
    },
    []
  )
  const handleFinishEditingTaskItem = useCallback((_item: ItemProps) => {
    setEditingItemId(null)
    send({ type: 'saveTodo' })
  }, [])
  const handlePressTaskItemLabel = useCallback((item: ItemProps) => {
    setEditingItemId(item.id)
    send({ type: 'editTodo' })
  }, [])
  const handleRemoveItem = useCallback((item: ItemProps) => {
    send({ type: 'delete todo', value: item.id })
  }, [])
  const createTodo = useCallback(() => {
    send({ type: 'createTodo' })
    console.log('created')
  }, [])
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={state.context.todos}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={createTodo}
      />
    </Center>
  )
}
