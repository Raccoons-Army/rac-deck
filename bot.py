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
import atexit                       # atexit

# global
config = None           # config
me = None               # discord's user obj
lastNickname = None     # user's last nickname

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


# Func that resets the nick/channel (it will reset based on your changeMode value on the config.ini file) to its default value
def resetValues():
    # check what mode the bot is on
    if (json.loads(config.get("MAIN", "changeMode")) == "nick"):
        # resets the user's nick
        # loop through all servers and resets its nickname
        loopChangeNickname(json.loads(config.get("NICK", "defaultNick")))
        
        print("Reset all your nicks!")
    else:
        # resets the channels' name
        print("TO-DO")
        print("Reset all your channels' name!")


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
    if (json.loads(config.get("NICK", "changeOnAllServers")) == True):
        try:
            # loop through all servers and change its nickname
            loopChangeNickname(newNick)

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


# Func that loops throught all the servers and changes/resets the user's nick
def loopChangeNickname(newNick):
    # loop through all servers and change its nickname
    for guild in client.guilds:
        # finds the user in the current guild
        findMe = guild.get_member(me.id)

        # changes its nickname
        msg = asyncio.run_coroutine_threadsafe(
            findMe.edit(nick=newNick), client.loop)
        # msg.result(timeout=15)


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
                                args=[json.loads(config.get("NICK", "nicknames"))[i]])
            i += 1
    else:
        for hotkey in hotkeys:
            keyboard.add_hotkey(hotkey, changeNickname,
                                args=[json.loads(config.get("CHANNEL", "channelNames"))[i]])
            i += 1

    # adds reset hotkey (if configed)
    if (bool(json.loads(config.get("HOTKEYS", "reset")) and json.loads(config.get("HOTKEYS", "reset")).strip())):
        keyboard.add_hotkey(json.loads(
            config.get("HOTKEYS", "reset")), resetValues)

    # adds end hotkey (if configed)
    if (bool(json.loads(config.get("HOTKEYS", "end")) and json.loads(config.get("HOTKEYS", "reset")).strip())):
        keyboard.add_hotkey(json.loads(
            config.get("HOTKEYS", "reset")), resetValues)

    print("HotKeys created!")


# Func to assign user object
def assignUser():
    # load user to me global var
    global me

    # checks the mode
    if (json.loads(config.get("MAIN", "changeMode")) == "nick"):
        # assign me
        me = client.get_guild(json.loads(config.get("NICK", "serversIds"))[0]
                              ).get_member(json.loads(config.get("MAIN", "myId")))

    else:
        # assign me
        me = client.get_guild(json.loads(config.get("CHANNEL", "serverId"))).get_member(
            json.loads(config.get("MAIN", "myId")))


####################### BOT STUFF #######################

@client.event
async def on_ready():

    # load config file
    loadConfigFile()

    # assign user
    assignUser()

    # checks if user wants its nick/channel (it will reset based on your changeMode value on the config.ini file) to its default value
    if (json.loads(config.get("MAIN", "resetOnClose")) == True):
        # registers a function to be executed when the program is terminating
        atexit.register(resetValues)

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


@tree.command(name="change", description="change name")
async def change(interaction: discord.Interaction,  member: discord.Member):
    """Change command."""
    await member.edit(nick="test")
    await interaction.response.send_message("I'm working!")

client.run(os.getenv('BOT_TOKEN'))
