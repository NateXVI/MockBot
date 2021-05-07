require('dotenv').config();
const fs = require('fs');

const phrases = JSON.parse(fs.readFileSync('./phrases.json'));

const token = process.env.DISCORD_BOT_TOKEN;

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
	console.log(`${client.user.username} connected`);
});

client.on('message', (message) => {
	if (message.author.bot === true || message.content == '') {
		return;
	}
	let chance = Math.floor(Math.random() * 50);
	console.log(chance);
	if (chance != 1) return;
	if (message.content.charAt(0) == '!') return;
	if (message.content.charAt(0) == '~') return;
	if (message.content.charAt(0) == '-') return;
	if (message.member.roles.cache.some((role) => role.name === 'mock')) {
		message.channel.send(mockMessage(message.content));
	}
});
client.login(token);

function mockMessage(message) {
	let offset = 0;
	let final = '"';
	for (i = 0; i < message.length; i++) {
		let letter = message.charAt(i);

		if (letter == ' ') {
			offset += 1;
			final += ' ';
		} else if ((i + offset) % 2 == 0) {
			final += letter.toLowerCase();
		} else {
			final += letter.toUpperCase();
		}
	}
	final += '" ';
	final += phrases[Math.floor(Math.random() * phrases.length)];
	return final;
}
