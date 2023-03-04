# env file
import os
from dotenv import load_dotenv

# discord
import discord
from discord import app_commands

# thread
from threading import Thread
import asyncio

# keyboard
import keyboard


# read env file
load_dotenv()

# global
# this will store the member, so i can use him on the changeNickname function
me = None


# Func to change the nickname
# note: since i need to deal with async functions (the discord stuff) and this function (changeNickname) can't be async cuz the keyboard stuff isnt async,
# i gotta create tasks instead to deal with it
def changeNickname(newNick):

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


# Func to create the hotkeys and listen them
def createHotKeys():
    keyboard.add_hotkey("alt + 1", changeNickname,
                        args=["416e6472e94c52656973"])
    keyboard.add_hotkey("alt + 2", changeNickname,
                        args=["testT"])
    keyboard.add_hotkey("ctrl + c", quit)

    print("HotKeys created!")


# bot stuff
intents = discord.Intents.default()
intents.members = True
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)


@client.event
async def on_ready():

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
    # AQUI SE CALHAR VOU TER DE GRAVAR TMB O SERVER E O USER VAI TER DE DAR ASSIGN EM TODOS OS SERVERS Q QUER O BOT
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
