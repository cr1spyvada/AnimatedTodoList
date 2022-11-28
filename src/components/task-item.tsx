import { m } from 'framer-motion'
import {
  Box,
  HStack,
  Icon,
  Text,
  themeTools,
  useColorModeValue,
  useTheme,
  useToken
} from 'native-base'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import AnimatedTaskLabel from './animated-task-label'
import {
  PanGestureHandler,
  PanGestureHandlerProps,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import SwipableView from './swipable-view'
import { Feather } from '@expo/vector-icons'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean
  onToggleCheckbox?: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  subject: string
}

const TaskItem = (props: Props) => {
  const {
    isDone,
    onToggleCheckbox,
    onPressLabel,
    onRemove,
    subject,
    simultaneousHandlers
  } = props
  const highlightColor = useToken(
    'colors',
    useColorModeValue('blue.500', 'blue.400')
  )
  const boxStroke = useToken(
    'colors',
    useColorModeValue('muted.300', 'muted.500')
  )
  const checkmarkColor = useToken(
    'colors',
    useColorModeValue('blue.500', 'white')
  )
  const activeTextColor = useToken(
    'colors',
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = useToken(
    'colors',
    useColorModeValue('muted.400', 'muted.600')
  )

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        <AnimatedTaskLabel
          strikethrough={isDone}
          textColor={activeTextColor}
          inactiveTextColor={doneTextColor}
        >
          {subject}
        </AnimatedTaskLabel>
      </HStack>
    </SwipableView>
  )
}

export default TaskItem
