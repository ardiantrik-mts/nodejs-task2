const express = require('express');
const router = express.Router();
const fs = require('fs');
const fileName = "person.json"

router.get('/', async (req, res) => {
    console.log(req.query);
    try {
        var obj;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) throw err;

            obj = JSON.parse(data);
            var showUsers
            if (req.query.name || req.query.age) {
                if (req.query.name == undefined) {
                    showUsers = obj.filter(orang => orang.age == req.query.age);
                }
                if (req.query.age == undefined) {
                    var searchRegExp = new RegExp(req.query.name , 'i')
                    showUsers = obj.filter(orang => searchRegExp.test(orang.name));
                }
            }else{
                showUsers = obj;
            }
            
            if (showUsers.length == 0) {
                res.status(404).send({ "message" : "Data tidak ditemukan!" });
            }else{
                console.log(showUsers.length);
                res.send(showUsers);
            }
            
        });
        // const items = await Item.find({ itemName: new RegExp(req.params.name, 'i') });
        // res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    try {
        var obj;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) throw err;

            obj = JSON.parse(data);
            // console.log(req.body);
            
            obj.push(req.body);

            fs.writeFile(fileName, JSON.stringify(obj, null, 2), err => {
     
                // Checking for errors
                if (err) throw err; 

                console.log(obj);
                res.send(obj);
            });

        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/id/:id', async (req, res) => {
    console.log(req.url);
    try {
        var obj;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) throw err;

            obj = JSON.parse(data);
            console.log(req.body);
            
            const indexUp = obj.findIndex(orang => orang.id == req.params.id);

            if (req.body.name) {
                obj[indexUp].name = req.body.name ;
            } 
            if (req.body.age) {
                obj[indexUp].age = req.body.age ;
            }
            if (req.body.address) {
                // await Item.replaceOne( item._id , { description: req.body.description });
                obj[indexUp].address = req.body.address ;
            }
            // console.log(obj[indexUp]);

            if (indexUp < 0) {
                res.status(404).send({ "message" : "Data tidak ditemukan!" });
            }else{
                // obj.splice(indexDel, 1)
                fs.writeFile(fileName, JSON.stringify(obj, null, 2), err => {
         
                    // Checking for errors
                    if (err) throw err; 
                   
                    console.log(obj);
                    res.send(obj);
                });
            }

        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/id/:id', async (req, res) => {
    console.log(req.url);
    try {
        var obj;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) throw err;

            obj = JSON.parse(data);
            console.log(req.params);
            
            
            const indexDel = obj.findIndex(orang => orang.id == req.params.id);
            console.log(indexDel);
            if (indexDel < 0) {
                res.status(404).send({ "message" : "Data tidak ditemukan!" });
            }else{
                obj.splice(indexDel, 1)
                fs.writeFile(fileName, JSON.stringify(obj, null, 2), err => {
         
                    // Checking for errors
                    if (err) throw err; 
                   
                    console.log(obj);
                    res.send(obj);
                });
            }

        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;