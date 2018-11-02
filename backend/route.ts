import {Request, Response} from 'express'
import {api} from './api'

export const route = async (req: Request, res: Response, next) => {
  if (!req.path.startsWith('/api')) {
    return next()
  }
  const apiName = req.path.slice(5)
  console.log(req.path, apiName)

  try {
    const data = await api[apiName]
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send(e.message)
  }
}


