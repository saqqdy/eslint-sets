interface User {
  email: string
  id: number
  name: string
}

function greet(user: User): string {
  return `Hello, ${user.name}!`
}

const users: User[] = [
  { email: 'alice@example.com', id: 1, name: 'Alice' },
  { email: 'bob@example.com', id: 2, name: 'Bob' },
]

for (const user of users) {
  console.info(greet(user))
}

export { greet, users }
export type { User }
