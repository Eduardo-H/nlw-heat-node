<h1 align="center">NLW Heat Node</h1>

## About
This project was build during the Next Level Week event, its main goal is to gather people to talk about their expectations for a future event, called DoWhile. After watching all classes, I decided to implement a private chat.

## Technologies
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Socket.io](https://socket.io/)

## Implemented routes
### /authenticate
```
{
  description: authenticate an user,
  method: POST,
  body: {
    code: string,
    type: string
  }
}
```

### /messages
```
{
  description: register a new message,
  method: POST,
  body: {
    message: string
  },
  headers: {
    Authentication: Bearer Token
  }
}
```

### /messages/last-3
```
{
  description: get the last 3 messages,
  method: GET
}
```

### /profile
```
{
  description: get the user's data,
  method: GET,
  headers: {
    Authentication: Bearer Token
  }
}
```

### /chat
```
{
  description: register a new chat,
  method: POST,
  body: {
    contact_id: string
  },
  headers: {
    Authentication: Bearer Token
  }
}
```

### /chats/all
```
{
  description: get all the user's chats,
  method: GET,
  headers: {
    Authentication: Bearer Token
  }
}
```

### /chat/:id
```
{
  description: get a chat by id,
  method: GET,
  params: {
    id: string
  },
  headers: {
    Authentication: Bearer Token
  }
}
```

### /chat/messages
```
{
  description: register a new chat message,
  method: POST,
  body: {
    id: string
  },
  headers: {
    Authentication: Bearer Token
  }
}
```

## Usage
To run this project, you can follow these steps:
- Clone this repository with ```git clone https://github.com/Eduardo-H/nlw-heat-node```
- Navigate into the the project ```cd nlw-heat-node/```
- Install all the project's dependencies by running ```yarn```
- Run the migrations to setup the database ```yarn prisma migrate dev```
- Run the project with ```yarn dev```