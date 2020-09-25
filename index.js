//const { token, prefix, owner} = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const prefix = process.env.PREFIX;

const errMsj = 'Type "-info" for more information.'
ppSound = 'assets/alarmSound.mp3'

client.once('ready', () => {
    console.log(client.user.tag);
})

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift()

    if (message.member.voice.channel) {
        var connection = await message.member.voice.channel.join();
      } else {
        message.reply('You need to join a voice channel first!');
        return;
      }

    switch (command) {
        case 'ping': {
            message.channel.send('pong');
            break;
        }
        case 'setTimer': {
            if (args.length === 0) {
                message.channel.send(`This command needs 1 or more arguments. ${errMsj}`)
            }
            else if (args.length === 1) {
                message.channel.send(`You set a timer for ${args[0]} seconds`)
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, args[0]*1000)
            }
            else if (args.length === 2) {
                message.channel.send(`You set a timer for ${args[0]} minutes and ${args[1]} seconds`)
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, args[0]*1000*60+args[1]*1000)
            }
            else if (args.length === 3) {
                message.channel.send(`You set a timer for ${args[0]} hours, ${args[1]} minutes and ${args[2]} seconds`)
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, args[0]*1000*3600+args[1]*1000*60+args[2]*1000)
            }
            else {message.channel.send(`Oh, it looks like you added ${args.length}. We expect maximum 3 arguments. ${errMsj}`)}
            break;
        }
        case 'specialTimer': {
            if (args.length === 2) {
                message.channel.send(`Special timer. Two timers set. One for ${args[0]} minutes and other for ${args[1]} seconds`)
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, args[0]*1000*60)
    
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, args[1]*1000)
            }
            else {
                const minutes = 3;
                const seconds = 20;
                message.channel.send(`Default special timer. Two timers set. One for ${minutes} minutes and other for ${seconds} seconds`)
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, minutes*1000*60)
    
                setTimeout(() => {
                    message.channel.send(`Time out!`)
                    const dispatcher = connection.play(ppSound)
                }, seconds*1000)
            }
        }
        case 'test': {
            console.log(args);
            break;
        }
        case 'kick': {
            if (message.member.voice.channel) {
                message.reply('WHY HAVE YOU FORSAKEN ME! 😭');
                const connection = await message.member.voice.channel.leave();
              } else {
                message.reply('You need to join a voice channel first!');
              }
              break;
        }
        case 'info': {
            message.channel.send('Hi! These are the commands to control this bot. \n    -ping: Returns "pong" as a response. Does not receive any parameters \n -setTimer: Receive from 1 to 3 numeric parameters. If 1 parameter is received, a timer of n seconds is set. If 2 parameters are received, a timer of n minutes and n seconds is set. If 3 parameters are received, a timer of n hours, n minutes and n seconds is set. e.g. "-setTimer 5 15" will set a timer of 5 minutes and 15 seconds \n    -specialTimer: Receive none or 2 parameters. If 2 parameters are received, generate two timers, one of n minutes and the other of n seconds. I none parameters are received, set a 3 minutes and 20 seconds timer by default. \n    -kick: Removes the bot from the voice channel.')
        }
        default: {
            message.channel.send(`Oh, I am sorry, but this command does not exist. Remember our commands are case sensitive. ${errMsj}`)
        }
    }
})

client.login(process.env.TOKEN);

'Injectar código desde Discord'

'Corregir valores no númericos y negativos'