let mongoose = require('mongoose');
let config = require('../config/database');
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require("../models/user");
let Technic = require("../models/technic");
let Client = require("../models/client");
let Type_t = require("../models/type_t");
let Price_list = require("../models/price_list");
let Orders = require("../models/orders");

router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      last_name: req.body.last_name,
      name: req.body.name,
      middle_name: req.body.middle_name

    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 // 1 min
          });
          // return the information including token as JSON
          res.cookie('Authorized',token);
          res.cookie('id',user._id);
          res.json({success: true, user: user.last_name+' '+user.name+' '+user.middle_name, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/signout', function(req, res) {
  req.clearCookie;
  res.json({success: true, msg: 'signout'});
});

//создание техники

router.post('/technic', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newTechnic = new Technic({
      type_t: req.body.type_t,
      name: req.body.name,
      maker: req.body.maker,
      date_make: req.body.date_make,
      price: req.body.price
    });

    newTechnic.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save technic failed.'});
      }
      res.json({success: true, msg: 'Successful created new technic.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение списка техники

router.get('/technic', function(req, res) {
  let token = req.cookies;
  if (token) {
    Technic.find(function (err, Technic) {
      if (err) return next(err);
      res.json(Technic);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление техники

router.delete('/technic/delete/:id', function (req, res) {
    let mass = req.body.selected.split(',');
    let token = req.cookies.Authorized;

    if (token !== null) {
      Technic.deleteMany({
            _id: mass
        }, function (err) {
            if (err) {
                return res.json({success: false, msg: 'Delete Orders failed.'});
            } else {
                return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
            }
        })
    }
});

//изменение

router.patch('/technic/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Technic.findById(req.body._id, (err, Technic) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.type_t){
        Technic.type_t = req.body.type_t;
      }
      if(req.body.name){
            Technic.name = req.body.name;
          }
      if(req.body.maker){
            Technic.maker = req.body.maker;
          }
      if(req.body.date_make){
            Technic.date_make = req.body.date_make;
          }
      if(req.body.price){
            Technic.price = req.body.price;
          }

      Technic.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Orders failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }


});



//создание типа техники

router.post('/type_t', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newType_t = new Type_t({
      name: req.body.name
    });

    newType_t.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save type_t failed.'});
      }
      res.json({success: true, msg: 'Successful created new type_t.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение списка типов техники

router.get('/type_t', function(req, res) {
  let token = req.cookies;
  if (token) {
    Type_t.find(function (err, Type_t) {
      if (err) return next(err);
      res.json(Type_t);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление типа техники

router.delete('/type_t/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;

  if (token !== null) {
    Type_t.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Type_technic failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

//изменение типа техники

router.patch('/type_t/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Type_t.findById(req.body._id, (err, Type_t) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.name){
        Type_t.name = req.body.name;
      }

      Type_t.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Type_technic failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

//создание клиента

router.post('/client', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newClient = new Client({
      last_name: req.body.last_name,
      name: req.body.name,
      middle_name: req.body.middle_name,
      phone_number: req.body.phone_number,
      e_mail: req.body.e_mail
    });

    newClient.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Master failed.'});
      }
      res.json({success: true, msg: 'Successful created new Master.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение списка клиентов

router.get('/client', function(req, res) {
  let token = req.cookies;
  if (token) {
    Client.find(function (err, Client) {
      if (err) return next(err);
      res.json(Client);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление клиента

router.delete('/client/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;

  if (token !== null) {
    Client.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete client failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

//изменение клиента

router.patch('/client/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Client.findById(req.body._id, (err, Client) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.name){
        Client.name = req.body.name;
      }

      Client.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update client failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

//получение списка мастеров

router.get('/master', function(req, res) {
  let token = req.cookies;
  if (token) {
    User.find(function (err, User) {
      if (err) return next(err);
      res.json(User);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление мастера

router.delete('/master/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;

  if (token !== null) {
    User.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete User failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

//изменение мастера

router.patch('/master/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    User.findById(req.body._id, (err, User) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.last_name){
        User.last_name = req.body.last_name;
      }
      if(req.body.name){
        User.name = req.body.name;
      }
      if(req.body.middle_name){
        User.middle_name = req.body.middle_name;
      }

      User.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update User failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

//создание услуги

router.post('/price_list', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newPrice_list = new Price_list({
      type_t: req.body.type_t,
      name_service: req.body.name_service,
      price: req.body.price
    });
    newPrice_list.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Price_list failed.'});
      }
      res.json({success: true, msg: 'Successful created new Price_list.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение списка услуг

router.get('/price_list', function(req, res) {
  let token = req.cookies;
  if (token) {
    Price_list.find(function (err, Price_list) {
      if (err) return next(err);
      res.json(Price_list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление услуги

router.delete('/price_list/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;

  if (token !== null) {
    Price_list.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Price_list failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

//изменение услуги

router.patch('/price_list/upgrade', function (req, res) {
  let token = req.cookies.Authorized;
  if (token !== null){
    Price_list.findById(req.body._id, (err, Price_list) => {
      if(err){
        return res.json({success: false, msg: 'Not found.'});
      }
      if(req.body.name_service){
        Price_list.name_service = req.body.name_service;
      }
      if(req.body.price){
        Price_list.price = req.body.price;
      }

      Price_list.save((err, data) => {
        if(err){
          return res.json({success: false, msg: 'Update Price_list failed.'});
        }
        return res.json({success: true, msg: 'Successful Update ' + data});
      });

    });
  }
});

//создание заказа

router.post('/orders', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newOrders = new Orders({
      type_t: req.body.type_t,
      name_service: req.body.name_service,
      name: req.body.name,
      fio_client: req.body.fio_client,
      fio: req.body.fio,
      price: req.body.price
    });
    newOrders.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Orders failed.'});
      }
      res.json({success: true, msg: 'Successful created new Orders.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//получение списка заказов

router.get('/orders', function(req, res) {
  let token = req.cookies.Authorized;
  let mass = [];
  if (token !== null) {
    Orders.find({

    },function (err, obj){
      mass = obj;
      console.log(obj);
      for (let prop in mass){
        Type_t.findById({
          _id: mass[prop]['type_t']
        },{
          name: true,
          _id: false
        }, function (err, type_t) {
          mass[prop]['type_t'] = type_t['name'];
        })
            .catch(err => res.json(err))
      }
    }).then(db => setTimeout(dt =>  res.json(mass),100));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//удаление заказа

router.delete('/orders/delete/:id', function (req, res) {
  let mass = req.body.selected.split(',');
  let token = req.cookies.Authorized;

  if (token !== null) {
    Orders.deleteMany({
      _id: mass
    }, function (err) {
      if (err) {
        return res.json({success: false, msg: 'Delete Orders failed.'});
      } else {
        return res.json({success: true, msg: 'Successful Delete ' + req.params.id});
      }
    })
  }
});

//получение списков для селектов
router.get('/type_t/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Type_t.find({},{name: true, _id: false}, function (err, type_t){
      if (err) return next(err);
      for(let prop in type_t){
        list.push({value: type_t[prop].name, label: type_t[prop].name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/name_service/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Price_list.find({},{name_service: true, _id: false}, function (err, name_service){
      if (err) return next(err);
      for(let prop in name_service){
        list.push({value: name_service[prop].name_service, label: name_service[prop].name_service})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/name/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Technic.find({},{name: true, _id: false}, function (err, type_t){
      if (err) return next(err);
      for(let prop in type_t){
        list.push({value: type_t[prop].name, label: type_t[prop].name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/fio_client/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Client.find({},{last_name: true, name: true, middle_name: true, _id: false}, function (err, fio_client){
      if (err) return next(err);
      for(let prop in fio_client){
        list.push({value: fio_client[prop].last_name+" "+fio_client[prop].name+" "+fio_client[prop].middle_name, label: fio_client[prop].last_name+" "+fio_client[prop].name+" "+fio_client[prop].middle_name})
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// получение _id type_t
router.post('/type_t/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Type_t.find({
      name: req.body.name
    },{
      _id: true
    }, function (err, type_t){
      if (err) return next(err);
      for(let prop in type_t){
        list.push(type_t[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// получение _id name_service

router.post('/name_service/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Price_list.find({
      name_service: req.body.name
    },{
      _id: true
    }, function (err, name_service){
      if (err) return next(err);
      for(let prop in name_service){
        list.push(name_service[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/name/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Technic.find({
      name: req.body.name
    },{
      _id: true
    }, function (err, name){
      if (err) return next(err);
      for(let prop in name){
        list.push(name[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/fio_client/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  let fio = req.body.name.split(' ');
  if (token !== null) {
    Client.find({
      last_name: fio[0],
      name: fio[1],
      middle_name: fio[2]
    },{
      _id: true
    }, function (err, type_t){
      if (err) return next(err);
      for(let prop in type_t){
        list.push(type_t[prop]._id)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/price/list', function(req, res) {
  let token = req.cookies;
  let list = [];
  if (token !== null) {
    Price_list.find({
      _id: req.body._id
    },{
      _id: false,
      price: true
    }, function (err, name_service){
      if (err) return next(err);
      for(let prop in name_service){
        list.push(name_service[prop].price)
      }
      res.json(list);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/type_t/text', function(req, res) {
  let token = req.cookies.Authorized;
  let mass = [];
  if (token !== null) {
    Technic.find({

    },function (err, obj){
      mass = obj;
      for (let prop in mass){
        Type_t.findById({
          _id: mass[prop]['type_t']
        },{
          name: true,
          _id: false
        }, function (err, type_t) {
          mass[prop]['type_t'] = type_t['name'];
        })
            .catch(err => res.json(err))
      }
    }).then(db => setTimeout(dt =>  res.json(mass),100));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/price_list/text', function(req, res) {
  let token = req.cookies.Authorized;
  let mass = [];
  if (token !== null) {
    Price_list.find({

    },function (err, obj){
      mass = obj;
      for (let prop in mass){
        Type_t.findById({
          _id: mass[prop]['type_t']
        },{
          name: true,
          _id: false
        }, function (err, type_t) {
          mass[prop]['type_t'] = type_t['name'];
        })
            .catch(err => res.json(err))
      }
    }).then(db => setTimeout(dt =>  res.json(mass),100));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;