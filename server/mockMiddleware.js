const DELAY = 200;

const sp = (res, obj, msg) => res.json({data: obj, status: 'success', msg: msg ? msg : ''});
const ep = (res, obj, msg) => res.json({data: obj, status: 'error',   msg: msg ? msg : ''});

export default function(req, res, next) {
  switch (req.url) {
    case '/api/users':
      setTimeout(() => {
        sp(res, {name: 'bitcoin'})
      }, DELAY);
      break;
    default:
      next();
      break;
  }
}
