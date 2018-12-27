# gymbot

Application to book Gymbox classes programmatically, eliminating the need to wake up at 06:59 on a Sunday morning.

## Requirements
Node 8

## How to run
- Install node modules using npm/yarn
- Add a credentials.json file to the root of the project

```
credentials.json

{
  "username": "me@email.com",
  "password": "password"
}
```
Run the program using `npm start [classId]` e.g. `npm start slot1137776`

## TODO
* Schedule task to run at correct time
* Implement better error handling and retries
