const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
// router.get('/', async(req, res) => {
//     const boards = await prisma.boards.findMany()
//     res.json(boards);
// })
router.get('/', async (req,res) => {
    const {category, search} = req.query
    console.log(category)
    const filters = {}
    if(category && category !== "all"){
        filters.category = category
    }
    if(search){
        const searchTerm = search.toLowerCase();
        filters.OR = [
            {name: {contains:searchTerm, mode: 'insensitive'}},
            {author: {contains:searchTerm, mode: 'insensitive'}},
            {category: {contains:searchTerm, mode: 'insensitive'}}
        ]
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

//viewing the board by id
router.get('/:boardId', async (req,res) => {
    const {boardId} = req.params
    try{
        const board = await prisma.boards.findUnique({
            where: {id: parseInt(boardId)}
        });
        if(!board){
            return res.status(404).json({error: "board not found"})
        }
        res.json(board);
        console.log(board)
    }catch(error){
        console.log(error)
    }
})
router.post('/:boardId/card', async (req,res) => {
    const {boardId,card} = req.params
    const {title, description, owner, gifUrl} = req.body;
    try{
        const card = await prisma.card.create({
            data: {
                title,
                description,
                owner,
                gifUrl,
                boardId: parseInt(boardId)
            }
        })
        res.json(card)
        console.log(card)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'error'})
    }
})
router.get('/:boardId/card', async(req,res) => {
    const {boardId} = req.params
    const cards = await prisma.card.findMany({
        where: {boardId: parseInt(boardId)}
    })
    res.json(cards)
})
router.get('/:boardId/card/:cardId', async(req,res) => {
    const {boardId, cardId} = req.params;
    try {
        const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) }
        });
        if (!card || card.boardId !== parseInt(boardId)) {
            return res.status(404).json({ error: "card not found" });
        }
        res.json(card);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error" });
    }
});
router.delete("/:boardId/card/:cardId", async(req,res) =>{
    const {boardId, cardId} = req.params
    const deletedCard = await prisma.card.delete({
        where: {id: parseInt(cardId)}
    })
    res.json(deletedCard)
})

module.exports = router;