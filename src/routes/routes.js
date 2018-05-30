import express from 'express';
// import { findPeople, addPerson, findPerson, 
//     updatePerson, deletePerson } from '../controllers/People';
import People from '../models/People';
    

const router = express.Router();

const getPerson = (req, res) => {
    const { id } = req.params;
    return People.findById(id, (err, person) => {
        if(!person){
            return res.status(404).json({
                message : "Person not Found"
            })
        } 
        if(err){
            return res.status(500).json({
                message : "Error Retrieving Person"
            });
        }
        return person
    })
}

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Census',
    });
});

router.get('/people', (req, res) => {
    People.find({}, (err, people) => {
        if(err){
           return res.status(500).json(err);
        } else {
            return res.status(200).json(people)
        }
    })
});
router.post('/people', (req, res) => {
    const person = new People(req.body[0]);
    person.save( err => {
        if (err){
            return res.status(500).json(err);
        } else {
            return res.status(201).json(person);
        }
    });
});
router.get('/people/:id', (req, res) => {
    getPerson(req, res).then( person => {
        return res.status(200).json(person)
    })
});

router.put('/people/:id', (req, res) => {
    getPerson(req, res).then( person => {
        const details = req.body[0]
        person.firstname = details.firstname;
        person.lastname = details.lastname;
        person.birthyear = details.birthyear;

        person.save( err => {
            if (err){
                return res.status(500).json(err);
            } else {
                return res.status(201).json(person);
            }
        });
    })
});


router.delete('/people/:id', (req, res) => {
    getPerson(req, res).then( person => {

        person.remove( err => {
            if (err){
                return res.status(500).json(err);
            } else {
                return res.status(200).json({
                    message : "Entry removed"
                });
            }
        });
    })
});

export default router;
