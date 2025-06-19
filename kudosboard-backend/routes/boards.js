const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
// router.get('/', async(req, res) => {
//     const boards = await prisma.boards.findMany()
//     res.json(boards);
// })
router.get('/', async (req,res) => {
    const {category} = req.query
    console.log(category)
    const filters = {}
    if(category && category !== "all"){
        filters.category = category
    }
    try{
        const boards = await prisma.boards.findMany({
            where: filters
        })
        res.json(boards)
    } catch(err){
        console.log(err)
        res.status(500).json({error: "error"})
    }
})
router.post('/', async (req,res) =>{
    const {name, author, category} = req.body
    const newBoard = await prisma.boards.create({
        data:{
            name,
            author,
            category
        }
    })
    res.json(newBoard)
})
router.delete("/:boardId", async(req,res) =>{
    const {boardId} = req.params
    const deletedBoard = await prisma.boards.delete({
        where: {id: parseInt(boardId)}
    })
    res.json(deletedBoard)
})
module.exports = router;