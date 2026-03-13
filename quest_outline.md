## Quest Outline

- Player request a `/quest` on discord
- First we verify the individual has properly synced their minecraft account with their discord account
    - Verify the individual using the `players.json` file. Ensure it is synced with the `usercache.json`
    - If the individual is not verified use the `/sync` command to sync the individual by providing their minecraft name.
- After verification we check to see if the individual has already received a quest
    - Check the `players.json` file to see if that individual has a quest currently assigned (we can use a boolean to do this).
    - If the individual has a quest display a message showing their current quest and the progress they are at for that quest.
    - If the individual does not have a quest assigned to them assign them a random quest and mark their profile as received a quest.

## Quest Logic

- Using the `quests.json` file we can randomly select a quest to give to the player.
- Consider making a weighting system or an option system where the individual can choose between a "easy", "medium" and "hard" quest.
    - The harder the quest the higher the rewards.

- Example of tier list:
    - Easy Difficulty - (Rewards range from small usfeful items or 1-2 levels)
    - Medium Difficulty - (Rwards range from half a stack of useful items or 3-5 levels)
    - Hard Difficulty - (Rewards range from a full stack of useful items or 6-10 levels)