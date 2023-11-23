import { http, HttpResponse, delay, StrictRequest, DefaultBodyType } from 'msw'

export type Todo = {
  id: string
  title: string
  done: boolean
  assignee: string
  tags: string[]
}

const fakeDB: Todo[] = [
  {
    id: 'clp9nrb4d000108lahx8obe9u',
    title: 'Create React Query Presentation Slides',
    done: true,
    assignee: 'Salatiel',
    tags: ['react-query', 'figma'],
  },
  {
    id: 'clp9nrkyp000208lab4c335e6',
    title: 'Create Todo App for hands on part',
    done: false,
    assignee: 'Salatiel',
    tags: ['react-query', 'vscode'],
  },
  {
    id: 'clp9nrkyp000208lab4c335e7',
    title: 'Present React Query at the Cheesecake Bakery',
    done: false,
    assignee: 'Salatiel',
    tags: ['react-query', 'discord'],
  },
  {
    id: 'clp9nrkyp000208lab4c335e9',
    title: 'Refactor Todo App using React Query',
    done: false,
    assignee: 'Salatiel',
    tags: ['react-query', 'vscode'],
  },
]

function getSearchParams(
  request: StrictRequest<DefaultBodyType>
): URLSearchParams {
  return new URL(request.url).searchParams
}

export const handlers = [
  http.get('/todos', async ({ request }) => {
    const searchParams = getSearchParams(request)

    await delay(1000)

    if (Math.random() * 10 > 5 && !Array.from(searchParams.entries()).length) {
      return new HttpResponse(null, { status: 500 })
    }

    if (searchParams.get('title')) {
      const results = fakeDB.filter((todo) =>
        todo.title.match(new RegExp(searchParams.get('title') as string, 'dgi'))
      )

      return HttpResponse.json(results)
    }

    if (searchParams.get('tag')) {
      const results = fakeDB.filter((todo) =>
        todo.tags.includes(searchParams.get('tag') as string)
      )

      return HttpResponse.json(results)
    }

    return HttpResponse.json(fakeDB)
  }),
  http.get('/todos/:id', async ({ params }) => {
    await delay(1000)

    if (Math.random() * 10 > 5) {
      return new HttpResponse(null, { status: 500 })
    }

    const result = fakeDB.find((todo) => todo.id === params.id)

    return HttpResponse.json(result || null)
  }),
]
