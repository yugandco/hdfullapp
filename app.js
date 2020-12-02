const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const serveStatic = require('serve-static')
// Server Engine
const app = express()

// DB Engine
const dbconfig = require('./config/dbconfig');
mongoose.Promise = global.Promise
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Mlab connected")
}).catch((err) => {
    console.log("Mlab could not be connected: " + err)
})

// Setup MiddleWare
// if(process.env.NODE !== 'production'){
//     app.use(cors())
// }

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const urlencoded = bodyParser.urlencoded({extended: false})
app.use((req, res, next) => {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    next()
});

// Require Models
const User = require('./models/User')
const Client = require('./models/Client')
const Companion = require('./models/Companion')
const e = require('express')



// POST ::REGISTR
app.post('/api/registr', async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 10),
        terms: req.body.terms
    })
    console.log(newUser)
    await newUser.save((err) => {
        if(err) return console.log(err)
        return res.status(200).json({
            title: "You're registred"
        })
    }) 
})

// POST ::LOGIN
app.post('/api/login', async (req, res) => {
    await User.findOne({phoneNumber: req.body.phoneNumber}, (err, user) => {
        if(err){
            return res.status(500).json({
                title: 'Server error',
                err
            })
        }
        if(!user){
            return res.status(401).json({
                title: 'User not found',
                errror: 'Invalid credentials'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: 'Invalid credentials'
            })
        }
        // If all Good
        let token = jwt.sign({ userID: user._id }, 'secretki')
        let user_id = user._id
        let userIsCompanion = user.isCompanion
        let userIsClient = user.isClient
        let userPhoneNumber = user.phoneNumber
        let userFullName = user.firstName + ' ' + user.lastName
        return res.status(200).json({
            title: 'Login is successfully',
            token,
            user_id,
            userIsCompanion,
            userIsClient,
            userPhoneNumber,
            userFullName
        })
    })
})

// GET ::USER DATA  
app.get('/api/userData', (req, res) => {
    let token = req.headers.token
    jwt.verify(token, 'secretki', (err, decoded) => {
        if (err)
            return res.status(401).json({
                msg: "Unauthed user"
            })
        // IF TOKEN VALID
         User.findOne({_id: decoded.userID}, (err, user) => {
            if(err) return console.log(err);
            return res.status(200).json({
                title: "User is here",
                user
            })
        })
    })
})


// POST HOMESEARCH
app.post('/api/homeSearch', async (req, res) => {
    const searchClient = new Client({
        clientID: req.headers.userid,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        typeTransport: req.body.transport,
        from: req.body.from,
        to: req.body.to,
        typePackage: req.body.packageType,
        date: req.body.date,
        price: req.body.price
    })

    console.log(searchClient)
    await searchClient.save((err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            title: 'New search is saved'
        })
    })
})

app.get('/api/show-companions/:from/:to/:date/:price/:replacedPackageType/:transport', urlencoded, async (req, res) => {
    const replacedPackageType = req.params.replacedPackageType.replace(/-/g, ' ')
    await Companion.find({from: req.params.from, to: req.params.to, price: req.params.price, date: req.params.date, typeTransport: req.params.transport}, (err, companions) => {
        if(err){
            return res.status(404).json({
                title: 'Попутчик не найден!'
            })
        }

        Client.findOne({from: req.params.from, to: req.params.to, price: req.params.price, typePackage: replacedPackageType, date: req.params.date, typeTransport: req.params.transport}, (err, client) => {
            if(err) return console.log(err)

            return res.status(200).json({
                title: 'Все что нашел!',
                companions,
                client
            })
        })
    })
})

// @GET,@POST FROM CLIENT
app.post('/api/show-companions/:clientorderid/:userid/:companionitemid', async (req, res) => {
    Companion.findOne({_id: req.params.companionitemid}, (err, companion) => {
        Companion.findByIdAndUpdate({_id: req.params.companionitemid}, {$push: {"counterOfApplicationsFromClients": {clientid: req.params.userid, orderid: req.params.clientorderid, text: 'Заявка подана'}}}, {safe: true, upsert: true, new: true}, (err) => {
            if(err) return console.log(err);
            Client.findOneAndUpdate({_id: req.params.clientorderid}, {$push: {"counterOfApplicationsFromClients" : {companionid: companion.companionID, orderid: req.params.companionitemid, text: 'Заявка подана'}}}, {safe: true, upsert: true, new: true}, (err) => {
                if(err) return console.log(err)
                return res.status(200).json({
                    title: 'Заявка подана'
                })
            })
        })
    })
})

        

// @POST FROM COMPANION
app.post('/api/becomeCompanion', async (req, res) => {
    const cc = {
        isCompanion: req.body.isCompanion,
        isClient: req.body.isClient
    }
    let query = {_id: req.headers.userid}

    await User.updateOne(query, cc, (err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            msg: 'User data updated successfully'
        })
    })
})

// @POST FROM CLIENT
app.post('/api/becomeClient', async (req, res) => {
    const cc = {
        isCompanion: req.body.isCompanion,
        isClient: req.body.isClient
    }
    let query = {_id: req.headers.userid}

    await User.updateOne(query, cc, (err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            msg: 'User data updated to client'
        })
    })
})


// @GET FROM COMPANION
app.post('/api/companion-home', async (req, res) => {
    let companion = new Companion({
        companionID: req.headers.userid,
        phoneNumber: req.body.phoneNumber,
        fullName: req.body.fullName,
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        typePackage: req.body.typePackage,
        price: req.body.price,
        typeTransport: req.body.typeTransport
    })

    companion.save(err => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: "Вы успешно создали объявление!"
        })
    })
})


app.get('/api/companion-home-search-result/:typeTransport/:from/:to/:price/:replacedPackageType/:date', async (req, res) => {
    const replacedPackageType = req.params.replacedPackageType.replace(/-/g, ' ')
    Client.find({from: req.params.from, to: req.params.to, price: req.params.price, typeTransport: req.params.typeTransport, typePackage: replacedPackageType, date: req.params.date}, (err, clients) => {
        if(err) return console.log(err)
        Companion.findOne({from: req.params.from, to: req.params.to, price: req.params.price, typeTransport: req.params.typeTransport, typePackage: replacedPackageType, date: req.params.date}, (err, companion) => {
            if(err) return console.log(err)

            return res.status(200).json({
                title: 'Все попутчики тут',
                clients,
                companion
            })
        })
    })
})

app.post('/api/companion-home-search-result/:companionitemid/:userid/:clientorderid', async (req, res) => {
    Client.findOne({_id: req.params.clientorderid}, (err, client) => {
        Client.findByIdAndUpdate({_id: req.params.clientorderid}, {$push: {"counterOfApplicationsFromCompanions": {companionid: req.params.userid, orderid: req.params.companionitemid, text: 'Заявка подана'}}}, {safe: true, upsert: true, new: true}, (err) => {
            if(err) return console.log(err);
            Companion.findOneAndUpdate({_id: req.params.companionitemid}, {$push: {"counterOfApplicationsFromCompanions" : {clientid: client.clientID, orderid: req.params.clientorderid, text: 'Заявка подана'}}}, {safe: true, upsert: true, new: true}, (err) => {
                if(err) return console.log(err)
                return res.status(200).json({
                    title: 'Заявка подана'
                })
            })
        })
    })
})


// @GET FROM COMPANION ADS
app.get('/api/companion-history/:userid', async (req, res) => {
    await Companion.find({companionID: req.params.userid}, (err, companions) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'Все ваши объявлении',
            companions
        })
    })
})


// Get All applications submited by Clients, and show in companion
app.get('/api/companion-applications-from-clients/:companionUserID', async (req, res) => {
    await Client.find({"counterOfApplicationsFromClients.companionid": req.params.companionUserID}, (err, clients) => {
        if(err) return console.log(err)

        return res.status(200).json({
            text: 'All applications from Clients!',
            clients
        })
    })
})

// Accept Application from Clients
app.post('/api/companion-applications-from-clients/:companionUserID/:clientOrderID', async (req, res) => {
    Client.findOne({_id: req.params.clientOrderID}, (err, client) => {
        if(err) return console.log(err)

        if(client.companion.deliveryStatus.isResponded.status === true){
            return res.json({
                title: 'Заявка уже принято!'
            })
        } else {
            Companion.findOne({companionID: req.params.companionUserID}, (err, companion) => {
                if(err) return console.log(err)
                
                Client.updateOne({_id: req.params.clientOrderID}, {
                    applicationStatus: {
                        isAccepted: {
                            text: `Заявка принято попутчиком ${companion.companionID}`,
                            status: true
                        }
                    },
                    companion: {
                        id: req.params.companionUserID,
                        phoneNumber: companion.phoneNumber,
                        fullName: companion.fullName,
                        deliveryStatus: {
                            isResponded: {
                                text: 'Заявка принято попутчиком',
                                status: true
                            }
                        }
                    }
                }, (err) => {
                    if(err) return console.log(err)
                })
                
                Companion.findOneAndUpdate({companionID: req.params.companionUserID}, 
                    {$push: {
                        "client": {
                            id: client.clientID,
                            phoneNumber: client.phoneNumber,
                            fullName: client.fullName,
                            deliveryStatus: {
                                isAdopted: {
                                    text: 'Заявка принято мною или попутчиком',
                                    status: true
                                }
                            }
                        }
                }}, {safe: true, upsert: true, new: true}, (err) => {
                    if(err) return console.log(err)

                    return res.status(200).json({
                        title: 'Вы доставляете эту посылку, удачи!'
                    })
                })
            })
        }
    })
    
})

// Get All Applications submited by companion
app.get('/api/companion-applications-from-me/:companionUserID', async (req, res) => {
    await Client.find({"counterOfApplicationsFromCompanions.companionid": req.params.companionUserID}, (err, clients) => {
        if(err) return console.log(err)

        return res.status(200).json({
            text: 'All applications from Client, submitted by you!',
            clients
        })
    })
})


// Get All Applications submitted by Companion, show in client
app.get('/api/client-applications-from-companions/:clientUserID/:orderid', async (req, res) => {
    Companion.find({"counterOfApplicationsFromCompanions.clientid": req.params.clientUserID, "counterOfApplicationsFromCompanions.orderid": req.params.orderid}, (err, companions) => {
        if(err) return console.log(err)

        return res.status(200).json({
            text: 'All applications from Companion!',
            companions,
        })
    })
})

app.post('/api/client-applications-from-companions/:clientUserID/:companionOrderID', async(req, res) => {
    await Client.findOne({clientID: req.params.clientUserID}, (err, client) => {
        if(err) return console.log(err)
        
        if(client.companion.deliveryStatus.isResponded.status === true) {
            return res.json({
                title: 'Вашу заявку приняли или вы уже сами приняли заявку'
            })
        } else {
            Companion.findOne({_id: req.params.companionOrderID}, (err, companion) => {
                if(err) return console.log(err)

                Client.updateOne({clientID: req.params.clientUserID}, {
                    applicationStatus: {
                        isAccepted: {
                            text: `Заявка принято мною`,
                            status: true
                        }
                    },
                    companion: {
                        id: companion.companionID,
                        phoneNumber: companion.phoneNumber,
                        fullName: companion.fullName,
                        deliveryStatus: {
                            isResponded: {
                                text: 'Заявка принято мною',
                                status: true
                            }
                        }
                    }
                }, (err) => {
                    if (err) return console.log(err)
                })

                Companion.findOneAndUpdate({_id: req.params.companionOrderID}, 
                    {$push: {
                        "client": {
                            id: req.params.clientUserID,
                            phoneNumber: client.phoneNumber,
                            fullName: client.fullName,
                            deliveryStatus: {
                                isAdopted: {
                                    text: 'Заявка принято мною или попутчиком',
                                    status: true
                                }
                            }
                        }
                }}, {safe: true, upsert: true, new: true}, (err) => {
                    if(err) return console.log(err)

                    return res.status(200).json({
                        title: `Вы приняли заявку, ${companion.companionID} доставляет вашу заявку!`
                    })
                })

            })
        }
    })
})


app.get('/api/client-applications-from-me/:userid/:orderid', async (req, res) => {
    await Companion.find({"counterOfApplicationsFromClients.clientid": req.params.userid, "counterOfApplicationsFromClients.orderid": req.params.orderid}, (err, companions) => {
        if(err) return console.log(err)

        return res.status(200).json({
            text: 'All applications from Companion, submitted by you!',
            companions
        })
    })
})


app.post('/api/companion-new-order', async (req, res) => {
    const newCompanionAds = new Companion({
        companionID: req.headers.userid,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        typePackage: req.body.typePackage,
        price: req.body.price,
        typeTransport: req.body.typeTransport
    })

    console.log(newCompanionAds)
    await newCompanionAds.save(err => {
        if(err) return console.log(err)

        return res.status(200).json({
            msg: "Saved your new ads"
        })
    })
})

// ROUTES FOR COMPANION /COMPANION-HISTORY
// app.get('/api/companion-history/:companionUserID', async (req, res) => {
//     await Companion.findOne({companionID: req.params.companionUserID}, (err, companion) => {
//         if(err) return console.log(err)

//         if(!companion){
//             return res.json({
//                 title: 'У вас нет посылок, для начала подайте объялвение!'
//             })
//         } else {
//             let id = []
//             companion.client.forEach(cl => {
//                 id.push(cl.id)
//             })

//             Client.find({clientID: id}, (err, clients) => {
//                 if(err) return console.log(err)

//                 return res.status(200).json({
//                     title: 'Посылки которые вам надо доставить',
//                     clients,
//                     companion
//                 })
//             })
//         }
//     })  
// })

// app.post('/api/companion-history/:clientOrderID/:companionUserID', async(req, res) => {
    
//     Client.findOne({_id: req.params.clientOrderID}, (err, client) => {
//         if(err) return console.log(err)
        
//         Client.updateOne({_id: req.params.clientOrderID}, {$set: {'companion.deliveryStatus.isDelivered.text': 'Посылка доставлена', 'companion.deliverStatus.isDelivered.status': true}}, (err) => {
//             if (err) return console.log(err)
//         })

//         Companion.findOneAndUpdate({companionID: req.params.companionUserID, "client.id": client.clientID},
//             {$set: {"client.$.deliveryStatus.isDone.text": "Посылку доставил", "client.$.deliveryStatus.isDone.status": true}} , (err) => {
//                 if(err) return console.log(err)

//                 return res.status(200).json({
//                     title: 'Вы успешно доставили посылку'
//                 })
//         })
//     })
// })

// ROUTES FOR CLIENT /HISTORY
app.get('/api/history/:userid', async (req, res) => {
    await Client.find({clientID: req.params.userid}, null, {sort: {createdAt: -1}},(err, clients) => {
        if(err) return res.status(404).json({
            msg: 'Not founded'
        })

        return res.status(200).json({
            msg: "Your orders is here",
            clients
        })
    })
})

app.delete('/api/history/:userid/:orderid', async (req, res) => {
    await Client.deleteOne({_id: req.params.orderid, clientID:  req.params.userid}, (err) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'Вы удалили этот заказ'
        })
    })
})

// LIST ALL COMPANIONS CHOSE BY CLIENTS
app.get('/api/client-orders/:from/:to', async(req, res) => {
    await Companion.find({from: req.params.from, to: req.params.to}, (err, companions) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: "All Companions is here",
            companions
        })
    })
})

app.get('/api/companion-orders/:from/:to', async (req, res) => {
    await Client.find({from: req.params.from, to: req.params.to}, (err, clients) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'All Clients is here',
            clients
        })
    })
})


// app.post('/api/submit-client-orders/:userid/:itemid/:from/:to', async (req, res) => {
//     Companion.findOne({_id: req.params.itemid}, (err, companion) => {
//         Client.findOne({clientID: req.params.userid}, (err, client) => {
//             if(client.from !== companion.from && client.to !== companion.to){
//                 return res.json({
//                     title: "Для того, чтобы подать заявку нужно создать свое объявление"
//                 })
//             } else {
//                 Client.findOneAndUpdate({from: companion.from, to: companion.to}, {
//                     $push: {
//                         "counterOfApplicationsFromClients": {
//                             companionid: companion.companionID,
//                             orderid: req.params.itemid,
//                             text: 'Заявка подана'
//                         }
//                     }   
//                 },
//                 {
//                     safe: true,
//                     upsert: true,
//                     new: true
//                 }, (err) => {
//                     if(err) return console.log(err)

//                     Companion.findOneAndUpdate({_id: req.params.itemid}, {
//                         $push: {
//                             "counterOfApplicationsFromClients": {
//                                 clientid: req.params.userid,
//                                 orderid: req.params.itemid,
//                                 text: 'Заявка подана'
//                             }
//                         }
//                     }, {
//                         safe: true,
//                         upsert: true,
//                         new: true
//                     }, (err) => {
//                         if(err) return console.log(err)
//                     })
//                 })

//                 return res.status(200).json({
//                     title: 'Вы успешно подали заявку'
//                 })
//             }
//         })
//     })
// })

if(process.env.NODE_ENV === 'production'){
    app.use('/', serveStatic(path.join(__dirname, '/dist')))

    app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')))
}

// 
// PORT ENGINE
const PORT = process.env.PORT || 5000
// SERVER RUNNED
app.listen(PORT, () => {console.log(`Server runned on ${PORT}`)})
