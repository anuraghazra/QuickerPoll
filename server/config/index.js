const dbuser = 'quickpollhandle';
const dbpassword = 'quickpoll%40%40%40%40%4012345';


const MONGODB_URI = (`mongodb://${dbuser}:${dbpassword}@ds227255.mlab.com:27255/quickpoll`);

module.exports = MONGODB_URI;