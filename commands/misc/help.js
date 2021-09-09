const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config/config.json").prefix;
const paginationEmbed = require('@psibean/discord.js-pagination');
const { MessageEmbed } = require('discord.js');
const config = require('../../config/config.json');
const prefix = config.prefix;
const ee = require('../../config/embed.json');

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information about themselves or another user they ping or provide the ID for.',
	aliases: ['h', 'halp', 'command', 'commands'],
	usage: `/help`,
	example: `/help ping`,
	permissions: " ",
	categories: "Miscellaneous",
	async execute(interaction) {

		const helpEmbeds = [];
		const roleColor =
			interaction.guild.me.displayHexColor === "#000000"
				? "#ffffff"
				: interaction.guild.me.displayHexColor;

		let regularCommands = [];

		readdirSync("./commands/").forEach((dir) => {
			const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
				file.endsWith(".js")
			);

			const cmds = commands.map((command) => {
				let file = require(`../../commands/${dir}/${command}`);

				if (!file.name) return "No command name.";

				let name = file.name.replace(".js", "");

				return `\`${name}\``;
			});

			let data = new Object();

			data = {
				name: dir.toUpperCase(),
				value: cmds.length === 0 ? "In progress." : cmds.join(" "),
			};

			regularCommands.push(data);
		});

		regularCommands.forEach(function (dir, command, name) {

		});

		const description = `These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`;


		const embed1 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu page 1')
			.setDescription(description)
			.addFields(regularCommands);

		const embed2 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu page 2 - Moderator Only Commands')
			.setDescription(`These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`)
			.addFields({
				name: 'These are general **moderator** only commands. Meaning only **moderators** can use these commands.',
				value: '```css\nprune\nupdate-prefix\nreset-prefix\nmute\nunmute\nwarn\nkick\nban\nunban\nreport\nstatusreport\ndm```'
			});

		const embed3 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu page 3 - Suggestion System Commands')
			.setDescription(`These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`)
			.addFields({
				name: 'These are commands any user can use for our Suggestions System.',
				value: '```css\nsuggestions\neditsugg\nstatussugg\n```'
			}, {
				name: 'These are our **moderator** only commands for our Suggestions System.',
				value: '```css\nprog-sugg\ndenied-sugg\ncompletedsugg\n```'
			});

		const embed4 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu page 4 - Thanks System Commands')
			.setDescription(`These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`)
			.addFields({
				name: 'These are teh commands you can use for our Thanks System.',
				value: '```css\nthanks\nunthanks\nthanks-on\nthanks-off\nthanks-leaderboard\n```'
			});

		const embed5 = new MessageEmbed()
			.setColor(roleColor)
			.setTitle('Help Menu page 5 - Challenge System Commands')
			.setDescription(`These are all of the commands Sakura Moon can do. If you want to get more information you can do \`${prefix}help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.`)
			.addFields({
				name: 'These are commands any user can use for our Challenge System.',
				value: '```css\nsubmit\nedit-submission\nchallenge-leaderboard\n```'
			}, {
				name: 'These are our **moderator** only commands for our Challenge System.',
				value: '```css\nadd-members\nadd-users\ncheck-participants\nremove-participant\nstart-challenge\nchallenge\nedit-challenge\ncheck-submissions\nreviewed\npurge-submissions\nend-challenge\n```'
			});

		pages = [];

		const footerResolver = (currentPageIndex, pagesLength) =>
			`Page ${currentPageIndex + 1} / ${pagesLength}: ${(currentPageIndex % 2 === 0) ? ee.footertext : ee.footertext}`;
		const collectErrorHandler = ({ error }) => console.log(error);

		helpEmbeds.push(embed1);
		helpEmbeds.push(embed2);
		helpEmbeds.push(embed3);
		helpEmbeds.push(embed4);
		helpEmbeds.push(embed5)

		let cmdd = args[0];

		if (cmdd) { //WORKS

			const cmd = msg.client.commands.get(args[0]) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if (!cmd) return msg.channel.send("That command could not be found!");

			const emb = new MessageEmbed()
				.setColor(roleColor)
				.setTitle(`Help for \`${prefix}${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description, true);
			} else {
				emb.setDescription("No description could be found");
			}
			if (cmd.note) {
				emb.addField("Note:", cmd.note, false)
			}
			if (cmd.aliases) {
				emb.addField("Aliases", cmd.aliases.join(", "), false);
			}
			if (cmd.cooldown) {
				emb.addField("You need to wait this long between usages of this command:", `${cmd.cooldown} seconds`, false)
			}
			if (cmd.usage) {
				emb.addField("Usage", cmd.usage, false);
			}
			if (cmd.example) {
				emb.addField("Example Usage", cmd.example, false)
			}
			if (cmd.ownerOnly) {
				emb.addField("THIS IS ONLY A COMMAND ERIN CAN USE. Right?", cmd.ownerOnly, false)
			}
			if (cmd.userPerms) {
				emb.addField("You must have these permissions to run this command:", cmd.userPerms, false)
			}
			if (cmd.botPerms) {
				emb.addField('I must have these permissions to run this command:', cmd.botPerms, false)
			}
			if (cmd.patreonOnly) {
				emb.addField('Do you need to subscribe to Sakura Moon on Patreon to use this command?', cmd.patreonOnly, false)
			}
			message.reply({ embeds: [emb] });

		} else {
			paginationEmbed(message, helpEmbeds, { footerResolver, collectErrorHandler, timeout: 120000, idle: 60000 });
		}

	},
};