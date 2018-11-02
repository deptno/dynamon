# Dynamon. DynamoDB GUI client

![Logo](packages/dynamon/assets/dynamon.png) [![CircleCI](https://circleci.com/gh/deptno/dynamon.svg?style=svg)](https://circleci.com/gh/deptno/dynamon)

Dynamon is GUI client for DynamoDB, [:kr: Blog Post(소개글)](https://medium.com/p/dynamon-gui-dynamodb-client-2827d60d406f)

---

> unstable (under development)

[![](https://user-images.githubusercontent.com/1223020/38453064-7a2d421c-3a8a-11e8-821f-c607fff85642.png)](https://www.youtube.com/watch?v=UI9xyrAKAg0&feature=youtu.be)
:eyes: Click to watch screenshot

checkout development version <https://github.com/deptno/dynamon/releases>

## contribution

```bash
yarn
yarn workspace dynamon dev
yarn workspace dynamon-fe dev # run another terminal
```

or

```bash
yarn
yarn dev
```

## features

- [x] Local DynamoDB (port 8000)
- [ ] Built-in Local DynamoDB (can't spawn in production)
- View
  - Table view
    - [x] Sub collection view
    - [x] Table schema view
    - [ ] Nested JSON(Enter, Leave)
  - [x] JSON view
- Operation
  - Table
    - [ ] Add Table
    - [ ] Edit Table
    - [ ] Delete Table
  - Record
    - [x] Add multiple records
    - [x] Add record
    - [x] Edit record
    - [x] Delete record

## changelog

##### 0.1.5

- Features

  - Add multiple rows
  - Refresh after operations

- Bug fixes
  - redux-universal-electron didn't return promise correctly

##### 0.1.4

- Features

  - Delete record(right click via row header)
  - Move key properties to front

- Miscellaneous
  - support CI

##### 0.1.3

- Features
  - Support Copy & Pate
  - Add row
  - Auto reload after add & update row

##### 0.1.2

- Miscellaneous
  - add Github, Report issue link

##### 0.1.1

- Features
  - Table schema view
  - support icon
  - can update row and cell
- Fixes
  - unexpected button click event bubbling

##### 0.1.0 - dynamon is born.
