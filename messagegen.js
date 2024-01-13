const p2 = require('./messages/p2identifier.js');
const p3 = require('./messages/p3compliment.js');
const p1 = require('./messages/p1greeting.js');
const p4 = require('./messages/p4closer.js');


//insert random message - replace/build this out into proper back end

const newmsg = () => `${p1[Math.floor(Math.random() * p1.length)]} ${p2[Math.floor(Math.random() * p2.length)]
  } ${p3[Math.floor(Math.random() * p3.length)]} ${p4[Math.floor(Math.random() * p4.length)]
  }`;

module.exports = { newmsg };
