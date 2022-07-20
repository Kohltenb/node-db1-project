const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const errMessage = { status: 400, }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    errMessage.message = 'name and budget are required'
    next(errMessage)
  } else if (typeof name !== 'string') {
    errMessage.message = 'name of account must be a string'
    next(errMessage)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errMessage.message = 'name of account must be between 3 and 100'
    next(errMessage)
  } else if (typeof budget!== 'number' || isNaN(budget)) {
    errMessage.message = 'budget of account must be a number'
    next(errMessage)
  }
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC

  next()
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found' })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    next(err)
  }
}
