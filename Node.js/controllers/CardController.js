const prisma = require("../configs/prisma");

class CardController  {
    async openBooster(req, res) {
        try {
            const user = req.user;
            const isBoosterAvailable = Number(user.booster) - Date.now();
            if (isBoosterAvailable > 0) return res.status(400).json({message : "Booster pas disponible"})
            const response = await fetch('https://hp-api.lainocs.fr/characters');
            const cards =  await response.json();
            let table = [];
            const minCeiled = Math.ceil(1);
            const maxFloored = Math.floor(cards.length);
            for (let i = 0; i < 5; i++){
                const randomId = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
                const hasCard = await prisma.userCard.findUnique({
                    where : {
                        userId_cardId : {
                            cardId : randomId,
                            userId : user.id
                        }
                    }
                });
                if(hasCard) {
                    await prisma.userCard.update({
                        where : {
                            userId_cardId : {
                                cardId : randomId,
                                userId : user.id
                            }
                        },
                        data : {
                            quantity : {
                                increment : 1
                            }
                        }
                    })
                } else {
                    await prisma.userCard.create({
                        data: {
                            cardId : randomId,
                            userId : user.id
                        }
                    })
                }
                table.push(cards[randomId-1]);
            }
            const booster = await prisma.user.update({
                where : {
                    id : user.id
                },
                data : {
                    booster : (Date.now() + 1000 * 60 * 60 * 24).toString()
                },
                select : {
                    booster : true
                }
            })
            return res.status(200).json({table, booster : booster.booster})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }   
    }
    async resetBooster(req, res) {

        try {
          
          const { id } = req.user;
          
          const lastBooster = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              booster: "0",
            },
            select: {
              booster: true,
            } 
          })
    
          if (!lastBooster) return res.status(404).json({ message: "Booster not found"});
    
          return res.status(200).json({ message: "Booster updated", booster: parseInt(lastBooster.booster) });
    
        } catch (error) {
          
          return res.status(500).json({ message: error.message });
        }
    }
    
    async getUserCards(req, res) {

        try {
          
          const { id } = req.user;
          
          const allCards = await prisma.userCard.findMany({
            where: {
              userId: id
            },
            select: {
              cardId: true,
              quantity: true,
            }
          })
          
          let total = 0;
          allCards.forEach(card => {
            total += card.quantity;
          });
    
          if (!allCards) return res.status(404).json({ message: 'No cards found' })
    
          return res.status(200).json({cards: allCards, total})
    
        } catch (error) {
          
          return res.status(500).json({ message: error.message })
        }
    
    }
}
module.exports = new CardController();