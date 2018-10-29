import JsonP from 'jsonp'

export default function jsonp (options) {
  return new Promise((resolve, reject) => {
    JsonP(options.url, {param: 'callback'}, function (err, response) {
      if (!err) {
        resolve(response)
      } else {
        reject(response.messsage)
      }
    })
  })
}
