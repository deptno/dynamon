# :smiling_imp: Dynamon. DynamoDB GUI client

![Logo](assets/dynamon.png) [![CircleCI](https://circleci.com/gh/deptno/dynamon.svg?style=svg)](https://circleci.com/gh/deptno/dynamon)

Dynamon is GUI client for DynamoDB.

---

## Recent updated
- Drop electron to develop fast
- Drop monorepo to develop fast
- Connect dynamodb-local (`docker run -p 8000:8000 amazon/dynamodb-local`)
- Support create table

---

> unstable (under development)

[![](https://user-images.githubusercontent.com/1223020/38453064-7a2d421c-3a8a-11e8-821f-c607fff85642.png)](https://www.youtube.com/watch?v=UI9xyrAKAg0&feature=youtu.be)
:eyes: Click to watch screenshot

- [Old electron version](https://github.com/deptno/dynamon/releases)

## install

```bash
npm -g i dynamon
dyanmon # run
```

## contribution

```bash
npm i
npm run watch # for typescript compile
npm run start
```

## features

* [x] Local DynamoDB (port 8000)
* [ ] Built-in Local DynamoDB (can't spawn in production)
* View
  * Table view
    * [x] Sub collection view
    * [x] Table schema view
    * [ ] Nested JSON(Enter, Leave)
  * [x] JSON view
* Operation
  * Table
    * [x] Add Table
    * [ ] Edit Table
    * [ ] Delete Table
  * Record
    * [ ] Add multiple records
    * [ ] Add record
    * [ ] Edit record
    * [ ] Delete record
