# env file
import os
from dotenv import load_dotenv

# discord
import discord
from discord import app_commands

# thread
from threading import Thread

# keyboard
import keyboard


# read env file
load_dotenv()


# keyboard listener func
def keyboardListener():
    while True:

        print(keyboard.read_key())
        # if keyboard.read_key() == "a":
        #     break


# bot stuff
description = """An example bot to showcase the discord.ext.commands extension
module.
There are a number of utility commands being showcased here."""
intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

# create a thread
keyboardThread = Thread(target=keyboardListener)


@tree.command(
    name="changename",
    description="Discord bot to change your name or a room's name",
    # guild=discord.Object(id=0),
)  # Add the guild ids in which the slash command will appear. If it should be in all,
# remove the argument, but note that it will take some time (up to an hour) to register the command if it's for all guilds.
async def first_command(interaction):
    await interaction.response.send_message("Hello!")


@client.event
async def on_ready():

    await tree.sync()
    print("Ready!")

    # start keyboard listener on a thread
    keyboardThread.start()


@tree.command()
async def test(interaction: discord.Interaction):
    """Test command."""
    await interaction.response.send_message("I'm working!")


client.run(os.getenv('BOT_TOKEN'))
