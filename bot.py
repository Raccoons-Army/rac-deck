# imports
import os
from dotenv import load_dotenv      # env file
import discord
from discord import app_commands    # discord lib
from threading import Thread        # thread
import asyncio                      # asyncio
import keyboard                     # keyboard
import configparser                 # config parser
import json                         # json


# global
me = None               # discord's user obj
lastNickname = None     # user's last nickname
config = None           # config

# bot stuff
intents = discord.Intents.default()
intents.members = True
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

# read env file
load_dotenv()


####################### DEFINING STUFF #######################

# Func that reads the config file
def loadConfigFile():
    global config
    config = configparser.RawConfigParser()
    configFilePath = "./config.ini"
    config.read(configFilePath)


# Func to change the nickname
# note: since i need to deal with async functions (the discord stuff) and this function (changeNickname) can't be async cuz the keyboard stuff isnt async,
# i gotta create tasks instead to deal with it
def changeNickname(newNick):

    # calls the global var
    global lastNickname

    # cheks if nicks are the same, if its true, that means the user pressed the same keybind, that is, will redo the nickname changes
    if (newNick != me.nick):
        # store current nickname
        lastNickname = me.nick  # TO DO
    else:
        # undos the nickname value
        newNick = lastNickname

    # checks if user wants to change its nickname in all the server the bot is on
    if (1 == 1):
        try:
            # loop through all servers and change its nickname
            for guild in client.guilds:
                # finds the user in the current guild
                findMe = guild.get_member(me.id)

                # changes its nickname
                msg = asyncio.run_coroutine_threadsafe(
                    findMe.edit(nick=newNick), client.loop)

                # msg.result(timeout=15)

        except Exception as e:
            print(e)
            print("It wasn't possible to change your nickname. Make sure u executaded the command /assign before trying to change your nickname")
        else:
            print("Nick change in all servers")
    else:
        try:
            # changes the user's nickname
            msg = asyncio.run_coroutine_threadsafe(
                me.edit(nick=newNick), client.loop)

            # msg.result(timeout=15)

        except Exception as e:
            print(e)
            print("It wasn't possible to change your nickname. Make sure u executaded the command /assign before trying to change your nickname")
        else:
            print("Nick changed")


# Func to change a channel's name
def changeChannelName():
    print("TO-DO")


# Func to create the hotkeys and listen them
def createHotKeys():

    # get mode and hotkeys from config file
    mode = json.loads(config.get("MAIN", "changeMode"))
    hotkeys = json.loads(config.get("HOTKEYS", "hotkeys"))

    # counter
    i = 0

    # check mode selected
    # note: here im repeating the for loop basically, but its more efficient this way, cuz like this, i dont have to perform a if statement at each iteration
    if (mode == "nick"):
        for hotkey in hotkeys:
            keyboard.add_hotkey(hotkey, changeNickname,
                                args=json.loads(config.get("NICK", "nicknames"))[i])
            i += 1
    else:
        for hotkey in hotkeys:
            keyboard.add_hotkey(hotkey, changeNickname,
                                args=json.loads(config.get("CHANNEL", "channelNames"))[i])
            i += 1

    print("HotKeys created!")


####################### BOT STUFF #######################

@client.event
async def on_ready():

    # load config file
    loadConfigFile()
    
    # load user to me global var
    global me
    me = client.guilds[0].get_member(json.loads(config.get("MAIN", "myId")))

    # create a thread for keyboard stuff
    keyboardThread = Thread(target=createHotKeys, args=())

    # starts the thread
    keyboardThread.start()

    await tree.sync()
    print("Bot ready!")


@tree.command(name="test", description="Test if bot is working")
async def test(interaction: discord.Interaction):
    """Test command."""
    await interaction.response.send_message("I'm working!")


@tree.command(name="assign", description="Assign yourself so bot knows that has to change your name")
async def assign(interaction: discord.Interaction):
    """Assign command."""
    global me
    me = interaction.user
    await me.edit(nick="test")
    await interaction.response.send_message("You are assigned!")


@tree.command(name="info", description="Gives your current server id")
async def info(interaction: discord.Interaction):
    """Info command."""
    await interaction.response.send_message("I'm working!")


@tree.command(name="change", description="change name", guild=discord.Object(id=721109103887515749))
async def change(interaction: discord.Interaction,  member: discord.Member):
    """Change command."""
    await member.edit(nick="test")
    await interaction.response.send_message("I'm working!")

client.run(os.getenv('BOT_TOKEN'))
