const Boards = require('../models/boards');

/**
 * Details about the stage
 * 1: TODO
 * 2: In Progress
 * 3: Completed
 */

const stageStatus = {
    "TODO": 1,
    "InProgress":2,
    "Completed":3
}

const createItem = async (req,res) =>{
    try {
        const title = req.body.title
        const data = await Boards.findAll({})
        const id = data.length + 1
        const stage= stageStatus.TODO
        const item = await Boards.create({id,stage,title})
    
        res.status(201).json(item)
    } catch (error) {
        throw new Error(error.message)
        
    }
}

const updateById = async (req,res) =>{
    try {
        
        const id = req.params.id
        const stage = req.body.stage

        if(![1,2,3].includes(stage)){
            res.status(400).send('incorrect stage value')
        }

        const data = await Boards.findOne({where: {id}})

        if(!data){
            res.status(404).send('NOT FOUND')
        }

        const item = await Boards.update({stage},{where: {id}})
        
        const updatedItem = await Boards.findOne({where: {id}})
        res.status(200).json(updatedItem)

    } catch (error) {
        throw new Error(error.message)
        
    }

}

module.exports = {
    createItem,
    updateById
}