// backend/functions/gradovi.js
const { MongoClient } = require('mongodb');
const nodeMailer = require('nodemailer');

exports.handler = async function (event, context) {
    try {
        const url = "mongodb+srv://nodi:tehnicar32@cluster0.oqamydx.mongodb.net/?retryWrites=true&w=majority";

        // Imena glavni gradova
        if (event.path === "/gradovi") {
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('glavni_gradovi').find({}).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })
        }

        // Imena ostalih gradova
        else if (event.path === "/gradovi/ostali") {
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('ostali_gradovi').find({}).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })        }

        // Restoran po gradu
        else if (event.path.startsWith("/grad/")) {
            const ime_grada = event.path.split("/")[2];
            // ... (Your existing code for /grad/:slug route)
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection(ime_grada).find({}).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })
        }

        // Svi gradovi skupa
        else if (event.path === "/gradovi/svi") {
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('svi_gradovi').find({}).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })        }

        // Quotes
        else if (event.path === "/quotes") {
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
            })        }

        // Restoran po slugu
        else if (event.path.startsWith("/restoran/")) {
            const ime = event.path.split("/")[2];
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('svi_restorani').findOne({slug: ime}, {result: 1}, (err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })        }

        // Komentar na restoran
        else if (event.path.startsWith("/restoran/") && event.path.endsWith("/komentar")) {
            const id = new ObjectId(event.path.split("/")[2].trim());
            var komObj = {
                ime: req.body.ime,
                prezime: req.body.prezime,
                rate: req.body.rate,
                komentar: req.body.komentar,
                createdAt: new Date().toLocaleString()
            }
            // const id = new ObjectId(req.params.id.trim())
        
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
        }

        // Svi Restorani query
        else if (event.path === "/gradovi/restorani") {
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('svi_restorani').find({}).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })        }

        // Random restorani
        else if (event.path === "/gradovi/restorani/random") {
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('svi_restorani').aggregate([{$sample: {size: 3}}]).toArray((err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })        }

        // Random restorani po gradu
        else if (event.path.startsWith("/grad/") && event.path.endsWith("/random")) {
            const grad = event.path.split("/")[2];
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
        }

        // Kontakt agenciju
        else if (event.path.startsWith("/kontakt/")) {
            const ime = event.path.split("/")[2];
            MongoClient.connect(url, (err,db) => {
                if (err) throw err;
                var dbo = db.db('klopaba')
                dbo.collection('svi_restorani').findOne({slug: ime}, {result: 1}, (err, result) => {
                    if (err) throw err;
                    res.send(result)
                    db.close()
                })
            })
        }

        // Add to subs
        else if (event.path === "/klopaba/subscribed" && event.httpMethod === "POST") {
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
            })        }

        // Kontakt form
        else if (event.path === "/klopaba/kontakt-form" && event.httpMethod === "POST") {
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
        }

        // Kontakt lokal
        else if (event.path === "/klopaba/kontakt-lokal" && event.httpMethod === "POST") {
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
        }

        // Dodaj lokal
        else if (event.path === "/klopaba/dodaj" && event.httpMethod === "POST") {
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
        }

        // Handle other routes or methods if needed

        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
