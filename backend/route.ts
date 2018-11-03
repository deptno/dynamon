import {Request, Response} from 'express'
import {api} from './api'

export const route = async (req: Request, res: Response, next) => {
  if (!req.path.startsWith('/api')) {
    return next()
  }
  const apiName = req.path.slice(5)
  console.log(req.path, apiName)

  try {
    res.status(200).send(await api[apiName]({query: req.query}))
  } catch (e) {
    res.status(500).send(e.message)
  }
}
