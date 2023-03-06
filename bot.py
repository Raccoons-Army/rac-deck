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
from Models.main import Main        # import Channel class
from Models.channel import Channel  # import Channel class
from Models.nick import Nick        # import Channel class


####################### DEFINING STUFF #######################

# globals
config = None               # config
m: Main = None              # main object
c: Channel = None           # channel object
n: Nick = None              # nick object
me = None                   # discord's user obj
lastNickname = None         # user's nickname before being changed
defaultNicknames = []       # default nicknames
lastChannelsName = []       # channels name before being changed
defaultChannelsName = []    # default channels name

# bot stuff
intents = discord.Intents.default()
intents.members = True
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

# read env file
load_dotenv()


### Load / Reset ###
# Func that reads the config file and maps it to objects
def loadConfigFile():
    global config
    config = configparser.RawConfigParser()
    configFilePath = "./config.ini"
    config.read(configFilePath)

    # load into objects
    # yeah, im using objects only to store data of a config file, idc.
    global m, c, n
    m = Main(json.loads(config.get("MAIN", "changeMode")),
             json.loads(config.get("MAIN", "changeOnStart")),
             json.loads(config.get("MAIN", "reset")),
             json.loads(config.get("MAIN", "end")))

    if (m.changeMode == "nick"):

        n = Nick(json.loads(config.get("NICK", "myId")),
                 json.loads(config.get("NICK", "changeOnAllServers")),
                 json.loads(config.get("NICK", "data")))

        # global lastNickname
        # lastNickname =

    else:
        c = Channel(json.loads(config.get("CHANNEL", "serverId")),
                    json.loads(config.get("CHANNEL", "data")))


# Func that resets the nick/channel (it will reset based on your changeMode value on the config.ini file) to its default value
def resetValues():

    # check what mode the bot is on
    if (m.changeMode == "nick"):

        # resets all nicks to their value before being changed
        for d in defaultNicknames:
            msg = asyncio.run_coroutine_threadsafe(
                client.get_guild(d["serverId"]).get_member(me.id).edit(nick=d["nick"]), client.loop)

        print("Reseted all your nicks!")
    else:
        # resets the channels' names if needed
        if (len(lastChannelsName) > 0):
            loopChangeChannelsName(defaultChannelsName)

        print("Reseted all your channels' name!")


# Func to load values on start
def loadValuesOnStart():
    print("Loading your values")
    # checks the mode
    if (m.changeMode == "nick"):
        # loads the first value of the list nicknames (from config.ini)
        changeNickname(n.data[0]["nick"])
    else:
        loopChangeChannelsName(c.data)


### Nick mode ###

# Func that stores the original user's nickname
def saveOriginalNickname():

    # stores channels' name before making changes. This will then help to reset their names
    for d in n.data:
        defaultNicknames.append(
            {"serverId": d["serverId"], "nick": client.get_guild(d["serverId"]).get_member(n.userId).nick})


# Func to loop and and change all nicks
def loopChangeNickname(newNick):

    # loop through all servers and change its nickname
    for guild in client.guilds:

        # changes its nickname
        msg = asyncio.run_coroutine_threadsafe(
            guild.get_member(me.id).edit(nick=newNick), client.loop)
        # msg.result(timeout=15)


# Func to change the nickname
# note: since i need to deal with async functions (the discord stuff) and this function can't be async cuz the keyboard stuff isnt async,
# i gotta use asyncio do deal with it
def changeNickname(newNick):

    # calls the global var
    global lastNickname

    # cheks if nicks are the same, if its true, that means the user pressed the same keybind, that is, will redo the nickname changes
    if (newNick != me.nick):
        # store current nickname
        lastNickname = me.nick
    else:
        # undos the nickname value
        newNick = lastNickname

    # checks if user wants to change its nickname in all the server the bot is on
    if (n.changeOnAllServers == True):
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


### Channel mode ###

# Func that stores the original channels' name
def saveOriginalChannelName():

    # stores channels' name before making changes. This will then help to reset their names
    for d in c.data:
        defaultChannelsName.append(
            {"channelId": d["channelId"], "channelName": client.get_channel(d["channelId"]).name})


# Func that loads channels names from config.ini
def loopChangeChannelsName(data):
    for d in data:
        changeChannelName(d["channelName"], d["channelId"])


# Func to change a channel's name
# note: since i need to deal with async functions (the discord stuff) and this function can't be async cuz the keyboard stuff isnt async,
# i gotta use asyncio do deal with it
def changeChannelName(newName, channelId):
    channel = client.get_channel(channelId)

    # cheks if names are the same, if its true, that means the user pressed the same keybind, that is, will redo the name changes
    if (newName != channel.name):
        # store current channel name
        lastChannelsName.append(
            {"channelId": channelId, "channelName": channel.name})

    else:
        # undos the nickname value
        newName = [l["channelName"]
                   for l in lastChannelsName if l["channelId"] == channelId]

    # change channel's name
    asyncio.run_coroutine_threadsafe(
        channel.edit(name=newName), client.loop)


# Func to assign user object
def assignUser():
    # load user to me global var
    global me

    # assign me
    me = client.get_guild(n.data[0]["serverId"]).get_member(n.userId)


### Hotkeys ###

# Func to create the hotkeys and listen them
def createHotKeys():

    # get mode and hotkeys from config file
    mode = m.changeMode

    # check mode selected
    # note: here im repeating the for loop basically, but its more efficient this way, cuz like this, i dont have to perform a if statement at each iteration
    if (mode == "nick"):
        for d in n.data:
            keyboard.add_hotkey(d["hotkey"], changeNickname, args=[d["nick"]])

    else:
        for d in c.data:
            keyboard.add_hotkey(d["hotkey"], changeChannelName, args=[
                                d["channelName"], d["channelId"]])

    # adds reset hotkey (if configed)
    if (bool(m.reset and m.reset.strip())):
        keyboard.add_hotkey(m.reset, resetValues)

    # adds end hotkey (if configed)
    if (bool(m.end and m.end.strip())):
        keyboard.add_hotkey(m.end, resetValues)

    print("HotKeys created!")


####################### BOT STUFF #######################

### Events ###

@client.event
async def on_ready():

    # load config file
    loadConfigFile()

    # assign user if in 'nick' mode
    if (m.changeMode == "nick"):
        assignUser()

        # saves user's nicks
        saveOriginalNickname()
    else:
        # saves channels' name
        saveOriginalChannelName()

    # load nick/channel if changeOnStart value (from config.ini) is true
    if (m.changeOnStart == True):
        loadValuesOnStart()

    # checks if user wants its nick/channel (it will reset based on your changeMode value on the config.ini file) to its default value
    # if (json.loads(config.get("MAIN", "resetOnClose")) == True):
    #     # registers a function to be executed when the program is terminating
    #     atexit.register(resetValues)

    # create a thread for keyboard stuff
    keyboardThread = Thread(target=createHotKeys, args=())

    # starts the thread
    keyboardThread.start()

    await tree.sync()
    print("Bot ready!")


### Commands ###

@ tree.command(name="test", description="Test if bot is working")
async def test(interaction: discord.Interaction):
    """Test command."""
    await interaction.response.send_message("I'm working!")

client.run(os.getenv('BOT_TOKEN'))
