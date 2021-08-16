const config = require('../config.json');

module.exports = {
    name: 'slash-deploy',
    aliases: ['deploy', 'setup', 'update'],
    inHelp: 'no',
    challengeMods: 'no',
    modOnly: 'no',
    ownerOnly: 'yes',
    userPerms: [''],
    botPerms: [''],
    async execute(message, args, client) {

        const commands = [
            {
                name: 'ping',
                description: 'Makes sure the bot is online.',
            },
            {
                name: 'help',
                description: 'Provides users with all of our commands.',
            },
            {
                name: 'avatar',
                description: 'Displays a user\'s avatar.',
            },
            {
                name: 'coin',
                description: 'Flips a coin.',
            },
            {
                name: 'diceroll',
                description: 'Rolls as many dice as you would like.',
            },
            {
                name: 'invite',
                description: 'Sends users all of the information they need about SM.',
            },
            {
                name: 'prune',
                description: 'Deletes a certain number (2-99) from the channel this is ran in.',
                options: [
                    {
                        name: 'number-messages',
                        type: 'INTEGER',
                        description: 'Type in a number between 2 and 99 of messages to delete.',
                        required: true,
                    }
                ],
            },
            {
                name: 'dm',
                description: 'Allows mods to DM a user an official message from their server.',
                options: [
                    {
                        name: 'userID',
                        type: 'STRING',
                        description: 'Provide the userID of the user you would like to DM.',
                        required: true,
                    },
                    {
                        name: 'message',
                        type: 'STRING',
                        description: 'What message would you like to send to the user?',
                        required: true,
                    }
                ],
            },
            {
                name: 'sakura',
                description: 'Displays information about the bot.',
            },
            {
                name: 'server-info',
                description: 'Displays information about the server this is ran in.',
            },
            {
                name: 'user-info',
                description: 'Displays information about a user.',
                option: [
                    {
                        name: 'user-id',
                        type: 'STRING',
                        description: 'Provide the ID of the user you would like to get information about.',
                        required: true,
                    }
                ],
            },
            {
                name: 'report',
                description: 'Allows users to report issues with the bot.',
                options: [
                    {
                        name: 'issue',
                        type: 'STRING',
                        description: 'Please let Erin know what your issue is.',
                        required: true,
                    }
                ],
            },
            {
                name: 'statusreport',
                description: 'Allows users to get the status of a report they sent in..',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Enter the message ID of your original report.',
                        required: true,
                    }
                ],
            },
            {
                name: 'inprogreport',
                description: 'Allows Erin to update the status of a reported issue.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Enter the message ID of the original report.',
                        required: true,
                    }
                ],
            },
            {
                name: 'completedreport',
                description: 'Allows Erin to mark a reported issue as fixed or completed.',
                options: [
                    {
                        name: 'messageID',
                        type: 'STRING',
                        description: 'Enter the message ID of the original report.',
                        required: true,
                    }
                ],
            },
            {
                name: 'report',
                description: 'Allows users to report issues with the bot.',
                options: [
                    {
                        name: 'issue',
                        type: 'STRING',
                        description: 'Please let Erin know what your issue is.',
                        required: true,
                    }
                ],
            },
            {
                name: 'suggestion',
                description: 'Allows users to check on the status of their Suggestion.',
                options: [
                    {
                        name: 'suggestion-message',
                        type: 'STRING',
                        description: 'What would you like to suggest?',
                        required: true,
                    }
                ],
            },
            {
                name: 'status-sugg',
                description: 'Check the status of a previous suggestion you made.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the status you would like to check the status of.',
                        required: true,
                    }
                ],
            },
            {
                name: 'edit-sugg',
                description: 'Allows users to edit a suggestion they made.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the status you would like to check the status of.',
                        required: true,
                    },
                    {
                        name: 'suggestion',
                        type: 'STRING',
                        description: 'What is your new suggestion message?',
                        required: true,
                    }
                ],
            },
            {
                name: 'completed-sugg',
                description: 'Allows mods to mark a suggestion as completed.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the status you would like to mark completed.',
                        required: true,
                    },
                    {
                        name: 'message',
                        type: 'STRING',
                        description: 'How was this completed? What is the completed status?',
                        required: false
                    }
                ],
            },
            {
                name: 'denied-sugg',
                description: 'Allows mods to mark a suggestion as denied.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the status you would like to mark denied.',
                        required: true,
                    },
                    {
                        name: 'message',
                        type: 'STRING',
                        description: 'Why was this denied? What is the denied status?',
                        required: true
                    }
                ],
            },
            {
                name: 'inprogress-sugg',
                description: 'Allows mods to mark a suggestion as in-progress.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the status you would like to mark in-progress.',
                        required: true,
                    },
                    {
                        name: 'message',
                        type: 'STRING',
                        description: 'How was this in-progress? What is the in-progress status?',
                        required: true
                    }
                ],
            },
            {
                name: 'start-challenge',
                description: 'Allows mods to start a new challenge.',
                options: [
                    {
                        name: 'prizes',
                        type: 'STRING',
                        description: 'What prizes would you like to give 1st, 2nd, and 3rd place?',
                        required: true,
                    },
                    {
                        name: 'first-question',
                        type: 'STRING',
                        description: 'What is the first question you would like to post for the challenge?'
                    }
                ],
            },
            {
                name: 'challenge-q',
                description: 'Allows mods to add a new question to the challenge.',
                options: [
                    {
                        name: 'question',
                        type: 'STRING',
                        description: 'What is the question or challenge you would like to post?',
                        required: true,
                    }
                ],
            },
            {
                name: 'edit-challenge',
                description: 'Allows mods to edit a challenge question that was posted.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Provide the message ID of the challenge question you want to update.',
                        required: true,
                    },
                    {
                        name: 'updated-question',
                        type: 'STRING',
                        description: 'What would you like to say instead?',
                        required: true,
                    }
                ],
            },
            {
                name: 'add-members',
                description: 'Allows mods to automatically add users to the Challenge Database.',
            },
            {
                name: 'check-participants',
                description: 'Allows mods to check what members are in the Challenge Database.',
            },
            {
                name: 'remove-submission',
                description: 'Allows mods to remove submissions from the Challenge Database.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'What is the message ID from the submission you would like to remove?',
                        required: true,
                    }
                ]
            },
            {
                name: 'manual-add-members',
                description: 'Allows mods to manually add users to the Challenge Database. 1 user at a time.',
                options: [
                    {
                        name: 'user-id',
                        type: 'STRING',
                        description: 'What is the user ID of the user you would like to add?',
                        required: true,
                    }
                ],
            },
            {
                name: 'remove-participants',
                description: 'Allows mods to remove a member from the Challenge Database.',
                options: [
                    {
                        name: 'user-id',
                        type: 'STRING',
                        description: 'Provide the user ID of the user you would like to remove from the database.',
                        required: true,
                    }
                ]
            },
            {
                name: 'submit',
                description: 'Allows users to submit answers to the challenges.',
                options: [
                    {
                        name: 'challenge-no',
                        type: 'STRING',
                        description: 'What challenge number are you submitting an answer to?',
                        required: true,
                    },
                    {
                        name: 'answer',
                        type: 'STRING',
                        description: 'What is your answer?',
                        required: true,
                    }
                ],
            },
            {
                name: 'edit-answer',
                description: 'Allows users to edit the answers they submitted to the challenge.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'What is the message ID of the answer you would like to update?',
                        required: true,
                    },
                    {
                        name: 'new-answer',
                        type: 'STRING',
                        description: 'What is the updated message you would like to provide?',
                        required: true,
                    }
                ],
            },
            {
                name: 'add-points',
                description: 'Allows mods to manually add additional points to users.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'What is the message ID of the answer you would like to provide additional points for?',
                        required: true,
                    },
                    {
                        name: 'number-of-points',
                        type: 'STRING',
                        description: 'How many points?',
                        required: true,
                    }
                ],
            },
            {
                name: 'remove-points',
                description: 'Allows mods to manually remove additional points to users.',
                options: [
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'What is the message ID of the answer you would like to remove points from?',
                        required: true,
                    },
                    {
                        name: 'number-of-points',
                        type: 'STRING',
                        description: 'How many points?',
                        required: true,
                    }
                ],
            },
            {
                name: 'mod-check-submissions',
                description: 'Allows mods to check what users have submitted to the challenge system.',
                options: [
                    {
                        name: 'challenge-number',
                        type: 'STRING',
                        description: 'Please provide the challenge number that you would like to check.',
                        required: true,
                    }
                ],
            },
            {
                name: 'user-check-submissions',
                description: 'Allows users to check what they have submitted to the challenge system.',
                options: [
                    {
                        name: 'challenge-number',
                        type: 'STRING',
                        description: 'Please provide the challenge number that you would like to check.',
                        required: true,
                    }
                ],
            },
            {
                name: 'reviewed',
                description: 'Allows mods to mark submissions as reviewed.',
                options: [
                    {
                        name: 'points',
                        type: 'INTEGER',
                        description: 'Please provide the the amount of points to award.',
                        required: true,
                    },
                    {
                        name: 'message-id',
                        type: 'STRING',
                        description: 'Please provide the message ID for the submission you would like to review.',
                        required: true,
                    }
                ],
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            /* */
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },
            {
                name: 'end-challenge',
                description: 'Allows mods to end a challenge.',
            },
            {
                name: 'purge-submissions',
                description: 'Allows mods to remove all submissions from the Challenge Database.',
            },

        ];

        message.react('✔️')
        const slash = await client.guilds.cache.get(config.bot.testServerId)?.commands.set(commands);
        console.log(slash);

    }
}