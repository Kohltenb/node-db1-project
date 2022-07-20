const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const errMessage = { status: 400, }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    errMessage.message = 'name and budget are required'
  } else if (typeof name !== 'string') {
    errMessage.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errMessage.message = 'name of account must be between 3 and 100'
  } else if (typeof budget!== 'number' || isNaN(budget)) {
    errMessage.message = 'budget of account must be a number'
  } else if (budget > 0 || budget > 1000000) {
    errMessage.message = 'budget of account is too large or too small'
  }
  if (errMessage.message) {
    next(errMessage)
  } else {
  next()
  }
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
