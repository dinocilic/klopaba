const express = require('express')
const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const nodeMailer = require('nodemailer')
const MongoClient = require('mongodb').MongoClient

const router = express.Router()

//const url = 'mongodb+srv://nodi:2826pakloBa@cluster0.oqamydx.mongodb.net/?retryWrites=true&w=majority'
const url = "mongodb+srv://nodi:tehnicar32@cluster0.oqamydx.mongodb.net/?retryWrites=true&w=majority"

// Imena glavni gradova
router.get('/gradovi', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('glavni_gradovi').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Imena ostalih gradova
router.get('/gradovi/ostali', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('ostali_gradovi').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Restoran po gradu
router.get('/grad/:slug', async (req, res) => {
    // const grad = await loadCollections()
    const ime_grada = req.params.slug
    // res.send(await grad.collection(ime_grada).find({}).toArray())

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection(ime_grada).find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Svi gradovi skupa
router.get('/gradovi/svi', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_gradovi').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Quotes
router.get('/quotes', async (req, res) => {

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('quotes').aggregate([
            {
                $sample: {size:2}
            }
        ]).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})


router.get('/restoran/:string', async (req, res) => {
    const ime = req.params.string

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').findOne({slug: ime}, {result: 1}, (err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})


router.post('/restoran/:id/komentar', async (req, res) => {
    var komObj = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        rate: req.body.rate,
        komentar: req.body.komentar,
        createdAt: new Date().toLocaleString()
    }
    const id = new ObjectId(req.params.id.trim())

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').updateOne({"_id": id}, {
            $push: {
                'komentari': {
                    $each: [komObj],
                    $position: 0
                }
            }
        }, (err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})



// Post sliku
// router.post('/grad/:string/slika/:id', async (req, res) => {
//     const grad = await loadCollections()
//     // console.log(req.params.string)
//     var slikaObj = {
//         ime: req.body.ime,
//         slika: req.body.file,
//         createdAt: new Date().toLocaleDateString()
//     }
//     const id = new ObjectId(req.params.id.trim())
//     await grad.collection("restorani").updateMany(
//         {_id: id},
//         { $push: {
//             slika: {
//                 slikaObj
//             }
//         }}
//     )
//     res.status(201).send()
// })

// Svi Restorani query
router.get('/gradovi/restorani', async (req, res) => {

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Random restorani
router.get('/gradovi/restorani/random', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').aggregate([{$sample: {size: 3}}]).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Random restorani po gradu
router.get('/grad/:string/random', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').aggregate([
            {
                $match: {"grad": req.params.string}
            },
            {
                $sample: { size: 1}
            }
        
        ]).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })

})

// kontakt agenciju 
router.get('/kontakt/:slug', async(req, res) => {
    const ime = req.params.slug

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').findOne({slug: ime}, {result: 1}, (err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
})

// Add to subs
router.post('/klopaba/subscribed', async (req, res) => {
    var subObj = {
        email: req.body.email,
        createdAt: new Date().toLocaleDateString()
    }

    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('subscribe').insertOne(
            {
                email: {
                    subObj
                }
            },
            (err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })

})

router.post('/klopaba/kontakt-form', async (req, res) => {
    var transporter = nodeMailer.createTransport({
        host: 'smtp.zoho.eu',
        secure: true,
        port: 465,
        auth: {
            user: 'info@klopa.ba',
            pass: 'gbiFnKhLBxRM'
        }
    })

    var textBody = `FROM: ${req.body.ime}\nEMAIL: ${req.body.email}\nMESSAGE: ${req.body.poruka}`
    var htmlBody = `<h2>Kontakt Poruka</h2>
    <h4>Ime: <strong>${req.body.ime}</strong></h4>
    <h4>Prezime: <strong>${req.body.prezime}</strong></h4>
    <h4>Email: <strong>${req.body.email}</strong></h4>
    <h4>Poruka: <strong>${req.body.poruka}</strong></h4>
    <br />
    <h4>Želimo vam ugodan dan!</h4>
    <h4>Klopa.ba Administracija</h4>
    `
    const mailOptions = {
        from: "'No Reply' <info@klopa.ba>",
        to: "info@klopa.ba",
        subject: 'Kontakt poruka od ' + req.body.ime + ' ' + req.body.prezime,
        text: textBody,
        html: htmlBody
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
})

router.post('/klopaba/kontakt-lokal', async (req, res) => {
    var transporter = nodeMailer.createTransport({
        host: 'smtp.zoho.eu',
        secure: true,
        port: 465,
        auth: {
            user: 'info@klopa.ba',
            pass: 'gbiFnKhLBxRM'
        }
    })

    var textBody = `FROM: ${req.body.ime}\nEMAIL: ${req.body.email}\nMESSAGE: ${req.body.poruka}`
    var htmlBody = `<h2>Kontakt Poruka</h2>
    <h4>Ime: <strong>${req.body.ime}</strong></h4>
    <h4>Prezime: <strong>${req.body.prezime}</strong></h4>
    <h4>Email: <strong>${req.body.email}</strong></h4>
    <h4>Poruka: <strong>${req.body.poruka}</strong></h4>
    <br />
    <h4>Želimo vam ugodan dan!</h4>
    <h4>Klopa.ba Administracija</h4>
    `
    const mailOptions = {
        from: "'No Reply' <info@klopa.ba>",
        to: "info@klopa.ba",
        subject: 'Kontakt poruka za ' + req.body.restoran,
        text: textBody,
        html: htmlBody
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
})


router.post('/klopaba/dodaj', async (req, res) => {
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        var dbo = db.db('klopaba')
        dbo.collection('svi_restorani').insertOne(
            {
                kontakt_osoba: {
                    ime: req.body.kontakt_osoba.ime,
                    prezime: req.body.kontakt_osoba.prezime,
                    email: req.body.kontakt_osoba.email,
                    telefon: req.body.kontakt_osoba.telefon
                },
                grad: req.body.grad,
                restoran: req.body.restoran,
                podaci: {
                    adresa: req.body.podaci.adresa,
                    kontakt: [
                        {
                            broj_telefona: req.body.kontakt_osoba.telefon,
                            email: req.body.kontakt_osoba.email,
                            url: {
                                facebook: req.body.podaci.kontakt.url.facebook,
                                instagram: req.body.podaci.kontakt.url.instagram,
                                twitter: req.body.podaci.kontakt.url.twitter,
                                linkedin:req.body.podaci.kontakt.url.linkedin,
                                website:req.body.podaci.kontakt.url.website
                            }
                        }
                    ],
                    opis: req.body.podaci.opis,
                    radni_sati: {
                        otvoreno: true,
                        radna_sedmica: [ "ponedjeljak: 07:00 – 23:00", "utorak: 07:00 – 23:00", "srijeda: 07:00 – 23:00", "četvrtak: 07:00 – 23:00", "petak: 07:00 – 23:00", "subota: 07:00 – 23:00", "nedjelja: 07:00 – 23:00"
                        ]
                    }
                },
                slug: req.body.restoran.split(' ').join('-').toLowerCase(),
                aktivni: false,
                kreirani: req.body.kreirani,
                odbijeni: false,
                slike: [
                    {
                        ime: req.body.slika.ime,
                        size: req.body.slika.size,
                        type: req.body.slika.type,
                        url: req.body.slika.url
                    }
                ],
                rating: [0],
                komentari: []  
            },
            (err, result) => {
            if (err) throw err;
            res.send(result)
            db.close()
        })
    })
    var transporter = nodeMailer.createTransport({
        host: 'smtp.zoho.eu',
        secure: true,
        port: 465,
        auth: {
            user: 'info@klopa.ba',
            pass: 'gbiFnKhLBxRM'
        }
    })
    var textBody = `LOKAL: ${req.body.restoran}\nGRAD: ${req.body.grad}`
    var htmlBody = `<h2>Registracija</h2>
    <h4>Lokal: <strong>${req.body.restoran}</strong></h4>
    <h4>Grad: <strong>${req.body.grad}</strong></h4>
    <br />
    <h4>Kontakt Osoba: <strong>${req.body.kontakt_osoba.ime} ${req.body.kontakt_osoba.prezime}</strong></h4>
    <br />
    <h4>Želimo vam ugodan dan!</h4>
    <h4>Klopa.ba Administracija</h4>
    `
    const mailOptions = {
        from: "'No Reply' <info@klopa.ba>",
        to: "info@klopa.ba",
        subject: 'Novi Lokal Registrovan',
        text: textBody,
        html: htmlBody
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
})


// async function loadCollections() {
//     // const client = await mongodb.MongoClient.connect("mongodb+srv://nodi:2826pakloBa@cluster0.oqamydx.mongodb.net/?retryWrites=true&w=majority", {
//     //      useNewUrlParser: true,
//     //      useUnifiedTopology: true,
//     // })
//     //const client = await mongodb.MongoClient.connect("mongodb://nodi:2826nodi@178.62.202.45?retryWrites=true&w=majority", {
//     //    useNewUrlParser: true,
//     //    useUnifiedTopology: true,
//     //})    
//     const client = await mongodb.MongoClient.connect("mongodb://localhost:27017/", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     return client.db('klopaba')
// }

module.exports = router;
