# MarsMello
<div styles="display:flex; justify-content:centre;">
  <img src="./client/public/marsmello.png" width=500/>
</div>

# The Future Awaits

Ethereum 2.0 is on the horizon. Majority of the scaling problems will be addressed and worked upon.
But the most important issue blockchain technology faces is User Adoption. We might increase the throughput capacity but we can't increase the interests of general population in blockchain easily.

To enhance the user adoption, gamification is very helpful. It has the users invested both financially and emotionally. The existing games are good but also complex. Which makes the decision to invest in them difficult.
One might leave ethereum after a couple transactions but one may not leave it if they have good in-game items(NFTs) which can be sold for real money!

## The Game Plot

MarsMello is a truly decentralised Web3 game whose plot is based on colonising and industrialising Mars!
MarsMello is an **Idle-Open World-Strategy-Economy-Simulation Game!**

* Players can buy plots of land (NFTs) in the game and setup factories (NFTs) and large industries on it.
* Factories will produce **ERC20** resources which the players can claim and trade for other **ERC20** tokens or **ETH** on **UniSwap**.
* Players must adopt strategies to maximise the profits as the Ore distribution and Factory efficiency will be randomised
(Because Life is Unfair)
* An In-Game Marketplace will enable users to trade and profit from the NFTs.
Given all the features and an open economy, it will be very lucrative to get hands on the game and start earning! 
This would bring in the attention to blockchain in the most simplest gamified form possible.

Wallet like Portis is used to enable smooth onboarding!
Polygon Chain is used to enable a fast transaction speed and lower transaction costs !
Players will learn about **ETHEREUM** ecosystem, **POLYGON**, **ERC20** tokens, **NFTs** etc.

## Into the Unknown

1. None of us were familiar with developing games and that too on the web. We had to adopt various strategies to overcome this information deficit. 
2. But we knew React. So that is how we created MarsMello. Using React and Springs and Gestures we made it possible to render an open-world game on the Web.
3. We had to come up with algorithms for the land generation and distribution which can be computed on blockchain.
4. It was difficult to query data of 100s-1000s of lands and factories from the contract. **The graph** helped us out big time in this regards.

## Truly?? Decentralised?

A decentralised game can not have a single server running the processes. But at the same time it is way difficult to set up a decentralised network of nodes to compute the game mechanics.

## Game Mechanics

1. The game is played by buying Land and placing Factories upon it. These factories have a pseudo-random efficiency rate and the land has a random generation of ores. Which implies that the yield rate will be different for each pair of land and factory.
1. After 24 hours the temporary storage fills up and no further yield can be accumulated. Player has to claim the resources to empty the storage. This is a complex transaction.
1. Each land purchase gives the user a land with a random seed with the ore distribution. RNG was also a challenge we had to tackle.
1. The game mechanics are so complex that a single smart contract could not be used. We had to use **seven** separate smart contracts instead. 
    1. One  for the backbone token (called MLO) of the economy.
    1. One for each of the ERC20 tokens which are fungible in-game resources
    1. And one for handling all the in-game transactions and game-logic.
1. After the user claims the resources he/she can trade them on **UNISWAP** or any similar **ERC20 DEX** for MLOs or ETHs.
1. The NFTs are stored on **nft.storage**, and since the client doesn't need any centralised servers, it can be hosted on ipfs.
