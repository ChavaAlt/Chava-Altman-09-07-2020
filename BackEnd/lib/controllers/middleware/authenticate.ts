
import * as jwt  from'jsonwebtoken';
import  users   from '../../modules/users/schema';


class Authenticate
{

public authenticate = (req, res, next) => {
  let token = req.header('xx-auth');
  let decoded = jwt.verify(token.toString(), 'my secret');
 
  return users.findOne({
    '_id': decoded._id
  }).then((user)=>{
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};
}

export default new Authenticate