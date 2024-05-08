import type { Prisma, Todo } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TodoCreateArgs>({
  todo: {
    one: { data: { name: 'String', description: 'String', isComplete: true } },
    two: { data: { name: 'String', description: 'String', isComplete: true } },
  },
})

export type StandardScenario = ScenarioData<Todo, 'todo'>
